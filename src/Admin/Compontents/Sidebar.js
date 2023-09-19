import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Dashboard as DashboardIcon, Menu as MenuIcon, Wallet as WalletIcon, Collections as CollectionsIcon, Add as AddIcon, LocalMall as LocalMallIcon, NotificationsNone as NotificationsNoneIcon, AccountCircle as AccountCircleIcon, Logout as LogoutIcon, Search as SearchIcon } from "@mui/icons-material"
import { useNavigate } from 'react-router-dom';
const drawerWidth = 220;

function Sidebar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate()
    const [navLinkBorder, setNavLinkBorder] = React.useState('dashboard');
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const color = { primaryColor: "#013CC6", secondaryColor: "#0B63F8" }
    const font = { primary: "Poppins", secondary: "Roboto" }

    let navItems;

    if (props.userData?.role === "admin") {
      navItems = [
        { id: 1, label: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { id: 2, label: 'Users', icon: <AddIcon />, path: '/admin/users' },
        { id: 3, label: 'Courses', icon: <CollectionsIcon />, path: '/admin/courses' },
        { id: 4, label: 'Profile', icon: <LocalMallIcon />, path: '/admin/profile' },
        { id: 5, label: 'Scholarship', icon: <WalletIcon />, path: '/admin/scholarship' },
      ];
    } else {
      navItems = [
        // { id: 1, label: 'Dashboard', icon: <DashboardIcon />, path: '/user/dashboard' },
        // { id: 2, label: 'Users', icon: <AddIcon />, path: '/user/users' },
        { id: 2, label: 'Courses', icon: <CollectionsIcon />, path: '/user/courses' },
        { id: 3, label: 'Profile', icon: <LocalMallIcon />, path: '/user/profile' },
        { id: 4, label: 'Scholarship', icon: <WalletIcon />, path: '/user/scholarship' },
      ];
    }
    
   
    

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
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
            <Divider />

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% )` },
                    ml: { sm: `${drawerWidth}px` },
                    zIndex:"10000",
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" >
                        Coaching
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {
                    props.outlet && props.outlet
                }

            </Box>
        </Box>
    );
}

Sidebar.propTypes = {
    window: PropTypes.func,
};

export default Sidebar;
