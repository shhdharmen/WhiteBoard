import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableNativeFeedback
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
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
import * as Animatable from "react-native-animatable";

import Loader from "../../_shared/components/Loader";
import TextLoader from "../../_shared/components/TextLoader";
import { NoteService } from "../../_shared/services/note.service";
import * as Note from "Note";
import * as User from "UserModel";
import { Grid, Col, Row } from "react-native-easy-grid";
import NotePreview from "../../_shared/components/NotePreview";
import HeaderText from "../../_shared/components/HeaderText";
import TouchableFeedback from "../../_shared/components/TouchableFeedback";

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  addNoteButton: {
    borderWidth: 0,
    borderColor: "transparent",
    backgroundColor: "#f9f9f9"
  }
});

type Props = {
  navigation: NavigationStackProp<{}>;
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
      <Container>
        <Content contentContainerStyle={{ flex: 1, padding: 12 }}>
          <Animatable.View animation="fadeInLeft" duration={350}>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 16,
                alignItems: "center"
              }}
            >
              {this.state.isFetchingUserDetails ? (
                <TextLoader></TextLoader>
              ) : (
                <HeaderText
                  size="h2"
                  text={"Hi " + this.state.user.user.firstname}
                ></HeaderText>
              )}
              <TouchableFeedback
                background={TouchableNativeFeedback.SelectableBackground()}
                useForeground
                onPress={() => navigate("Settings")}
              >
                <View style={{ borderRadius: 16, marginLeft: "auto" }}>
                  <Icon
                    name="md-settings"
                    style={{
                      fontSize: 32
                    }}
                  ></Icon>
                </View>
              </TouchableFeedback>
            </View>
          </Animatable.View>
          {/* <Content contentContainerStyle={styles.content}> */}
          {this.state.isFetchingNotes || this.state.refreshing ? (
            <Loader />
          ) : this.state.notes.length ? (
            <Content>
              <Grid style={{ padding: 8 }}>
                {this.state.notes.map((note: Note.RootObject, index) => (
                  <Row key={index}>
                    <Col>
                      {/* TODO: @Dharmen - Try to use react-native-shared-element (https://github.com/IjzerenHein/react-native-shared-element) */}
                      <NotePreview
                        key={index}
                        note={note}
                        onPress={() => navigate("Note", { id: note.id })}
                        onLongPress={() => console.log("note long pressed")}
                      ></NotePreview>
                    </Col>
                  </Row>
                ))}
              </Grid>
            </Content>
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
        {this.state.notes.length ? (
          <Button
            bordered
            style={styles.addNoteButton}
            onPress={() => navigate("Note")}
          >
            <Text>Add Note</Text>
          </Button>
        ) : (
          <></>
        )}
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
