import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";

export default function AuthenticationLayout() {
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={[tw`flex-1`, { marginTop: -(insets.top) }]}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaView>
    );
}