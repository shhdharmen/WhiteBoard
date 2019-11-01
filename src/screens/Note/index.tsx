import React, { Component } from "react";
import {
  Container,
  Icon,
  Grid,
  Row,
  Content,
  List,
  ListItem,
  Text,
  Form,
  Textarea,
  Toast
} from "native-base";
import { View, AsyncStorage } from "react-native";

import HeaderText from "../../_shared/components/HeaderText";
import * as Note from "Note";
import { NoteService } from "../../_shared/services/note.service";

type Props = {
  navigation: any;
};

type State = {
  note: Note.RootObject;
  isSavingNote: boolean;
};

export default class NoteScreen extends Component<Props, State> {
  _cleanup = null;
  state = {
    note: {
      title: "",
      color: "#fff",
      content: ""
    },
    isSavingNote: false
  };
  componentWillUnmount() {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container
        style={{ padding: 12, backgroundColor: this.state.note.color }}
      >
        <Form>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 8,
              alignItems: "center"
            }}
          >
            <Icon
              type="FontAwesome5"
              name="long-arrow-alt-left"
              style={{
                fontSize: 32
              }}
              onPress={() => {
                if (!this.state.isSavingNote) {
                  if (this.state.note.title) {
                    this._saveNote();
                  } else {
                    navigate("Home");
                  }
                }
              }}
            ></Icon>
            <HeaderText size="h2" text=" Add Note"></HeaderText>
          </View>
          <HeaderText
            placeholder="Title"
            input
            onChangeText={(text: string) => {
              const note = Object.assign(this.state.note, { title: text });
              this.setState({ note });
            }}
            value={this.state.note.title}
            autoFocus
            style={{ marginBottom: 12 }}
            disabled={this.state.isSavingNote}
          ></HeaderText>
          <Textarea
            style={{ paddingLeft: 20 }}
            bordered={false}
            underline={false}
            rowSpan={5}
            placeholder="Note"
            value={this.state.note.content}
            onChangeText={(text: string) => {
              const note = Object.assign(this.state.note, { content: text });
              this.setState({ note });
            }}
            disabled={this.state.isSavingNote}
          />
        </Form>
      </Container>
    );
  }

  _saveNote = async () => {
    this.setState({ isSavingNote: true });
    const createNotesObservable = await NoteService.create(this.state.note);
    const createNotesSubscriber$ = createNotesObservable.subscribe({
      next: response => {
        this.setState({ isSavingNote: false });
        this.props.navigation.navigate("Home");
      },
      error: errResponse => {
        this.setState({ isSavingNote: false });
        Toast.show({
          text:
            errResponse.message ||
            errResponse.data.message[0].messages[0].message
        });
      }
    });
    this._cleanup = () => {
      createNotesSubscriber$.unsubscribe();
    };
  };
}
