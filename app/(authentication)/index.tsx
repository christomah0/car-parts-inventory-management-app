import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import tw from "twrnc";

export default function SignInScreen() {
    const [isPasswordNotVisible, setIsPasswordNotVisible] = useState(true);
    const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });

    return (
        <View style={tw`bg-white flex-1`}>
            <View style={tw`flex-1 justify-center items-center p-8`}>
                <View style={tw`w-full gap-3`}>
                    <TextInput
                        value={loginInfo.username}
                        onChangeText={(text) => setLoginInfo({...loginInfo, username: text})}
                        placeholder="Username"
                        textContentType="none"
                        style={[tw`border border-gray-200 bg-gray-100 rounded-md p-2`]}
                    />
                    <TouchableWithoutFeedback>
                        <View style={tw`flex-row items-center justify-between border border-gray-200 bg-gray-100 rounded-md p-2`}>
                            <TextInput
                                value={loginInfo.password}
                                onChangeText={(text) => setLoginInfo({...loginInfo, password: text})}
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
            </View>
        </View>
    );
}