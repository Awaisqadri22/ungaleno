import React from "react";
import { withStyles } from "@material-ui/styles";
import { Grid, Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = () => ({
  root: {
    flexGrow: 1
  },
  gridMargin: {
    marginBottom: 25,
    width: 100,
    heigth: 100
  },

  buttonStyle1: {
    width: 200,
    height: 100,
    fontWeight: "bold",
    backgroundColor: "#44A9D7"
  },
  buttonStyle2: {
    width: 200,
    height: 100,
    fontWeight: "bold",
    backgroundColor: "#4A83A8"
  },
  buttonStyle3: {
    width: 200,
    height: 100,
    fontWeight: "bold",
    backgroundColor: "#99C197"
  },
  buttonStyle4: {
    width: 200,
    height: 100,
    fontWeight: "bold",
    backgroundColor: "#73C6D1"
  },
  buttonStyle5: {
    width: 200,
    height: 100,
    fontWeight: "bold",
    backgroundColor: "#E7D222"
  },
  buttonStyle6: {
    width: 200,
    height: 100,
    fontWeight: "bold",
    backgroundColor: "#CB6691"
  },
  buttonStyle7: {
    width: 200,
    height: 100,
    fontWeight: "bold",
    backgroundColor: "#E2DB7E"
  },
  buttonStyle8: {
    width: 200,
    height: 100,
    fontWeight: "bold",
    backgroundColor: "#51E78F"
  },
  buttonStyle9: {
    width: 200,
    height: 100,
    fontWeight: "bold",
    backgroundColor: "#CCCCCC"
  },
  buttonStyle10: {
    width: 200,
    height: 100,
    fontWeight: "bold",
    backgroundColor: "#62C4A3"
  },
  buttonStyle11: {
    width: 200,
    height: 100,
    fontWeight: "bold",
    backgroundColor: "#C089CA"
  },
  buttonStyle12: {
    width: 200,
    height: 100,
    fontWeight: "bold",
    backgroundColor: "#D5A0A9"
  },
  buttonStyle13: {
    width: 200,
    height: 100,
    fontWeight: "bold",
    backgroundColor: "#DB3B34"
  },
  buttonStyleLarge: {
    height: 100,
    fontWeight: "bold",
    backgroundColor: "#DB3B34"
  }
});

class MainPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Grid
          style={{
            display: "flex",
            flexDirection: "row"
          }}
          container
        >
          <Grid className={classes.gridMargin} item xs={12} md={4}>
            <Button className={classes.buttonStyle1} variant="contained">
              GENERAL MEDICAL
            </Button>
          </Grid>
          <Grid className={classes.gridMargin} item xs={12} md={4}>
            <Button className={classes.buttonStyle2} variant="contained">
              MEDICAL SPECIALIST
            </Button>
          </Grid>
          <Grid className={classes.gridMargin} item xs={12} md={4}>
            <Button className={classes.buttonStyle3} variant="contained">
              DENTIST
            </Button>
          </Grid>
          <Grid className={classes.gridMargin} item xs={12} md={4}>
            <Button className={classes.buttonStyle4} variant="contained">
              NURSING
            </Button>
          </Grid>
          <Grid className={classes.gridMargin} item xs={12} md={4}>
            <Button className={classes.buttonStyle5} variant="contained">
              PSICOLOGOS
            </Button>
          </Grid>
          <Grid className={classes.gridMargin} item xs={12} md={4}>
            <Button className={classes.buttonStyle6} variant="contained">
              NUTRITION
            </Button>
          </Grid>
          <Grid className={classes.gridMargin} item xs={12} md={4}>
            <Button className={classes.buttonStyle7} variant="contained">
              PHYSICAL REHABILITATION
            </Button>
          </Grid>
          <Grid className={classes.gridMargin} item xs={12} md={4}>
            <Button className={classes.buttonStyle8} variant="contained">
              VETERNARY
            </Button>
          </Grid>
          <Grid className={classes.gridMargin} item xs={12} md={4}>
            <Button className={classes.buttonStyle9} variant="contained">
              OPTICS
            </Button>
          </Grid>{" "}
          <Grid className={classes.gridMargin} item xs={12} md={4}>
            <Button className={classes.buttonStyle10} variant="contained">
              PHARMACY
            </Button>
          </Grid>{" "}
          <Grid className={classes.gridMargin} item xs={12} md={4}>
            <Button className={classes.buttonStyle11} variant="contained">
              CLINIC
            </Button>
          </Grid>{" "}
          <Grid className={classes.gridMargin} item xs={12} md={4}>
            <Button className={classes.buttonStyle12} variant="contained">
              HOSPITALS
            </Button>
          </Grid>
          <Grid className={classes.gridMargin} item xs={12} md={12}>
            <Button
              fullWidth
              className={classes.buttonStyleLarge}
              variant="contained"
            >
              AMBULANCE
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(useStyles)(MainPage);
