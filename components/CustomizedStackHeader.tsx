import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleProp, ViewStyle, OpaqueColorValue, ColorValue } from "react-native";
import React from "react";
import tw from "twrnc";

export default function CustomizedStackHeader(props: CustomizedStackHeaderComponentProps) {
  return (
    <View style={props.containerStyle}>
      {/* Left side sub-container */}
      <View style={props.leftSideContainerStyle ?? tw`flex-row items-center justify-center gap-7`}>
        <TouchableOpacity onPress={props.onIconPress}>
          <Ionicons
            name={props.iconName}
            color={props.iconColor ?? '#fff'}
            size={props.iconSize ?? 28}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'normal',
            color: props.titleColor ?? '#fff'
          }}
        >
          {props.title}
        </Text>
      </View>
      {/* Right side sub-container */}
      <View style={props.rightSideContainerStyle}>
        {props.rightSideChildren}
      </View>
    </View>
  );
}

type CustomizedStackHeaderComponentProps = {
  containerStyle?: StyleProp<ViewStyle>;
  leftSideContainerStyle?: StyleProp<ViewStyle>;
  rightSideContainerStyle?: StyleProp<ViewStyle>;
  title?: string;
  titleColor?: ColorValue;
  iconName?: any;
  onIconPress?: () => void;
  iconSize?: number;
  iconColor?: string | OpaqueColorValue;
  rightSideChildren?: React.JSX.Element;
};
