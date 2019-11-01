import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet, AsyncStorage } from "react-native";
import { Container } from "native-base";

import Loader from "../../_shared/components/Loader";

type Props = {
  navigation: any;
};

type State = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default class AuthLoadingScreen extends React.Component<Props, State> {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("user");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <Container style={styles.container}>
        <Loader></Loader>
      </Container>
    );
  }
}
