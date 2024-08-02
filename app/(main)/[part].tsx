import tw from "twrnc";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { Colors } from "@/constants/DefaultColors";
import CustomizedButton from "@/components/CustomizedButton";
import { useState } from "react";

export default function PartScreen() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <View style={tw`bg-white flex-1 justify-between`}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
            >
                <View style={tw`h-28 flex-1 justify-center items-center`}>
                    <Text>Hello world.</Text>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <View style={tw`p-8 w-full`}>
                        {/* inputs data */}
                        <TouchableWithoutFeedback>
                            <View style={tw`border border-gray-200 bg-gray-100 rounded-md p-2 my-2`}>
                                <Text style={tw`text-gray-500`}>
                                    Name
                                </Text>
                                <TextInput
                                    textContentType="none"
                                    style={{
                                        color: Colors.neutral._000
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={tw`border border-gray-200 bg-gray-100 rounded-md p-2 my-2`}>
                                <Text style={tw`text-gray-500`}>
                                    Registration number
                                </Text>
                                <TextInput
                                    textContentType="none"
                                    style={{
                                        color: Colors.neutral._000
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={tw`border border-gray-200 bg-gray-100 rounded-md p-2 my-2`}>
                                <Text style={tw`text-gray-500`}>
                                    Count
                                </Text>
                                <TextInput
                                    textContentType="none"
                                    style={{
                                        color: Colors.neutral._000
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={tw`border border-gray-200 bg-gray-100 rounded-md p-2 my-2`}>
                                <Text style={tw`text-gray-500`}>
                                    Car brand
                                </Text>
                                <TextInput
                                    textContentType="none"
                                    style={{
                                        color: Colors.neutral._000
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={tw`border border-gray-200 bg-gray-100 rounded-md p-2 mt-2`}>
                                <Text style={tw`text-gray-500`}>
                                    Car model
                                </Text>
                                <TextInput
                                    textContentType="none"
                                    style={{
                                        color: Colors.neutral._000
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={tw`mt-8`}>
                            <CustomizedButton
                                containerStyle={tw`p-2 ${(isLoading) ? 'items-center' : ''}`}
                                backgroundColor={Colors.main.BASE_4}
                                borderRadius={99}
                            // onPress={onSavePress}
                            >
                                {(isLoading) ? (
                                    <ActivityIndicator size="small" color={Colors.neutral._999} />
                                ) : (
                                    <Text style={tw`text-white text-center font-semibold`}>
                                        Save
                                    </Text>
                                )}
                            </CustomizedButton>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}
