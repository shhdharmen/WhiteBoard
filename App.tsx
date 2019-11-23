import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Main from "./src/Main";
import { StyleProvider, Root } from "native-base";
import getTheme from "./native-base-theme/components";
// import Constants from "expo-constants";

// import * as Sentry from "sentry-expo";

// Sentry.init({
//   dsn: "https://9490cecf0fc94305aef86e2f53b0ef26@sentry.io/1832015",
//   enableInExpoDevelopment: true,
//   debug: true
// });

// Sentry.setRelease(Constants.manifest.revisionId);

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
