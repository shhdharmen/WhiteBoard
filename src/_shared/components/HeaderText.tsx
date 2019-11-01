import React, { Component } from "react";
import { Text } from "react-native";
import { Item, Input } from "native-base";
type Props = {
  size?: "h1" | "h2" | "h3" | "h4";
  text?: string;
  input?: boolean;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  value?: string;
  autoFocus?: boolean;
  style?: any;
  disabled?: boolean;
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
    if (this.props.input) {
      return (
        <Item style={this.props.style}>
          <Input
            placeholder={this.props.placeholder}
            onChangeText={this.props.onChangeText}
            style={{
              fontFamily: "Poppins_Medium",
              fontSize: this.sizes.h4
            }}
            value={this.props.value}
            autoFocus={this.props.autoFocus}
            disabled={this.props.disabled}
          />
        </Item>
      );
    }
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
