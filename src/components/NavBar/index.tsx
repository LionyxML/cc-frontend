import React, { MouseEvent, useEffect, useState } from "react";
import { Buffer } from "buffer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import DeblurIcon from "@mui/icons-material/Deblur";
import { indexOf, last, pathOr } from "ramda";
import { useNavigate } from "react-router";
import { Divider, ListItemIcon } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { SAppBar } from "./styles";
import { useUser } from "../../domain";

export const NavBar: React.FC = () => {
  const { logOff, user } = useUser();

  const pages = ["Produtos", "Planos", "Contato"];

  const settings = ["Perfil", "Principal", "Logout"];
  const settingsIcons = [<BadgeIcon />, <HomeIcon />, <LogoutIcon />];

  const navigate = useNavigate();
  const [profilePic, setProfilepic] = useState<string | ArrayBuffer | null>("");

  useEffect(() => {
    setProfilepic(
      Buffer.from(pathOr("", ["profilePic", "data"], user), "base64")
    );
  }, [user]);

  const settingsActions = [
    () => {
      navigate("../profile");
    },
    () => {
      navigate("../", { replace: true });
    },
    () => {
      logOff();
    },
  ];
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  return (
    <SAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DeblurIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: 40 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CC
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <DeblurIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1, fontSize: 40 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 4,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CC
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {user ? (
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ mr: 2 }}>
                Olá {pathOr("", ["firstName"], user)}
              </Typography>
              <Tooltip title="+ opções">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="userProfilePic" src={String(profilePic)} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <>
                    {setting === last(settings) ? <Divider /> : null}
                    <MenuItem
                      key={setting}
                      onClick={handleCloseUserMenu}
                      sx={{ width: "200px" }}
                    >
                      <ListItemIcon>
                        {settingsIcons[indexOf(setting, settings)]}
                      </ListItemIcon>
                      <Typography
                        textAlign="center"
                        onClick={() =>
                          settingsActions[indexOf(setting, settings)]()
                        }
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  </>
                ))}
              </Menu>
            </Box>
          ) : null}
        </Toolbar>
      </Container>
    </SAppBar>
  );
};
