import React from "react";
import { StyleSheet, AsyncStorage } from "react-native";
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
  Toast,
  Left,
  Right,
  Body,
  Title,
  Grid,
  View
} from "native-base";
import { Formik } from "formik";
import { Col } from "react-native-easy-grid";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    marginBottom: 16,
    width: 350
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
        <Content contentContainerStyle={styles.content}>
          <Formik
            initialValues={{ identifier: "", password: "" }}
            onSubmit={(values, actions) =>
              this._signInAsync(values, actions.setSubmitting)
            }
          >
            {props => (
              <Form style={styles.form}>
                <Item fixedLabel>
                  <Label>
                    <Text>Username</Text>
                  </Label>
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
                  <Label>
                    <Text>Password</Text>
                  </Label>
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
                  iconRight
                  disabled={props.isSubmitting}
                  primary
                  onPress={props.handleSubmit}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 16
                  }}
                >
                  <Text>Sign In</Text>
                  {props.isSubmitting ? (
                    <Spinner color="#fff" />
                  ) : (
                    <Icon type="FontAwesome" name="chevron-circle-right"></Icon>
                  )}
                </Button>
              </Form>
            )}
          </Formik>
          <View style={{ flexDirection: "row" }}>
            <Button bordered small>
              <Text>Register Now</Text>
            </Button>
            <Button bordered small>
              <Text>Forgot Password?</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }

  _signInAsync = async ({ identifier, password }, setSubmitting) => {
    const signInSubscriber$ = AuthService.login(identifier, password).subscribe(
      {
        next: async response => {
          await AsyncStorage.setItem("user", JSON.stringify(response.data));
          setSubmitting(false);
          this.props.navigation.navigate("App");
        },
        error: err => {
          setSubmitting(false);
          Toast.show({
            text: err.message || err.data.message[0].messages[0].message,
            duration: 3000
          });
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
