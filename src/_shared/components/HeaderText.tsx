import React, { Component } from "react";
import { Text } from "react-native";
import { Item, Input } from "native-base";
type Props = {
  size?: "h1" | "h2" | "h3" | "h4" | "h5";
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
    h4: 24,
    h5: 18
  };
  render() {
    const {
      input,
      size = "h4",
      style,
      placeholder,
      onChangeText,
      autoFocus,
      disabled,
      text,
      value
    } = this.props;
    if (input) {
      return (
        <Item style={style}>
          <Input
            placeholder={placeholder}
            onChangeText={onChangeText}
            style={{
              fontFamily: "Poppins_Medium",
              fontSize: this.sizes[size]
            }}
            value={value}
            autoFocus={autoFocus}
            disabled={disabled}
          />
        </Item>
      );
    }
    return (
      <Text
        style={{
          fontFamily: "Poppins_Medium",
          fontSize: this.sizes[size]
        }}
      >
        {text}
      </Text>
    );
  }
}
