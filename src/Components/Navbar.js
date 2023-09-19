import * as React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/userSlice';
import logo from "../Images/logo.jpg"

const LinkColor = "#494e56";
const ButtonColor = "#5b58ff";
const drawerWidth = "100%";

const navItems = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Course', link: '/course' },
  { name: 'Contact', link: '/contact' },
];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error, isLoading, userData } = useSelector((state) => state.custom2);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleAboutClick = () => {
    if (location.pathname === '/') {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate('/');
    }
  };

  const drawer = (
    <>
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
          <img src={logo} alt="" width="70px" />
        </Box>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                to={item.link}
                onClick={item.name === 'About' ? handleAboutClick : undefined}
                sx={{
                  textAlign: 'center',
                  '&:hover': {
                    color: ButtonColor,
                  },
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
         {!isAuthenticated ? (
              <Link to="/login">
                <Button variant="contained" sx={{ display: { sm: 'none' }, backgroundColor: ButtonColor }}>
                  Log In
                </Button>
              </Link>
            ) : (
              <Button onClick={() => dispatch(logout())} variant="contained" sx={{ display: { sm: 'none' }, backgroundColor: ButtonColor }}>
                Log Out
              </Button>
            )}
      </Box>
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex',mb:2 }}>
      <CssBaseline />
      <AppBar component="nav" className="bg-white">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: 'none' },
              color: LinkColor,
              fontFamily: "inter",
              fontSize: "16px",
              marginX: "10px",
              fontWeight: "500"
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <IconButton sx={{ display: { sm: 'none' }, p: 0, marginRight: "10px" }}>
              {userData ? (
                <img
                  alt="Remy Sharp"
                  src={userData.avatar.url}
                  className="w-8 h-8 rounded-full"
                  onClick={() => navigate(`/${userData.role}/dashboard`)}
                />
              ) : (
                <AccountCircleIcon className="fs-2 " />
              )}
            </IconButton>
            {/* {!isAuthenticated ? (
              <Link to="/login">
                <Button variant="contained" sx={{ display: { sm: 'none' }, backgroundColor: ButtonColor }}>
                  Log In
                </Button>
              </Link>
            ) : (
              <Button onClick={() => dispatch(logout())} variant="contained" sx={{ display: { sm: 'none' }, backgroundColor: ButtonColor }}>
                Log Out
              </Button>
            )} */}
          </Box>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              color: LinkColor,
              fontFamily: "inter"
            }}
          >
            <Box sx={{ p: 2}}>
              <img src={logo} alt="" width="50" />
            </Box>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.link}
                onClick={item.name === 'About' ? handleAboutClick : undefined}
                sx={{
                  color: LinkColor,
                  fontFamily: "inter",
                  fontSize: "16px",
                  marginX: "10px",
                  fontWeight: "500",
                  '&:hover': {
                    color: ButtonColor,
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
            <IconButton sx={{ p: 0, marginRight: "10px" }}>
              {userData ? (
                <img
                  alt="Remy Sharp"
                  src={userData.avatar.url}
                  className="w-8 h-8 rounded-full"
                  onClick={() => navigate(`/${userData.role}/dashboard`)}
                />
              ) : (
                <AccountCircleIcon className="fs-2 " />
              )}
            </IconButton>
            {!isAuthenticated ? (
              <Link to="/login">
                <Button variant="contained" sx={{ backgroundColor: ButtonColor }}>
                  Log In
                </Button>
              </Link>
            ) : (
              <Button onClick={() => dispatch(logout())} variant="contained" sx={{ backgroundColor: ButtonColor }}>
                Log Out
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
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
      </Box>
      <Toolbar />
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
