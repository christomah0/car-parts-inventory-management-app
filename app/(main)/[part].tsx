import tw from "twrnc";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Colors } from "@/constants/DefaultColors";
import CustomizedButton from "@/components/CustomizedButton";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { log } from "@/utils/toolBox";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as FileSystem from 'expo-file-system';
import { fullPartType } from "@/utils/types";
import { postCar, postPart } from "@/services/sqliteOperations";
import CustomizedModal from "@/components/CustomizedModal";
import moment from "moment";

export default function PartScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<string>();
    const insets = useSafeAreaInsets();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [partData, setPartData] = useState<fullPartType>({
        imagePath: '',
        registrationNumber: '',
        name: '',
        partCount: 0,
        createdAt: '',
        updatedAt: '',
        idPartCar: 0,
        brandCar: '',
        modelCar: ''
    });

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

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            downloadImage(result.assets[0].uri, moment().format('YYYY-MM-DD HH-mm-ss'))
        }
    };

    const downloadImage = async (imageUri: string, date: string) => {
        try {
            const fileUri = FileSystem.documentDirectory + '/images/P' + date + '.jpg'; // Définir le chemin où enregistrer l'image
            const { uri } = await FileSystem.downloadAsync(imageUri, fileUri);
            setPartData({ ...partData, imagePath: uri });
            console.log('Image enregistrée à :', uri);
        } catch (error) {
            console.error('Erreur lors du téléchargement de l\'image:', error);
        }
    };

    const onSavePress = async () => {
        if (!(
            partData.imagePath &&
            partData.registrationNumber &&
            partData.name &&
            partData.partCount &&
            partData.brandCar &&
            partData.modelCar

        )) {
            log('uri=',partData.imagePath)
            showToastWithGravityAndOffset("To save data, please fill out the form");
        } else {
            setIsLoading(true);

            const idCar = await postCar({ brandCar: partData.brandCar, modelCar: partData.modelCar });

            setPartData({...partData, createdAt: moment().format('YYYY-MM-DD HH-mm-ss')});
            setPartData({...partData, updatedAt: moment().format('YYYY-MM-DD HH-mm-ss')});
            setPartData({ ...partData, idPartCar: idCar }); // Saving id car

            await postPart(partData);

            // Deactivate loading state
            setIsLoading(false);

            setIsModalVisible(!isModalVisible);
        }
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
                                    value={partData.registrationNumber}
                                    onChangeText={(text) => setPartData({ ...partData, registrationNumber: text })}
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
                                    value={partData.name}
                                    onChangeText={(text) => setPartData({ ...partData, name: text })}
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
                                    value={String(partData.partCount)}
                                    onChangeText={(text) => setPartData({ ...partData, partCount: Number(text) })}
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
                                    value={partData.brandCar}
                                    onChangeText={(text) => setPartData({ ...partData, brandCar: text })}
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
                                    value={partData.modelCar}
                                    onChangeText={(text) => setPartData({ ...partData, modelCar: text })}
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
                                onPress={onSavePress}
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
            {/* Modal */}
            <CustomizedModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(!isModalVisible)}
            >
                <View style={tw`flex-1 px-4`}>
                    <View style={tw`flex-1 justify-center`}>
                        <Text style={tw`text-green-500`}>
                            The car part has been successfully recorded.
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
        </View>
    );
}
