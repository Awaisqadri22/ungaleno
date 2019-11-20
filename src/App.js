import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Geocode from "react-geocode";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { setCurrentState } from "./redux/state/state.actions";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import { selectCurrentState } from "./redux/state/state.selector";

import Header from "./components/header/header";
import SignIn from "./components/sign-in/sign-in";
import SignUp from "./components/sign-up/sign-up";
import MainPage from "./components/main-page/main-page";
import SignInAndSignOut from "./components/selectSignInOrSignUp/selectSignInOrSignUp";
import Footer from "./components/footer/footer";
import Home from "./components/states-category/states-category";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cityName: ""
    };
  }

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }
  componentWillMount() {
    this.position();
  }

  position = async () => {
    const { setCurrentState } = this.props;

    Geocode.setApiKey("AIzaSyBf26_QR7-2Xlz-F_APU-wJBCjZCf4-E5c");
    Geocode.setLanguage("en");

    navigator.geolocation.getCurrentPosition(async position => {
      await Geocode.fromLatLng(
        position.coords.latitude,
        position.coords.longitude
      ).then(
        response => {
          console.log("All data", response);
          const address = response.results[4].address_components[0].long_name;

          setCurrentState(address);
        },
        error => {
          console.log(position);
          console.error("12312313", error);
        }
      );
    });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header cityName={this.state.cityName} />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/landing" component={Home} />
            <Route exact path="/signInOptions" component={SignInAndSignOut} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  stateValue: selectCurrentState
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setCurrentState: state => dispatch(setCurrentState(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
