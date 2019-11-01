import React, { Component } from "react";
import * as Note from "Note";
import { Card, CardItem, Text, Body } from "native-base";
import * as Animatable from "react-native-animatable";
import HeaderText from "./HeaderText";

type Props = {
  note: Note.RootObject;
};

type State = {};

export default class NotePreview extends Component<Props, State> {
  render() {
    return (
      <Animatable.View animation="fadeInUp" duration={350}>
        <Card>
          <CardItem header bordered>
            <HeaderText text={this.props.note.title} size="h4"></HeaderText>
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
      </Animatable.View>
    );
  }
}
