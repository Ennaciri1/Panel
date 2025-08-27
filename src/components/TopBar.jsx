import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";

const drawerWidth = 240;

export default function TopBar() {
  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={1}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: "#fff",
      }}
    >
      <Toolbar>
        

        {/* pousser les icônes à droite */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={1}>
          <IconButton size="large" aria-label="search">
            <img
              src="/assets/icons/inbox.svg"
              alt="inbox"
              width={24}
              height={24}
              style={{ display: "block" }}
            />
          </IconButton>

          <IconButton size="large" aria-label="notifications">
            <Badge badgeContent={3} color="primary" overlap="circular">
              <img
                src="/assets/icons/notifications.svg"
                alt="notifications"
                width={24}
                height={24}
                style={{ display: "block" }}
              />
            </Badge>
          </IconButton>


          <IconButton size="large" aria-label="profile">
            <img
              src="/assets/icons/profile.svg"
              alt="notifications"
              width={28}
              height={28}
              style={{ display: "block", borderRadius: "50%" }}
            />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
