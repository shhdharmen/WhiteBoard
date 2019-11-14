import React, { Component } from "react";
import {
  Container,
  Icon,
  Grid,
  Row,
  Content,
  List,
  ListItem,
  Text
} from "native-base";
import { View, AsyncStorage, TouchableNativeFeedback } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

import HeaderText from "../../_shared/components/HeaderText";

type Props = {
  navigation: NavigationStackProp<{}>;
};

type State = {};

export default class SettingsScreen extends Component<Props, State> {
  render() {
    const { goBack } = this.props.navigation;
    return (
      <Container style={{ padding: 12 }}>
        <View
          style={{ flexDirection: "row", paddingTop: 8, alignItems: "center" }}
        >
          <TouchableNativeFeedback
            onPress={() => goBack()}
            background={TouchableNativeFeedback.SelectableBackground()}
            useForeground
          >
            <View style={{ borderRadius: 16 }}>
              <Icon
                type="FontAwesome5"
                name="long-arrow-alt-left"
                style={{
                  fontSize: 32
                }}
              ></Icon>
            </View>
          </TouchableNativeFeedback>
          <HeaderText size="h2" text=" Settings"></HeaderText>
        </View>
        <Content>
          <List>
            <ListItem onPress={() => this._logout()}>
              <Text>Logout</Text>
              <Icon name="md-exit" style={{ marginLeft: "auto" }}></Icon>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }

  _logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}
