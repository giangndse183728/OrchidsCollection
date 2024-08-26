import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faNewspaper, faPhone, faSliders } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeaderStyle.css';

const ResponsiveNavbar = () => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const image = localStorage.getItem('userPhoto');
  const nameUser = localStorage.getItem('userName');
  const email = localStorage.getItem('userEmail');
 

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
    
  }, []);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    // Clear all localStorage
    setIsAuthenticated(false);
    handleClose() ;
    localStorage.clear();
    navigate('/');
  };
  return (
    <>
      <div className='header'>
        <Navbar expand="lg" className='navbar'>
          <Container className='navbar-container'>

            <NavLink to="/" className="nav-link">
              <Navbar.Brand>
                <img
                  src="/images/flower.png"
                  width="38"
                  height="40"
                  className="d-inline-block align-top"
                  alt="."
                /><span className="brand-text">rchids</span>
              </Navbar.Brand>
            </NavLink>


            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <img
                  src="/images/linetree.png"
                  width="55"
                  height="45"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />

                <NavLink to="/Collection" className="nav-link">
                  <FontAwesomeIcon icon={faHeart} style={{ color: "#B197FC" }} /> Collections
                </NavLink>
                <NavLink to="/News" className="nav-link">
                  <FontAwesomeIcon icon={faNewspaper} style={{ color: "#38a9ff" }} /> News
                </NavLink>
                <NavLink to="/Contact" className="nav-link">
                  <FontAwesomeIcon icon={faPhone} style={{ color: "#dbac00" }} /> Contact
                </NavLink>

                {isAuthenticated && (
                <NavLink to="/Admin" className="nav-link">
                <FontAwesomeIcon icon={faSliders} style={{color: "#57595c"}} /> Admin
                </NavLink>
                )}

                <img
                  src="/images/linetree.png"
                  width="120"
                  height="45"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
              </Nav>
              {!isAuthenticated && (
                <NavLink to="/Login" className="nav-link">
                  <Button variant="warning" style={{ borderRadius: '100px' }}>
                    <FontAwesomeIcon icon={faUser} style={{ color: "purple" }} />&nbsp; Login
                  </Button>
                </NavLink>
              )}

          {isAuthenticated && (
            
              <IconButton
                onClick={handleOpen}
                sx={{
                  width: 40,
                  height: 40,

                }}
              >
                <span className="brand-text">Welc</span>
                <Avatar
                  src={image}
                  alt={nameUser}
                  sx={{
                    width: 36,
                    height: 36,
                    border: (theme) => `solid 2px ${theme.palette.background.default}`,
                  }}
                >
                  {nameUser}
                </Avatar>
                <span className="brand-text">me</span>
              </IconButton>
                 )}

              <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: {
                    p: 0,
                    mt: 1,
                    ml: 0.75,
                    width: 200,
                  },
                }}
              >
                <Box sx={{ my: 1.5, px: 2 }}>
                  <Typography variant="subtitle2" noWrap>
                    {nameUser}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                    {email}
                  </Typography>
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />



                <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

                <MenuItem
                  onClick={handleLogout}
                  sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
                >
                  Logout
                </MenuItem>
              </Popover>
       
            </Navbar.Collapse>

          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default ResponsiveNavbar;
