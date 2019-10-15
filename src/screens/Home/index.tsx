import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { NavigationStackOptions } from "react-navigation-stack";
import { Container } from "native-base";
import LottieView from "lottie-react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

type Props = {
  navigation: any;
};

type State = {};

export default class HomeScreen extends Component<Props, State> {
  static navigationOptions: NavigationStackOptions = {
    headerStyle: {
      display: "none"
    }
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <LottieView
          source={require("../../assets/315-loader-ring.json")}
          autoPlay
        ></LottieView>
      </Container>
    );
  }
}
