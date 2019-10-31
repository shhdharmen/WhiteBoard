import React, { Component } from "react";
import { Text } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import LottieView from "lottie-react-native";

type Props = {};

type State = {};

export default class Loader extends Component<Props, State> {
  render() {
    return (
      <Grid>
        <Row size={3}>
          <LottieView
            source={require("../../assets/315-loader-ring.json")}
            autoPlay
          ></LottieView>
        </Row>
        <Row size={2}>
          <Text style={{ marginLeft: "auto", marginRight: "auto" }}>
            Please wait...
          </Text>
        </Row>
      </Grid>
    );
  }
}
