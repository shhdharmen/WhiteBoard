import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Main from "./src/Main";
import { StyleProvider, Root } from "native-base";
import getTheme from "./native-base-theme/components";

type Props = {};

type State = {
  isReady: boolean;
};

export default class App extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Poppins: require("./src/assets/fonts/Poppins-Regular.ttf"),
      Poppins_Medium: require("./src/assets/fonts/Poppins-Medium.ttf"),
      AnonymousPro: require("./src/assets/fonts/AnonymousPro-Regular.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <StyleProvider style={getTheme()}>
        <Root>
          <Main></Main>
        </Root>
      </StyleProvider>
    );
  }
}
