import * as React from "react";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function AppAppBar() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the access token from localStorage
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <MuiLink
            variant="h6"
            underline="none"
            color="inherit"
            component={RouterLink}
            to="/home"
            sx={{ fontSize: 24 }}
          >
            {"News App"}
          </MuiLink>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {!accessToken && (
              <React.Fragment>
               <MuiLink
                  variant="h6"
                  underline="none"
                  component={RouterLink}
                  to="/"
                  sx={{ ...rightLink, color: "secondary.main" }}
                >
                  {"Sign In"}
                </MuiLink>
                <MuiLink
                  variant="h6"
                  underline="none"
                  component={RouterLink}
                  to="/Signup"
                  sx={{ ...rightLink, color: "secondary.main" }}
                >
                  {"Sign Up"}
                </MuiLink>
              </React.Fragment>
            )}

            {accessToken && (
              <React.Fragment>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  style={{
                    ...rightLink,
                    background: "none",
                    border: "solid white 1px",
                    padding: "8px",
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: 600,
                    letterSpacing: "1px",
                  }}
                >
                  {"Logout"}
                </button>
              </React.Fragment>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
