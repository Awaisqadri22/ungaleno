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

import {
  auth,
  createUserProfileDocument,
  newDocumentForNewDoctor
} from "../../firebase/firebase.utils";
import { storage } from "../../firebase/firebase.utils";
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
      asADoctore: false,
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      emailForDoctor: "",
      passwordForDoctor: "",
      displayNameForDoctor: "",
      direction: "",
      phone: "",
      allergies: "",
      sex: "",
      selectedDate: "",
      image: null,
      url: "",
      vdocument: ""
    };
  }
  formAdd = async event => {
    event.preventDefault();

    const {
      emailForDoctor,
      passwordForDoctor,
      displayNameForDoctor,
      direction,
      phone,
      allergies,
      sex,
      selectedDate,
      url
    } = this.state;

    if (emailForDoctor === "") {
      return toast.error("Please Provide Full Email address", {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    if (passwordForDoctor.length < 6) {
      return toast.error("Password must be 6 characters long", {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        emailForDoctor,
        passwordForDoctor
      );

      await newDocumentForNewDoctor(user, {
        emailForDoctor,
        displayNameForDoctor,
        phone,
        allergies,
        direction,
        sex,
        selectedDate,
        url
      });
      toast.success(" Doctor Signed Up successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.setState({
        displayNameForDoctor: "",
        phone: "",
        allergies: "",
        direction: "",
        sex: "",
        selectedDate: ""
      });
    } catch (error) {
      console.log("Coming in error before");
      console.error(error);
    }
  };

  uploadPicture = () => {
    const { image } = this.state;
    if (!image) return;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            toast.success("Picture uploaded ", {
              position: toast.POSITION.TOP_RIGHT
            });
            this.setState({ url });
          });
      }
    );
  };

  handleSubmit = async event => {
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

  changePicture = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
    console.log(e.target.files[0]);
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

          {this.state.asADoctore ? (
            <form className={classes.form} noValidate onSubmit={this.formAdd}>
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
                    id="emailForDoctor"
                    label="Email Address"
                    name="emailForDoctor"
                    autoComplete="emailForDoctor"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={this.handleChange}
                    id="passwordForDoctor"
                    label="Password"
                    name="passwordForDoctor"
                    autoComplete="passwordForDoctor"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    onChange={this.handleChange}
                    fullWidth
                    name="displayNameForDoctor"
                    label="Display Name"
                    id="displayNameForDoctor"
                    autoComplete="displayNameForDoctor"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={this.handleChange}
                    name="direction"
                    label="Direction"
                    id="direction"
                    autoComplete="direction"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={this.handleChange}
                    name="phone"
                    label="Phone"
                    id="phone"
                    autoComplete="phone"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="allergies"
                    label="Allergies"
                    onChange={this.handleChange}
                    id="allergies"
                    autoComplete="allergies"
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
                    id="sex"
                    name="sex"
                    onChange={this.handleChange}
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
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
                      name="selectedDate"
                      onChange={this.handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid
                  style={{
                    display: "flex",
                    justifyContent: "row",
                    alignItems: "center"
                  }}
                >
                  <Grid
                    style={{
                      marginLeft: 10
                    }}
                    item
                    xs={12}
                    sm={6}
                  >
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
                      name="image"
                      id="image"
                      autoComplete="picture"
                      onChange={this.changePicture}
                    />
                  </Grid>
                  <Grid
                    style={{
                      float: "right"
                    }}
                    item
                    xs={12}
                    sm={6}
                  >
                    <Button
                      style={{
                        backgroundColor: "green",
                        color: "white"
                      }}
                      onClick={this.uploadPicture}
                      type="upload"
                      variant="contained"
                      className={classes.submit}
                    >
                      Upload
                    </Button>
                  </Grid>
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
                    fullWidth
                    name="vdocument"
                    id="vdocument"
                    autoComplete="vdocument"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </form>
          ) : (
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
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
          <ToastContainer />
        </div>
      </Container>
    );
  }
}

export default withRouter(withStyles(useStyles)(SignUp));
