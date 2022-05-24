import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../domain";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isTokenExpired, user, loadUser } = useUser();

  useEffect(() => {
    loadUser();

    if (isTokenExpired()) {
      navigate("../login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showData = { ...user };
  delete showData.profilePic;

  return (
    <div>
      <p>This is Home</p>
      <pre>User: {JSON.stringify({ showData }, null, 1)}</pre>
    </div>
  );
};
