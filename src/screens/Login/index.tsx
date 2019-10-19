import React from "react";
import { StyleSheet } from "react-native";
import { AuthService } from "../../_shared/services/auth.service";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
  Spinner,
  Icon,
  Toast
} from "native-base";
import { Formik } from "formik";
import AsyncStorage from "@react-native-community/async-storage";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

type Props = {
  navigation: any;
};

type State = {
  showPassword: boolean;
};

export default class LoginScreen extends React.Component<Props, State> {
  _cleanup = null;
  static navigationOptions = {
    title: "Please sign in"
  };

  state = {
    showPassword: false
  };

  componentWillUnmount() {
    if (this._cleanup) {
      this._cleanup();
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <Content contentContainerStyle={styles.content}>
          <Formik
            initialValues={{ identifier: "", password: "" }}
            onSubmit={(values, actions) =>
              this._signInAsync(values, actions.setSubmitting)
            }
          >
            {props => (
              <Form style={{ width: 350 }}>
                <Item fixedLabel>
                  <Label>Username</Label>
                  <Input
                    disabled={props.isSubmitting}
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    value={props.values.identifier}
                    onChangeText={props.handleChange("identifier")}
                    onBlur={props.handleBlur("identifier")}
                  />
                </Item>
                <Item fixedLabel last>
                  <Label>Password</Label>
                  <Input
                    disabled={props.isSubmitting}
                    autoCompleteType="password"
                    textContentType="password"
                    secureTextEntry={!this.state.showPassword}
                    value={props.values.password}
                    onChangeText={props.handleChange("password")}
                    onBlur={props.handleBlur("password")}
                  />
                  <Button icon transparent onPress={this._togglePassword}>
                    <Icon
                      name={this.state.showPassword ? "md-eye" : "md-eye-off"}
                    ></Icon>
                  </Button>
                </Item>
                <Button
                  disabled={props.isSubmitting}
                  primary
                  onPress={props.handleSubmit}
                  style={{
                    width: 100,
                    marginTop: 10,
                    justifyContent: "center",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                >
                  {props.isSubmitting ? <Spinner /> : <Text>Sign In</Text>}
                </Button>
              </Form>
            )}
          </Formik>
        </Content>
      </Container>
    );
  }

  _signInAsync = async ({ identifier, password }, setSubmitting) => {
    const signInSubscriber$ = AuthService.login(identifier, password).subscribe(
      {
        next: async response => {
          await AsyncStorage.setItem("user", JSON.stringify(response));
          setSubmitting(false);
          this.props.navigation.navigate("App");
        },
        error: err => {
          setSubmitting(false);
          console.log(err.data.message[0].messages[0].message);
          Toast.show({ text: err.data.message[0].messages[0].message });
        }
      }
    );
    this._cleanup = () => signInSubscriber$.unsubscribe();
  };

  _togglePassword = () => {
    this.setState(state => {
      return { showPassword: !state.showPassword };
    });
  };
}
