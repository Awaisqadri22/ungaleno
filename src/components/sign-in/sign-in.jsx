import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://ungaleno.com/">
        UnGaleno.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = () => ({
  "@global": {
    body: {}
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {},
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  submit: {}
});

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      asADoctore: false,
      account: {
        email: "",
        password: ""
      }
    };
  }
  userLogin = async event => {
    event.preventDefault();

    const { email, password } = this.state.account;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      toast.success("Logged In successfully", {
        position: toast.POSITION.TOP_RIGHT,
        className: "rotateY animated"
      });
      this.setState({
        email: "",
        password: ""
      });
    } catch (error) {
      toast.error("Wrong Email or Password", {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    this.setState({ email: "", password: "" });
  };
  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };
  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {this.state.asADoctore ? (
            <form className={classes.form} noValidate>
              <Grid
                style={{
                  marginBottom: 25
                }}
                container
                spacing={2}
              >
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    onChange={this.handleChange}
                    id="cardNo"
                    label="RFC / No. Card"
                    name="cardNo"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="doctorPassword"
                    onChange={this.handleChange}
                    label="Password"
                    type="password"
                    id="doctorPassword"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    style={{
                      marginBottom: 10
                    }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </form>
          ) : (
            <form onSubmit={this.userLogin} className={classes.form} noValidate>
              <Grid
                style={{
                  marginBottom: 25
                }}
                container
                spacing={2}
              >
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    onChange={this.handleChange}
                    label="Email"
                    name="email"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    onChange={this.handleChange}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    style={{
                      marginBottom: 10
                    }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
          <FormControlLabel
            control={
              <Checkbox
                onClick={() => {
                  this.setState({
                    asADoctore: !this.state.asADoctore
                  });
                }}
                value="remember"
                color="secondary"
              />
            }
            label="Are you a Doctor?"
          />
          <Button
            style={{
              marginBottom: 10
            }}
            type="submit"
            fullWidth
            variant="contained"
            onClick={signInWithGoogle}
            color="secondary"
            className={classes.submit}
          >
            Sign In With Google
          </Button>
          <Grid container>
            <Grid item>
              <Link
                to="/signup"
                onClick={() => {
                  this.props.history.push("/signup");
                }}
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <ToastContainer />
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withRouter(withStyles(useStyles)(SignIn));
