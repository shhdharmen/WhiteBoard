import React, { Component } from "react";
import { StyleSheet, Image, AsyncStorage, RefreshControl } from "react-native";
import { NavigationStackOptions } from "react-navigation-stack";
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Text,
  Toast,
  View,
  Icon,
  Button
} from "native-base";
import LottieView from "lottie-react-native";
import * as Animatable from "react-native-animatable";

import Loader from "../../_shared/components/Loader";
import TextLoader from "../../_shared/components/TextLoader";
import { NoteService } from "../../_shared/services/note.service";
import * as Note from "Note";
import * as User from "UserModel";
import { Grid, Col, Row } from "react-native-easy-grid";
import NotePreview from "../../_shared/components/NotePreview";
import HeaderText from "../../_shared/components/HeaderText";

const styles = StyleSheet.create({
  content: {
    flex: 1
  }
});

type Props = {
  navigation: any;
};

type State = {
  isFetchingNotes: boolean;
  isFetchingUserDetails: boolean;
  notes: Note.RootObject[];
  user: User.RootObject;
  refreshing: boolean;
};

export default class HomeScreen extends Component<Props, State> {
  _cleanup = null;
  state = {
    isFetchingNotes: true,
    isFetchingUserDetails: true,
    notes: [],
    user: {},
    refreshing: false
  };
  async componentDidMount() {
    // await AsyncStorage.clear();
    // this.props.navigation.navigate("Auth");
    this._fetchNotes();
    this._fetchUserDetails();
  }
  componentWillUnmount() {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={{ padding: 12 }}>
        <Content
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this._onRefresh()}
            />
          }
        >
          <Animatable.View animation="fadeInLeft" duration={350}>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 8,
                alignItems: "flex-start"
              }}
            >
              {this.state.isFetchingUserDetails ? (
                <TextLoader></TextLoader>
              ) : (
                <HeaderText
                  size="h1"
                  text={"Hi " + this.state.user.user.firstname}
                ></HeaderText>
              )}
              <Icon
                // type="FontAwesome"
                name="md-settings"
                style={{
                  fontSize: 32,
                  marginLeft: "auto",
                  marginTop: 16
                }}
                onPress={() => navigate("Settings")}
              ></Icon>
            </View>
          </Animatable.View>
          {/* <Content contentContainerStyle={styles.content}> */}
          {this.state.isFetchingNotes || this.state.refreshing ? (
            <Loader />
          ) : this.state.notes.length ? (
            <Grid style={{ padding: 8 }}>
              {this.state.notes.map((note, index) => (
                <Row key={index}>
                  <Col>
                    <NotePreview key={index} note={note}></NotePreview>
                  </Col>
                </Row>
              ))}
            </Grid>
          ) : (
            <Content
              contentContainerStyle={{
                flex: 1,
                // justifyContent: "center",
                // alignItems: "center",
                padding: 8
              }}
            >
              <Animatable.View animation="fadeIn" duration={350}>
                <Image
                  source={require("../../assets/images/mirage-list-is-empty.png")}
                  style={{
                    width: 300,
                    height: 300,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: 24
                  }}
                ></Image>
              </Animatable.View>
              <Animatable.View animation="fadeInRight" duration={350}>
                <HeaderText
                  size="h4"
                  text="We couldn't find any notes for you. Why don't you create one?"
                ></HeaderText>
              </Animatable.View>
              <Animatable.View animation="fadeInDown" duration={350}>
                <Button
                  primary
                  style={{ width: 150 }}
                  onPress={() => navigate("Note")}
                >
                  <Text>Create</Text>
                  <Icon name="md-add" style={{ marginLeft: "auto" }}></Icon>
                </Button>
              </Animatable.View>
            </Content>
          )}
        </Content>
        {/* </Content> */}
      </Container>
    );
  }

  _fetchNotes = async () => {
    const fetchNotesObservable = await NoteService.get();
    const fetchNotesSubscriber$ = fetchNotesObservable.subscribe({
      next: response => {
        const notes = response.data;
        this.setState({ isFetchingNotes: false, refreshing: false, notes });
      },
      error: errResponse => {
        this.setState({ isFetchingNotes: false, refreshing: false });
        Toast.show({
          text:
            errResponse.message ||
            errResponse.data.message[0].messages[0].message
        });
      }
    });
    this._cleanup = () => {
      fetchNotesSubscriber$.unsubscribe();
    };
  };

  _fetchUserDetails = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    this.setState({ user, isFetchingUserDetails: false });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this._fetchNotes();
  };
}
