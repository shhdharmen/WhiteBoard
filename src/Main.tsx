import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import DashboardScreen from "./screens/Dashboard";
import RegisterScreen from "./screens/Register";
import ForgotPasswordScreen from "./screens/ForgotPassword";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Login: { screen: LoginScreen },
    Dashboard: { screen: DashboardScreen },
    Register: { screen: RegisterScreen },
    ForgotPassword: { screen: ForgotPasswordScreen }
  },
  {
    initialRouteName: "Home"
  }
);

const Main = createAppContainer(MainNavigator);

export default Main;
