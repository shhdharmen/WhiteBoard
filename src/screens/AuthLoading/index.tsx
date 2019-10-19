import React from "react";
import LottieView from "lottie-react-native";
import { AsyncStorage, StyleSheet } from "react-native";
import { Container } from "native-base";

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
        <LottieView
          source={require("../../assets/315-loader-ring.json")}
          autoPlay
        ></LottieView>
      </Container>
    );
  }
}

// With Lottie

// import React, { Component } from "react";
// import { StyleSheet } from "react-native";
// import { NavigationStackOptions } from "react-navigation-stack";
// import { Container } from "native-base";
// import LottieView from "lottie-react-native";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

// type Props = {
//   navigation: any;
// };

// type State = {};

// export default class AuthLoadingScreen extends Component<Props, State> {
//   static navigationOptions: NavigationStackOptions = {
//     headerStyle: {
//       display: "none"
//     }
//   };
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <Container style={styles.container}>
//         <LottieView
//           source={require("../../assets/315-loader-ring.json")}
//           autoPlay
//         ></LottieView>
//       </Container>
//     );
//   }
// }
