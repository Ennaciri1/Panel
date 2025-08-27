import React from "react";
import { NavLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/* Icônes MUI proches de ton design */
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";

const drawerWidth = 240;
const AJI_RED = "#97051D";

const topItems = [
  { label: "Home", to: "/dashboard/home", icon: <HomeRoundedIcon /> },
  { label: "Listings", to: "/dashboard/listings", icon: <AssignmentRoundedIcon /> },
  { label: "Customer Reviews", to: "/dashboard/reviews", icon: <ChatBubbleRoundedIcon /> },
  { label: "Bookings", to: "/dashboard/bookings", icon: <CalendarMonthRoundedIcon /> },
];

const bottomItems = [
  { label: "Settings", to: "/dashboard/settings", icon: <SettingsRoundedIcon /> },
  { label: "Analytics", to: "/dashboard/analytics", icon: <BarChartRoundedIcon /> },
];

const SideBar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid rgba(0,0,0,0.06)",
          backgroundColor: "#fff",
        },
      }}
    >
      {/* Décale le contenu sous un AppBar si tu en as un */}
      <Toolbar />

      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 2,
        }}
      >
        <img
          src="/assets/logos/aji-mark.svg"   /* mets ton chemin logo */
          alt="AJI"
          width={72}
          height={72}
          style={{ objectFit: "contain" }}
        />
      </Box>

      {/* Menu principal */}
      <List sx={{ px: 1 }}>
        {topItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.to}
              sx={{
                mx: 0.5,
                borderRadius: "12px",
                "&.active": {
                  backgroundColor: "rgba(151,5,29,0.08)",
                },
                "&:hover": {
                  backgroundColor: "rgba(151,5,29,0.08)",
                },
              }}
            >
              <ListItemIcon
                sx={{ color: AJI_RED, minWidth: 40 }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2, mx: 3 }} />

      {/* Section secondaire */}
      <List sx={{ px: 1 }}>
        {bottomItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.to}
              sx={{
                mx: 0.5,
                borderRadius: "12px",
                "&.active": {
                  backgroundColor: "rgba(151,5,29,0.08)",
                },
                "&:hover": {
                  backgroundColor: "rgba(151,5,29,0.08)",
                },
              }}
            >
              <ListItemIcon sx={{ color: AJI_RED, minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Optionnel : petite signature en bas */}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ px: 2, py: 1, opacity: 0.6 }}>
        <Typography variant="caption">© 2025 AJI</Typography>
      </Box>
    </Drawer>
  );
};

export default SideBar;
