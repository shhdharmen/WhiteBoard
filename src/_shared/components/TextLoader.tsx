import React, { Component } from "react";
import LottieView from "lottie-react-native";

type Props = {};

type State = {};

export default class TextLoader extends Component<Props, State> {
  render() {
    return (
      <LottieView
        source={require("../../assets/loaders/dots-loading-1.json")}
        autoPlay
      ></LottieView>
    );
  }
}
