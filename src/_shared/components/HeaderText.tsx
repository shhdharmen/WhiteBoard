import React, { Component } from "react";
import { Text } from "react-native";
type Props = {
  size: "h1" | "h2" | "h3" | "h4";
  text: string;
};

type State = {};

export default class HeaderText extends Component<Props, State> {
  sizes = {
    h1: 60,
    h2: 48,
    h3: 36,
    h4: 24
  };
  render() {
    return (
      <Text
        style={{
          fontFamily: "Poppins_Medium",
          fontSize: this.sizes[this.props.size]
        }}
      >
        {this.props.text}
      </Text>
    );
  }
}
