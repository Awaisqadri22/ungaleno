import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    width: "100%"
  },
  submit: {}
});

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedDate: null,
      asADoctore: false,

      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }
  handleSubmit = async event => {
    console.log("jkhdfksdfskdjfh");
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      toast.error("Password does not match", {
        position: toast.POSITION.TOP_RIGHT
      });

      return;
    }

    if (displayName === "" || email === "" || password === "") {
      toast.error("Please Provide Full Informtion", {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });
      toast.success("Signed Up successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.log("Coming in error");
      console.error(error);
    }
  };
  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleDateChange = date => {
    this.setState({
      selectedDate: date
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Container
        style={{
          marginBottom: 50
        }}
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={this.handleSubmit}
          >
            {this.state.asADoctore ? (
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
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="name"
                    label="Name"
                    id="name"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="direction"
                    label="Direction"
                    id="direction"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="phone"
                    label="Phone"
                    id="phone"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="allergies"
                    label="Allergies"
                    id="allergies"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel
                    style={{
                      display: "flex",
                      justifyContent: "flex-start"
                    }}
                    id="demo-simple-select-label"
                  >
                    Sex
                  </InputLabel>
                  <Select
                    style={{
                      width: "100%"
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Male</MenuItem>
                    <MenuItem value={20}>Female</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel
                    style={{
                      display: "flex",
                      justifyContent: "flex-start"
                    }}
                    id="demo-simple-select-label"
                  >
                    Date of Birth
                  </InputLabel>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      style={{
                        width: "100%"
                      }}
                      value={this.state.selectedDate}
                      onChange={this.handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel
                    style={{
                      display: "flex",
                      justifyContent: "flex-start"
                    }}
                    id="demo-simple-select-label"
                  >
                    Profile Picture
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    type="file"
                    required
                    fullWidth
                    name="picture"
                    id="picture"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel
                    style={{
                      display: "flex",
                      justifyContent: "flex-start"
                    }}
                    id="demo-simple-select-label"
                  >
                    Verification document
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    type="file"
                    required
                    fullWidth
                    name="picture"
                    id="picture"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
            ) : (
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
                    required
                    fullWidth
                    onChange={this.handleChange}
                    id="displayName"
                    label="Display Name"
                    name="displayName"
                    autoComplete="displayName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={this.handleChange}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    onChange={this.handleChange}
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    onChange={this.handleChange}
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    autoComplete="confirmPassword"
                  />
                </Grid>
              </Grid>
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
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <ToastContainer />
          </form>
        </div>
      </Container>
    );
  }
}

export default withRouter(withStyles(useStyles)(SignUp));
