import CustomizedButton from "@/components/CustomizedButton";
import { Colors } from "@/constants/DefaultColors";
import { log } from "@/utils/toolBox";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { useState } from "react";
import { Text, TextInput, TouchableWithoutFeedback, View, KeyboardAvoidingView, Platform, ToastAndroid, ActivityIndicator } from "react-native";
import tw from "twrnc";

export default function SignInScreen() {
    const [isPasswordNotVisible, setIsPasswordNotVisible] = useState(true);
    const [signInInfo, setSignInInfo] = useState<FormType>({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const onSignInPress = async () => {
        // Checks emptiness of the login form
        if (!(signInInfo.username && signInInfo.password)) {
            showToastWithGravityAndOffset("To sign in, please fill out the form");
        } else {
            log('User logged on');
        }
    };

    // Informative message (toast)
    const showToastWithGravityAndOffset = (msg: string) => {
        ToastAndroid.showWithGravityAndOffset(
            msg,
            2000,
            ToastAndroid.BOTTOM,
            0,
            50
        );
    };

    return (
        <View style={tw`bg-white flex-1`}>
            <ImageBackground
                source={require("@/assets/images/wave-image-base1.png")}
                contentFit="contain"
                contentPosition="top"
                style={tw`flex-1 w-full items-center justify-center`}
            >
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <View style={tw`p-8 gap-8`}>
                        {/* Title */}
                        <View>
                            <Text
                                style={[tw`text-3xl text-center`, {
                                    color: Colors.neutral._000
                                }]}
                            >
                                Sign in to gain access to the system
                            </Text>
                        </View>
                        {/* Inputs */}
                        <View style={tw`w-full gap-4`}>
                            <TextInput
                                value={signInInfo.username}
                                onChangeText={(text) => setSignInInfo({ ...signInInfo, username: text })}
                                placeholder="Username"
                                textContentType="none"
                                style={[tw`border border-gray-200 bg-gray-100 rounded-md p-2`]}
                            />
                            <TouchableWithoutFeedback>
                                <View style={tw`flex-row items-center justify-between border border-gray-200 bg-gray-100 rounded-md p-2`}>
                                    <TextInput
                                        value={signInInfo.password}
                                        onChangeText={(text) => setSignInInfo({ ...signInInfo, password: text })}
                                        placeholder="Password"
                                        textContentType="none"
                                        secureTextEntry={isPasswordNotVisible}
                                        style={tw`w-11/12`}
                                    />
                                    <Ionicons
                                        name={(!isPasswordNotVisible) ? 'eye' : 'eye-off'}
                                        onPress={() => setIsPasswordNotVisible(!isPasswordNotVisible)}
                                        size={18}
                                        style={tw`text-gray-400`}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {/* Sign in button */}
                        <View>
                            <CustomizedButton
                                containerStyle={tw`p-2 ${(isLoading) ? 'items-center' : ''}`}
                                backgroundColor={Colors.main.BASE_4}
                                borderRadius={99}
                                onPress={onSignInPress}
                            >
                                {(isLoading) ? (
                                    <ActivityIndicator size="small" color={Colors.neutral._999} />
                                ) : (
                                    <Text style={tw`text-white text-center font-semibold`}>
                                        Sign in
                                    </Text>
                                )}
                            </CustomizedButton>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View >
    );
}

interface FormType {
    username: string
    password: string
}
