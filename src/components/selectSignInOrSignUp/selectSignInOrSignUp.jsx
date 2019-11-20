import React from "react";
import { withStyles } from "@material-ui/styles";
import { Grid, Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

const useStyles = () => ({
  root: {
    flexGrow: 1
  },
  gridMargin: {
    marginBottom: 25,
    width: 100,
    heigth: 100
  },
  buttonStyle: {
    width: 200,
    height: 100,
    fontWeight: "bold"
  },
  buttonStyleLarge: {
    height: 100,
    fontWeight: "bold"
  }
});

class SignInAndSignOut extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Grid
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
          container
        >
          <Grid className={classes.gridMargin} item xs={12} md={4}>
            <Button
              onClick={() => {
                this.props.history.push("/signin");
              }}
              className={classes.buttonStyle}
              variant="contained"
            >
              Login
            </Button>
          </Grid>
          <Grid className={classes.gridMargin} item xs={12} md={4}>
            <Button
              onClick={() => {
                this.props.history.push("/signup");
              }}
              className={classes.buttonStyle}
              variant="contained"
            >
              Create Account
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default withRouter(withStyles(useStyles)(SignInAndSignOut));
