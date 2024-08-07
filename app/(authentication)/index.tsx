import CustomizedButton from "@/components/CustomizedButton";
import CustomizedModal from "@/components/CustomizedModal";
import { Colors } from "@/constants/DefaultColors";
import { TRUE } from "@/constants/Values";
import { getUserDetails, putIsAuth } from "@/services/sqliteOperations";
import { digestData } from "@/utils/crypto";
import { updateUserDetails } from "@/utils/legendappState";
import { log } from "@/utils/toolBox";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableWithoutFeedback, View, KeyboardAvoidingView, Platform, ToastAndroid, ActivityIndicator, Pressable } from "react-native";
import tw from "twrnc";

export default function SignInScreen() {
    const [isPasswordNotVisible, setIsPasswordNotVisible] = useState(true);
    const [signInInfo, setSignInInfo] = useState<FormType>({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onSignInPress = async () => {
        // Checks emptiness of the login form
        if (!(signInInfo.username && signInInfo.password)) {
            showToastWithGravityAndOffset("To sign in, please fill out the form");
        } else {
            setIsLoading(true);

            // Hash password from user input
            const hashedPassword = await digestData(signInInfo.password);

            const result = await getUserDetails();

            // Evaluates data matching
            if (signInInfo.username == result?.username && hashedPassword == result.password) {
                updateUserDetails({
                    username: result.username,
                    isAuth: TRUE
                });

                // Update auth state
                await putIsAuth(result.username, TRUE);

                // Deactivate loading state
                setIsLoading(false);

                // Redirects to the main screen
                router.navigate("/(main)[part]");
            } else {
                // Deactivate loading state
                setIsLoading(false);

                setIsModalVisible(!isModalVisible);
            }
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
                    <View style={tw`px-8 pb-2 pt-8 gap-8`}>
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
                                inputMode="text"
                                value={signInInfo.username}
                                onChangeText={(text) => setSignInInfo({ ...signInInfo, username: text })}
                                placeholder="Username"
                                textContentType="none"
                                selectionColor={Colors.neutral._000}
                                style={[tw`border border-gray-200 bg-gray-100 rounded-md p-2`]}
                            />
                            <TouchableWithoutFeedback>
                                <View style={tw`flex-row items-center justify-between border border-gray-200 bg-gray-100 rounded-md p-2`}>
                                    <TextInput
                                        inputMode="text"
                                        value={signInInfo.password}
                                        onChangeText={(text) => setSignInInfo({ ...signInInfo, password: text })}
                                        placeholder="Password"
                                        textContentType="none"
                                        selectionColor={Colors.neutral._000}
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
                                containerStyle={tw`p-3 ${(isLoading) ? 'items-center' : ''}`}
                                backgroundColor={Colors.main.BASE_4}
                                borderRadius={99}
                                onPress={onSignInPress}
                            >
                                {(isLoading) ? (
                                    <ActivityIndicator size="small" color={Colors.neutral._999} />
                                ) : (
                                    <Text style={tw`text-white text-center`}>
                                        Sign in
                                    </Text>
                                )}
                            </CustomizedButton>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
            {/* Modal */}
            <CustomizedModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(!isModalVisible)}
            >
                <View style={tw`flex-1 px-4`}>
                    <View style={tw`flex-1 justify-center`}>
                        <Text style={{ color: Colors.main.BASE_1 }}>
                            Invalid username or password. Please try again.
                        </Text>
                    </View>
                    <View style={tw`items-end`}>
                        <CustomizedButton
                            containerStyle={tw`p-3`}
                            onPress={() => setIsModalVisible(!isModalVisible)}
                        >
                            <Text style={{ color: Colors.neutral._000 }}>
                                OK
                            </Text>
                        </CustomizedButton>
                    </View>
                </View>
            </CustomizedModal>
        </View >
    );
}

export type FormType = {
    username: string;
    password: string;
};
