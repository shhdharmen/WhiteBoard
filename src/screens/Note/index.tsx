import React, { Component } from "react";
import {
  Container,
  Icon,
  Content,
  Form,
  Toast,
  Button,
  Input
} from "native-base";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  EmitterSubscription,
  Alert
} from "react-native";
import ColorPalette from "react-native-color-palette";
import * as Animatable from "react-native-animatable";

import HeaderText from "../../_shared/components/HeaderText";
import * as Note from "Note";
import { NoteService } from "../../_shared/services/note.service";
import { NavigationStackProp } from "react-navigation-stack";
import Loader from "../../_shared/components/Loader";

type Props = {
  navigation: NavigationStackProp<{ id: string }>;
};

type State = {
  note: Note.RootObject;
  isSavingNote: boolean;
  isLoading: boolean;
  noteId: string;
  inputHeightAdjustment: number;
  keyBoardHeight: number;
  showColors: boolean;
};

const styles = StyleSheet.create({
  confNoteButton: {
    borderWidth: 1,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "rgba(0, 0, 0, 0.075)",
    backgroundColor: "rgba(0, 0, 0, 0.025)",
    // padding: 16,
    fontFamily: "Poppins_Medium",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  colorPaletteContainer: {
    borderWidth: 1,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "rgba(0, 0, 0, 0.075)",
    backgroundColor: "rgba(0, 0, 0, 0.025)"
  }
});

export default class NoteScreen extends Component<Props, State> {
  _cleanup: null | Function = null;
  headerHeight = 80;
  titleHeight = 50;
  confButtonHeight = 52;
  extraHeight = 87;
  extraKeyboardHeight = 10;
  state = {
    note: {
      title: "",
      color: "#FFF",
      content: "",
      archive: false
    },
    isSavingNote: false,
    isLoading: true,
    noteId: "",
    inputHeightAdjustment:
      this.headerHeight +
      this.titleHeight +
      this.confButtonHeight +
      this.extraHeight,
    keyBoardHeight: 0,
    showColors: false
  };
  keyboardDidShowListener!: EmitterSubscription;
  keyboardDidHideListener!: EmitterSubscription;
  componentDidMount() {
    this._handleNote();
    this._handleKeyboard();
  }
  private _handleKeyboard() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  _keyboardDidShow = (e: any) => {
    const keyBoardHeight = e.endCoordinates.height + this.extraKeyboardHeight;
    this.setState({ keyBoardHeight });
  };

  _keyboardDidHide = () => {
    this.setState({ keyBoardHeight: 0 });
  };

  private _handleNote() {
    const noteId = this.props.navigation.getParam("id");
    this.setState({ noteId }, () => {
      if (this.state.noteId) {
        this._fetchNote();
      } else {
        this.setState({ isLoading: false });
      }
    });
  }

  componentWillUnmount() {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  render() {
    const { navigate, goBack } = this.props.navigation;
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <Container style={{ backgroundColor: this.state.note.color }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <Content style={{ flex: 1, padding: 12 }}>
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
                        goBack();
                      }
                    }
                  }}
                ></Icon>
                <HeaderText
                  size="h2"
                  text={" " + (this.state.noteId ? "Edit" : "Add") + " Note"}
                ></HeaderText>
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
              <Input
                style={{
                  paddingLeft: 20,
                  fontFamily: "AnonymousPro",
                  maxHeight:
                    Dimensions.get("screen").height -
                    this.state.inputHeightAdjustment -
                    this.state.keyBoardHeight
                }}
                placeholder="Note"
                value={this.state.note.content}
                onChangeText={(text: string) => {
                  const note = Object.assign(this.state.note, {
                    content: text
                  });
                  this.setState({ note });
                }}
                disabled={this.state.isSavingNote}
                multiline
              />
            </Form>
          </Content>
          <View>
            <Animatable.View
              animation={this.state.showColors ? "slideInUp" : "slideOutDown"}
              style={styles.colorPaletteContainer}
              duration={350}
            >
              <ColorPalette
                onChange={(color: string) => {
                  const note = Object.assign(this.state.note, { color });
                  this.setState({ note });
                }}
                value={this.state.note.color}
                colors={[
                  "#FFCDD2",
                  "#E1BEE7",
                  "#BBDEFB",
                  "#C8E6C9",
                  "#CFD8DC",
                  "#FFF"
                ]}
                title={""}
                titleStyles={{ display: "none" }}
                icon={<Icon type="MaterialIcons" name="check-circle" />}
              />
            </Animatable.View>
          </View>
          <View style={styles.confNoteButton}>
            <Button
              icon
              transparent
              rounded
              onPress={() => {
                this._toggleColors();
              }}
              disabled={this.state.isSavingNote}
            >
              <Icon
                type="MaterialIcons"
                name="color-lens"
                style={{
                  fontSize: 28
                }}
              ></Icon>
            </Button>
            <View style={{ flexDirection: "row" }}>
              <Button
                icon
                transparent
                rounded
                onPress={async () => {
                  if (this.state.noteId) {
                    await this._toggleArchive();
                  }
                }}
                disabled={this.state.isSavingNote || !this.state.noteId}
              >
                <Icon
                  type="MaterialIcons"
                  name={this.state.note.archive ? "unarchive" : "archive"}
                  style={{
                    fontSize: 28
                  }}
                ></Icon>
              </Button>
              <Button
                icon
                transparent
                rounded
                onPress={async () => {
                  if (this.state.noteId) {
                    await this._confirmDeleteNote();
                  } else {
                    goBack();
                  }
                }}
                disabled={this.state.isSavingNote}
              >
                <Icon
                  type="MaterialIcons"
                  name="delete"
                  style={{
                    fontSize: 28
                  }}
                ></Icon>
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Container>
    );
  }

  _saveNote = async () => {
    this.setState({ isSavingNote: true });
    if (this.state.noteId) {
      await this._updateNote();
    } else {
      await this._createNote();
    }
  };

  _fetchNote = async () => {
    const createNotesObservable = await NoteService.getById(this.state.noteId);
    const createNotesSubscriber$ = createNotesObservable.subscribe({
      next: response => {
        this.setState({ note: response.data, isLoading: false });
      },
      error: errResponse => {
        this.setState({ isLoading: false });
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

  _createNote = async () => {
    const createNotesObservable = await NoteService.create(this.state.note);
    const createNotesSubscriber$ = createNotesObservable.subscribe({
      next: response => {
        this.setState({ isSavingNote: false });
        this.props.navigation.goBack();
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

  _updateNote = async (archived?: boolean, stayHere?: boolean) => {
    const createNotesObservable = await NoteService.update(this.state.note);
    const createNotesSubscriber$ = createNotesObservable.subscribe({
      next: response => {
        this.setState({ isSavingNote: false });
        if (!stayHere) {
          this.props.navigation.goBack();
        }
        if (typeof archived === "boolean") {
          Toast.show({
            text: "Note has been " + (archived ? "" : "un-") + "archived",
            duration: 3000,
            buttonText: "Undo",
            onClose: async reason => {
              if (reason === "user") {
                this._toggleArchive();
              }
            }
          });
        }
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

  _confirmDeleteNote = async () => {
    Alert.alert(
      "Please Confirm",
      "Do you really want to delete this note?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Yes", onPress: async () => await this._deleteNote() }
      ],
      { cancelable: false }
    );
  };

  _deleteNote = async () => {
    const createNotesObservable = await NoteService.delete(this.state.noteId);
    const createNotesSubscriber$ = createNotesObservable.subscribe({
      next: response => {
        this.setState({ isSavingNote: false });
        this.props.navigation.goBack();
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

  _toggleColors = () => {
    if (!this.state.showColors) {
      this.setState({ showColors: true });
    } else {
      this.setState({ showColors: false });
    }
  };

  _toggleArchive = () => {
    this.setState({ isSavingNote: true });
    const stayHere = true;
    const archived = !this.state.note.archive;
    const note = Object.assign(this.state.note, { archive: archived });
    this.setState({ note }, () => {
      this._updateNote(archived, stayHere);
    });
  };
}
