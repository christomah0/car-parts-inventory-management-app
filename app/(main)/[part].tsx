import tw from "twrnc";
import { ActivityIndicator, Button, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Colors } from "@/constants/DefaultColors";
import CustomizedButton from "@/components/CustomizedButton";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { log } from "@/utils/toolBox";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PartScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<string>();
    const insets = useSafeAreaInsets();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled)
            setImage(result.assets[0].uri);
    };

    return (
        <View style={tw`bg-white flex-1 justify-between`}>
            <ScrollView showsHorizontalScrollIndicator={false}>
                {/* Image of car's part */}
                <TouchableOpacity onPress={pickImage}>
                    <View style={[tw`flex-1 justify-center items-center mx-8`, { marginTop: insets.top }]}>
                        <Image
                            source={{ uri: image }}
                            style={[tw`rounded-lg w-full`, { height: 200 }]}
                            placeholder={require('@/assets/images/placeholder.png')}
                            contentFit="cover"
                            transition={700}
                        />
                        <Ionicons
                            name="camera-outline"
                            size={24}
                            style={[tw`absolute`, {
                                color: Colors.neutral._000,
                                opacity: 0.7
                            }]}
                        />
                    </View>
                </TouchableOpacity>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <View style={tw`w-full px-8 pb-2 pt-8`}>
                        {/* Inputs data */}
                        <TouchableWithoutFeedback>
                            <View style={tw`border border-gray-200 bg-gray-100 rounded-md p-2 my-2`}>
                                <Text style={tw`text-gray-500`}>
                                    Registration Number
                                </Text>
                                <TextInput
                                    inputMode="text"
                                    selectionColor={Colors.neutral._000}
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
                                    Name
                                </Text>
                                <TextInput
                                    inputMode="text"
                                    selectionColor={Colors.neutral._000}
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
                                    inputMode="numeric"
                                    selectionColor={Colors.neutral._000}
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
                                    Car Brand
                                </Text>
                                <TextInput
                                    inputMode="text"
                                    selectionColor={Colors.neutral._000}
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
                                    Car Model
                                </Text>
                                <TextInput
                                    inputMode="text"
                                    selectionColor={Colors.neutral._000}
                                    textContentType="none"
                                    style={{
                                        color: Colors.neutral._000
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={tw`mt-8`}>
                            <CustomizedButton
                                containerStyle={tw`p-3 ${(isLoading) ? 'items-center' : ''}`}
                                backgroundColor={Colors.main.BASE_4}
                                borderRadius={99}
                            // onPress={onSavePress}
                            >
                                {(isLoading) ? (
                                    <ActivityIndicator size="small" color={Colors.neutral._999} />
                                ) : (
                                    <Text style={tw`text-white text-center`}>
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
