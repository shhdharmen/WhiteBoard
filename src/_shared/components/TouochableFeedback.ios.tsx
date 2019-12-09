import React from "react";
import { TouchableHighlight } from "react-native";

type Props = {
    children: any,
    onLongPress?: () => void,
    onPress?: () => void,
    background?: any
    useForeground?: boolean
}

type State = {}

export default class TouchableFeedbackIOS extends React.Component<Props, State>{
    render() {
        const { children, onLongPress, onPress, background, useForeground } = this.props;
        return (<TouchableHighlight onLongPress={onLongPress} onPress={onPress} underlayColor="#eee" >
            {children}
        </TouchableHighlight>)
    }
}