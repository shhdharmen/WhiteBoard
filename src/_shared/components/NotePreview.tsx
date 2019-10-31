import React, { Component } from "react";
import * as Note from "Note";
import { Card, CardItem, Text, Body } from "native-base";

type Props = {
  note: Note.RootObject;
};

type State = {};

export default class NotePreview extends Component<Props, State> {
  render() {
    return (
      <Card>
        <CardItem header bordered>
          <Text>{this.props.note.title}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{this.props.note.content}</Text>
          </Body>
        </CardItem>
        <CardItem footer bordered>
          {/* <Text>GeekyAnts</Text> */}
        </CardItem>
      </Card>
    );
  }
}
