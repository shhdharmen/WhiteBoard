import React, { Component } from "react";
import { Card, CardItem, Text } from "native-base";
import * as Category from "Category";

type Props = {
  category: Category.RootObject;
};

type State = {};

export default class CategoryPreview extends Component<Props, State> {
  render() {
    return (
      <Card>
        <CardItem header bordered>
          <Text>{this.props.category.name}</Text>
        </CardItem>
        <CardItem footer bordered>
          {/* <Text>GeekyAnts</Text> */}
        </CardItem>
      </Card>
    );
  }
}
