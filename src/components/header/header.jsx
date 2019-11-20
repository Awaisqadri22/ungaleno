import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentState } from "../../redux/state/state.selector";

const useStyles = () => ({
  root: {
    flexGrow: 1
  },
  menuButton: {},
  title: {},
  toolbarStyle: {
    display: "flex",
    justifyContent: "space-between"
  },
  root: {
    marginBottom: 100
  }
});

class Header extends React.Component {
  render() {
    const { classes, stateValue } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          style={{
            marginBottom: 20
          }}
        >
          <Toolbar className={classes.toolbarStyle}>
            <Typography
              style={{
                cursor: "pointer"
              }}
              onClick={() => {
                this.props.history.push("/");
              }}
              variant="h6"
              className={classes.title}
            >
              UnGaleno.com
            </Typography>

            <div>
              <Typography
                onClick={() => {
                  this.props.history.push("/landing");
                }}
                style={{
                  cursor: "pointer"
                }}
                variant="h6"
              >
                {stateValue}
              </Typography>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle
                  onClick={() => {
                    this.props.history.push("/signInOptions");
                  }}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
              ></Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  stateValue: selectCurrentState
});

export default connect(
  mapStateToProps,
  null
)(withRouter(withStyles(useStyles)(Header)));
