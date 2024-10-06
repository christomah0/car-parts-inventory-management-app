import { Dimensions } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const Colors = {
    main: {
        BASE_1: '#FF204E',
        BASE_2: '#A0153E',
        BASE_3: '#5D0E41',
        BASE_4: '#00224D',
    },
    neutral: {
        _999: '#FFFFFF',
        _000: '#252525'
    }
};

export const Sizes = {
    WIDTH: width,
    HEIGHT: height
};
