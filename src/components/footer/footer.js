import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  footerContainer: {
    backgroundColor: "gray",
    width: "100%",
    height: 90,
    paddingTop: "20px",
    paddingBottom: "20px",
    position: "relative",
    marginTop: 0,
    left: 0,
    right: 0,
    heigth: "100%"
  },
  linkStyles: {
    color: theme.palette.common.white,
    textDecoration: "none",
    cursor: "pointer"
  },

  alignLink: {
    display: "flex"
  }
}));

const Routes = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container className={classes.pagesAlign}>
        <Grid item xs={12} md={2} lg={2} align="center">
          <NavLink className={classes.linkStyles} to="/contact-us">
            Contact Us
          </NavLink>
        </Grid>
        <Grid item xs={12} md={2} lg={2} align="center">
          <NavLink className={classes.linkStyles} to="/faq">
            About Us
          </NavLink>
        </Grid>

        <Grid item xs={12} md={3} lg={3} align="center">
          <NavLink className={classes.linkStyles} to="/terms">
            Terms & Condition
          </NavLink>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footerContainer}>
      <Container>
        <Grid container align="center">
          <Grid item xs={12} md={2} lg={2}>
            <NavLink to="/" className={classes.linkStyles}>
              <span style={{ fontSize: "20px" }}>UnGaleno</span>
            </NavLink>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            className={classes.logoAndCopyRights}
          >
            <span>
              {new Date().getFullYear()} UnGaleno. All right reserved.
            </span>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Routes classes={classes} />
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
export default Footer;
