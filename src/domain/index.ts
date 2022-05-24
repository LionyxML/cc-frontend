/* eslint-disable @typescript-eslint/no-explicit-any */
import jwtDecode from "jwt-decode";
import { pathOr } from "ramda";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useAPI } from "../api/cc-api";

interface ProfileType {
  data: number[];
  type: string;
}

interface UserType {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  profilePic: ProfileType;
  userName: string;
}

export const useUser = (): typeof hookReturn => {
  const { apiSetAuthorization } = useAPI();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const localData = localStorage.getItem("@cc") || null;

  const setCurrentUser = (post: any): void => {
    localStorage.setItem(
      "@cc",
      JSON.stringify({
        user: {
          email: post?.user?.email,
          firstName: post?.user?.firstName,
          id: post?.user?.id,
          lastName: post?.user?.lastName,
          profilePic: post?.user?.profilePic,
          userName: post?.user?.userName,
        },
        token: post?.token,
      })
    );
    apiSetAuthorization(post.token);
  };

  const isTokenExpired = useCallback((): boolean => {
    try {
      if (localData !== null) {
        const token = pathOr("", ["token"], JSON.parse(localData));
        const decodedToken = jwtDecode(token) as any;
        return decodedToken?.exp < Date.now() / 1000;
      }
    } catch {
      return true;
    }
    return true;
  }, [localData]);

  const loadUser = useCallback((): void => {
    if (!isTokenExpired()) {
      setUser(
        JSON.parse(localStorage.getItem("@cc") as string)?.user as UserType
      );
    } else {
      setUser(null);
    }
  }, [isTokenExpired]);

  const removeToken = (): void => {
    localStorage.removeItem("@cc");
  };

  const logOff = (): void => {
    removeToken();
    setUser(null);
    navigate("../login", { replace: true });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      loadUser();
    }, 500);
    return () => clearInterval(interval);
  }, [loadUser]);

  const hookReturn = { setCurrentUser, isTokenExpired, logOff, loadUser, user };

  return hookReturn;
};
