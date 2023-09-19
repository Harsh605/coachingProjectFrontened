import { React, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar, Typography, Badge, InputBase } from '@mui/material';
import { Dashboard as DashboardIcon, Menu as MenuIcon, Wallet as WalletIcon, Collections as CollectionsIcon, Add as AddIcon, LocalMall as LocalMallIcon, NotificationsNone as NotificationsNoneIcon, AccountCircle as AccountCircleIcon, Logout as LogoutIcon, Search as SearchIcon } from "@mui/icons-material"

import {useNavigate } from 'react-router-dom';
import { Tab1, Tab2, Tab3, Tab4, Tab5, NftCollection, GamePass, Hack } from "../Tabs/Tabs"
import { useParams } from "react-router-dom";

const drawerWidth = 200;
const color = { primaryColor: "#013CC6", secondaryColor: "#0B63F8" }
const font = { primary: "Poppins", secondary: "Roboto" }

const AdminNavbar = (props) => {
  const { tab, tab2, tab1 } = useParams();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate()
  const [navLinkBorder, setNavLinkBorder] = useState('dashboard');


  const handleLogOut=async()=>{
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': { right: -3, top: 0, padding: '0 4px', },
  }));

  const navItems = [
    { id: 1, label: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { id: 2, label: 'Users', icon: <AddIcon />, path: '/admin/createNew' },
    { id: 3, label: 'Products', icon: <CollectionsIcon />, path: '/admin/collection' },
    { id: 4, label: 'Profile', icon: <LocalMallIcon />, path: '/admin/profile' },
    { id: 5, label: 'settings', icon: <WalletIcon />, path: '/admin/tab5' },
  ];

  const drawer = (
    <div >
      <Toolbar sx={{ py: "30px" }} />
      <List>
        {navItems.map(item => (
          <ListItem key={item.id} disablePadding sx={{ borderLeft: `2px solid ${(item.path === navLinkBorder) ? '#0B63F8' : 'transparent'}` }}>
            <ListItemButton onClick={() => { navigate(item.path); setNavLinkBorder(item.path) }} >
              <ListItemIcon sx={{ color: `${item.path === navLinkBorder ? color.secondaryColor : "#000000"}` }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} sx={{ color: `${item.path === navLinkBorder ? color.secondaryColor : "#000000"}` }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#ffffff",
          zIndex: "10000",
          boxShadow: "none"
        }}
      >
        <Toolbar sx={{ justifyContent: { xs: 'space-between' }, pt: "20px", pb: "20px" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: `${color.primaryColor}` }}

          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" onClick={()=>navigate("/admin/dashboard")} noWrap component="div" sx={{cursor:"pointer", mr: 2, fontSize: "24px", display: { xs: 'none', sm: "block", color: `${color.primaryColor}` } }}>
            Admin Panel
          </Typography>

          <Box sx={{ px: { sm: "20px" }, width: { sm: `calc(100% - ${drawerWidth}px)` }, display: "flex", justifyContent: "space-between", alignItems: "center", position: { sm: "absolute" }, left: { sm: `${drawerWidth}px` } }}>
            <Paper
              component="form"

              sx={{ mr: 2, width: { sm: "655px" }, display: { xs: "none", sm: "flex" }, boxShadow: "none", border: "1px solid #AdA7A7" }}
            >
              <IconButton type="button" sx={{ p: '10px', fontFamily: "Poppins", color: "#ADA7A7" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1, fontFamily: "Poppins", color: "#AdA7A7", }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Paper>


            <Box sx={{ display: "flex", }}>
              <Box className="mx-3 p-0 " sx={{ mr: 2, cursor: "pointer" }}>
                <StyledBadge badgeContent="1" color="secondary">
                  <NotificationsNoneIcon className='fs-2' color="action" />
                </StyledBadge>
              </Box>
              <Box className="mx-3 p-0 cursor-pointer">
                <IconButton sx={{ p: 0 }}>
                  <AccountCircleIcon className="fs-2 text-rgba(0, 0, 0, 0.54) " />
                </IconButton>
              </Box>
            </Box>
          </Box>

        </Toolbar>

      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"

      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
          <IconButton>
            <LogoutIcon sx={{ fontFamily: "Poppins", fontSize: "16px", color: "#000000" }} />
            <Typography sx={{ fontFamily: "Poppins", fontSize: "16px", color: "#000000" }}>Sign out</Typography>
          </IconButton>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
          <IconButton onClick={handleLogOut}>
            <LogoutIcon sx={{ fontFamily: "Poppins", fontSize: "16px", color: "#000000" }} />
            <Typography sx={{ fontFamily: "Poppins", fontSize: "16px", color: "#000000" }}>Sign out</Typography>
          </IconButton>
        </Drawer>

      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar sx={{ p: "10px" }} />

        {tab === "dashboard" ? <Tab1 /> :
          tab === "createNew" ? <Tab2 /> :
            tab === "collection" ? <Tab3 /> :
              tab === "profile" ? <Tab4 /> :
                tab === "tab5" ? <Tab5 /> :
                  tab1 === "dashboard" && tab2 === "nftCollections" ? <NftCollection /> :
                    tab1 === "dashboard" && tab2 === "gamePass" ? <GamePass /> :
                      tab1 === "dashboard" && tab2 === "hack" ? <Hack /> :
                        null}


      </Box>

    </Box>
  );
}
AdminNavbar.propTypes = {
  window: PropTypes.func,
};

export default AdminNavbar;