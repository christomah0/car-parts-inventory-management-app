import React from "react";
import { TouchableOpacity, AnimatableNumericValue, StyleProp, DimensionValue } from "react-native";
import { Colors } from "@/constants/DefaultColors";
import { Image, ImageStyle } from 'expo-image';

/**
 * CustomizedButton component that provides a styled button for the application.
 *
 * This component allows customization of various properties like background color,
 * border, color, and border radius. It also supports optional icons and opacity
 * animation for a more dynamic look and feel.
 *
 * @props ButtonProps - Properties to customize the button appearance and behavior.
 * @returns A React component representing the CustomButton.
 */
export default function CustomizedButton(props: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={props.disable} // Prop for disabling button interaction
      onPress={props.onPress} // Function to be called on button press
      style={[props.containerStyle, { // Combined styles with props
        backgroundColor: props.backgroundColor, // Background color
        borderWidth: (props.border) ? 1 : 0, // Border width based on prop
        borderColor: (props.border) ? Colors.main.BASE_1 : "transparent", // Border color
        borderRadius: (props.borderRadius) ? props.borderRadius : 0, // Border radius
        opacity: props.opacity, // Opacity for animation
        paddingVertical: (props.paddingVertical) ? props.paddingVertical : 10, // Vertical padding
      }]}
    >
      {props.children}
      {(props.icon) ? ( // Render icon if provided
        <Image source={props.icon} style={props.iconStyle} />
      ) : null}
    </TouchableOpacity>
  );
}

/**
 * Interface defining the properties of the CustomButton component.
 */
interface ButtonProps {
  backgroundColor?: string; // Background color of the button
  border?: number; // Optional border width
  borderRadius?: number; // Optional border radius
  children: string | React.JSX.Element; // Button content (text or JSX)
  icon?: any; // Optional icon to display within the button
  containerStyle?: {}; // Additional styles for the button container
  iconStyle?:  StyleProp<ImageStyle>; // Additional styles for the icon
  opacity?: AnimatableNumericValue | undefined; // Optional opacity for animation
  disable?: boolean | undefined; // Prop to disable button interaction
  onPress?: () => void; // Function to be called on button press
  paddingVertical?: DimensionValue;
}