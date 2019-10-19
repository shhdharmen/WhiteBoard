import React, { Component } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import { NavigationStackOptions } from "react-navigation-stack";
import { Container, Text, Button } from "native-base";
import { AuthService } from "../../_shared/services/auth.service";

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
        <Text>Home Screen</Text>
        <Button onPress={this._signOutAsync}>
          <Text>Sign Out</Text>
        </Button>
      </Container>
    );
  }

  _signOutAsync = async () => {
    await AuthService.logout();
    this.props.navigation.navigate("Auth");
  };
}
