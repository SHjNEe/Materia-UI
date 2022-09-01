import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../assets/logo.svg";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Menu, MenuItem, Tab, Tabs } from "@mui/material";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    toolbarMargin: {
      ...theme?.mixins.toolbar,
      marginBottom: 3,
    },
    logo: {
      height: "8em",
    },
    logoContainer: {
      padding: 0,
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    tabContainer: {
      marginLeft: "auto",
    },
    tab: {
      ...theme?.typography.tab,
      width: 60,
      marginLeft: "30px",
      borderRadius: "10px",
      "&:hover": {
        backgroundColor: "blue",
      },
    },
    button: {
      ...theme?.mixins.estimate,
      borderRadius: "50px",
      marginLeft: "50px",
      marginRight: "25px",
      height: "45px",
    },
    menu: {
      backgroundColor: "grey",
      color: "white",
      width: 200,
    },
    menuItem: {
      ...theme.typography.tab,
      opacity: 0.7,
      "&:hover": {
        opacity: 1,
      },
    },
  };
});
function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Header(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    switch (window.location.pathname) {
      case "/":
        if (value !== 0) {
          setValue(0);
          setSelectedIndex(0);
        }
        break;
      case "/home":
        if (value !== 0) {
          setValue(0);
          setSelectedIndex(0);
        }
        break;
      case "/services":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(1);
        }
        break;
      case "/contact":
        if (value !== 2) {
          setValue(2);
          setSelectedIndex(2);
        }
        break;
      case "/info":
        if (value !== 3) {
          setValue(3);
          setSelectedIndex(3);
        }
        break;
      case "/profile":
        if (value !== 4) {
          setValue(4);
          setSelectedIndex(4);
        }
        break;
      default:
        break;
    }
  }, [value]);
  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handlerClick(e) {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  }

  function handlerClose() {
    setAnchorEl(null);
    setOpen(false);
  }
  function handleMenuItemClick(e, i) {
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(i);
  }

  const menuOptions = [
    { name: "Home", link: "/home" },
    { name: "Services", link: "/services" },
    { name: "Contacts", link: "/contact" },
  ];

  return (
    <>
      <ElevationScroll>
        <AppBar color="primary" position="fixed">
          <Toolbar disableGutters={true} className={classes.toolbarMargin}>
            <Button
              onClick={() => setValue(0)}
              component={NavLink}
              to="/"
              className={classes.logoContainer}
              disableRipple
            >
              <img src={logo} alt="company logo" className={classes.logo} />
            </Button>
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
              textColor="white"
              indicatorColor="secondary"
            >
              <Tab
                className={classes.tab}
                label="My ideas"
                component={NavLink}
                to="/home"
              />
              <Tab
                className={classes.tab}
                label="Services"
                component={NavLink}
                to="/services"
                aria-owns={anchorEl ? "simple-services" : undefined}
                aria-haspopup={anchorEl ? true : false}
                onMouseOver={(e) => handlerClick(e)}
              />
              <Tab
                className={classes.tab}
                label="Contact"
                component={NavLink}
                to="/contact"
              />
              <Tab
                className={classes.tab}
                label="Info"
                component={NavLink}
                to="/info"
              />
              <Tab
                className={classes.tab}
                label="Profile"
                component={NavLink}
                to="/profile"
              />
            </Tabs>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Click Me
            </Button>
            <Menu
              id="simple-ideas"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handlerClose}
              MenuListProps={{ onMouseLeave: handlerClose }}
              classes={{ paper: classes.menu }}
              elevation={0}
            >
              {menuOptions.map((e, index) => (
                <MenuItem
                  key={index}
                  onClick={(event) => {
                    handleMenuItemClick(event, index);
                    setValue(index);
                    handlerClose();
                  }}
                  component={NavLink}
                  to={e.link}
                  classes={{ root: classes.menuItem }}
                  selected={index === selectedIndex && value === 1}
                >
                  {e.name}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </>
  );
}
