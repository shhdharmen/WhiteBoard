import React, { Component } from "react";
import { StyleSheet, AsyncStorage, ScrollView } from "react-native";
import { NavigationStackOptions } from "react-navigation-stack";
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Text,
  Toast
} from "native-base";

import Loader from "../../_shared/components/Loader";
import { NoteService } from "../../_shared/services/note.service";
import * as Note from "Note";
import { Grid, Col, Row } from "react-native-easy-grid";
import NotePreview from "../../_shared/components/NotePreview";

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  fetchingNotes: {
    flex: 1
  }
});

type Props = {
  navigation: any;
};

type State = {
  isFetchingNotes: boolean;
  notes: Note.RootObject[];
};

export default class HomeScreen extends Component<Props, State> {
  _cleanup = null;
  state = {
    isFetchingNotes: true,
    notes: []
  };
  async componentDidMount() {
    // await AsyncStorage.clear();
    // this.props.navigation.navigate("Auth");
    this._fetchNotes();
  }
  componentWillUnmount() {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
  static navigationOptions: NavigationStackOptions = {
    headerStyle: {
      // display: "none"
    }
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header style={{ height: 80 }}>
          <Body style={{ marginTop: 32 }}>
            <Title>White Board</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.content}>
          {this.state.isFetchingNotes ? (
            <Loader />
          ) : (
            <Content>
              <Grid style={{ padding: 16 }}>
                {this.state.notes.map((note, index) => (
                  <Row key={index}>
                    <Col>
                      <NotePreview key={index} note={note}></NotePreview>
                    </Col>
                  </Row>
                ))}
              </Grid>
            </Content>
          )}
        </Content>
      </Container>
    );
  }

  _fetchNotes = async () => {
    const fetchNotesObservable = await NoteService.get();
    const fetchNotesSubscriber$ = fetchNotesObservable.subscribe({
      next: response => {
        const notes = response.data;
        this.setState({ isFetchingNotes: false, notes });
      },
      error: errResponse => {
        this.setState({ isFetchingNotes: false });
        console.log(JSON.stringify(errResponse));
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
}
