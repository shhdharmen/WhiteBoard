import React from "react";
import { Platform } from "react-native";
import TouchableFeedbackAndroid from "./TouochableFeedback.android";
import TouchableFeedbackIOS from "./TouochableFeedback.ios";

type Props = {
  children: any;
  onLongPress?: () => void;
  onPress?: () => void;
  background?: any;
  useForeground?: boolean;
};

type State = {};

export default class TouchableFeedback extends React.Component<Props, State> {
  render() {
    return Platform.OS === "android" ? (
      <TouchableFeedbackAndroid {...this.props}>
        {this.props.children}
      </TouchableFeedbackAndroid>
    ) : (
      <TouchableFeedbackIOS {...this.props}>
        {this.props.children}
      </TouchableFeedbackIOS>
    );
  }
}
