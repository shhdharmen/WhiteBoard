import React from "react";
import { TouchableNativeFeedback } from "react-native";

type Props = {
    children: any,
    onLongPress?: () => void,
    onPress?: () => void,
    background?: any
    useForeground?: boolean
}

type State = {}

export default class TouchableFeedbackAndroid extends React.Component<Props, State>{
    render() {
        const { children, onLongPress, onPress, background, useForeground } = this.props;
        return (<TouchableNativeFeedback onLongPress={onLongPress} onPress={onPress} background={background} useForeground={useForeground}>
            {children}
        </TouchableNativeFeedback>)
    }
}