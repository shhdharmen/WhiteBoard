import React, { Component } from "react";
import * as Note from "Note";
import { Card, CardItem, Text, Body } from "native-base";
import * as Animatable from "react-native-animatable";
import HeaderText from "./HeaderText";
import { TouchableNativeFeedback, View } from "react-native";

type Props = {
  note: Note.RootObject;
  onPress?(): void;
  onLongPress?(): void;
  style?: any;
};

type State = {};

export default class NotePreview extends Component<Props, State> {
  componentDidMount() {}
  render() {
    return (
      <Animatable.View
        animation="fadeInUp"
        duration={350}
        style={this.props.style}
      >
        <TouchableNativeFeedback
          onLongPress={this.props.onLongPress}
          onPress={this.props.onPress}
          background={TouchableNativeFeedback.SelectableBackground()}
          useForeground
        >
          <View>
            <Card>
              <CardItem
                header
                bordered
                style={{
                  backgroundColor: this.props.note.color,
                  borderRadius: 0
                }}
              >
                <HeaderText text={this.props.note.title} size="h5"></HeaderText>
              </CardItem>
              {this.props.note.content ? (
                <CardItem
                  style={{
                    backgroundColor: this.props.note.color,
                    borderRadius: 0
                  }}
                >
                  <Body>
                    <Text lineBreakMode="tail" numberOfLines={7}>
                      {this.props.note.content}
                    </Text>
                  </Body>
                </CardItem>
              ) : (
                <></>
              )}
            </Card>
          </View>
        </TouchableNativeFeedback>
      </Animatable.View>
    );
  }
}
