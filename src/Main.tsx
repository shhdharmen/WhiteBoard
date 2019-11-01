import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import DashboardScreen from "./screens/Dashboard";
import RegisterScreen from "./screens/Register";
import SettingsScreen from "./screens/Settings";
import ForgotPasswordScreen from "./screens/ForgotPassword";
import AuthLoadingScreen from "./screens/AuthLoading";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";
import NoteScreen from "./screens/Note";

const AppStack = createAnimatedSwitchNavigator(
  {
    Home: { screen: HomeScreen },
    Dashboard: { screen: DashboardScreen },
    Settings: { screen: SettingsScreen },
    Note: { screen: NoteScreen }
  },
  {
    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={350}
          interpolation="easeIn"
        />
        <Transition.In
          type="slide-right"
          durationMs={400}
          interpolation="easeOut"
        />
      </Transition.Together>
    )
  }
);

const AuthStack = createAnimatedSwitchNavigator(
  {
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
    ForgotPassword: { screen: ForgotPasswordScreen }
  },
  {
    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={350}
          interpolation="easeIn"
        />
        <Transition.In
          type="slide-right"
          durationMs={400}
          interpolation="easeOut"
        />
      </Transition.Together>
    )
  }
);

const Main = createAppContainer(
  createAnimatedSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

export default Main;
