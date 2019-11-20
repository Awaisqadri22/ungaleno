import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";

import play3 from "../../assets/img/play3.jpg";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";

import Select from "@material-ui/core/Select";

import { connect } from "react-redux";
import { setCurrentState } from "../../redux/state/state.actions";

import { createStructuredSelector } from "reselect";
import { selectCurrentState } from "../../redux/state/state.selector";

const useStyles = theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    // backgroundImage: `url(${play3})`,
    padding: "200px 0px 200px 0px",
    "@media (max-width:600px)": {
      padding: "100px 0px 100px 0px"
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  color: {
    color: theme.palette.common.white
  }
});

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      region: ""
    };
  }

  render() {
    const { classes } = this.props;
    const { setCurrentState } = this.props;
    const handleChange = event => {
      this.setState(
        {
          region: event.target.value
        },
        setCurrentState(event.target.value),
        this.props.history.push("/")
      );
    };

    return (
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Select
              style={{
                width: 300
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.region}
              onChange={handleChange}
            >
              <MenuItem value="Selecciona una ciudad">
                Selecciona una ciudad
              </MenuItem>
              <MenuItem value="Chihuahua">Chihuahua</MenuItem>
              <MenuItem value="Delicias">Delicias</MenuItem>
              <MenuItem value="Juarez">Juarez</MenuItem>
              <MenuItem value="Merida">Merida</MenuItem>
              <MenuItem value="Puebla">Puebla</MenuItem>
            </Select>
          </Container>
        </div>
      </main>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  stateValue: selectCurrentState
});

const mapDispatchToProps = dispatch => ({
  setCurrentState: state => dispatch(setCurrentState(state))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(useStyles)(Home)));
