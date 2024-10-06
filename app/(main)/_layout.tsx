import { Colors, Sizes } from "@/constants/DefaultColors";
import { Stack, router } from "expo-router";
import tw from "twrnc";
import CustomizedStackHeader from "@/components/CustomizedStackHeader";
import { SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MainLayout() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[tw`flex-1`, { marginTop: -(insets.top) }]}>
      <Stack>
        <Stack.Screen name="[part]" options={{
          header: () => (
            <CustomizedStackHeader
              title="Part"
              titleColor={Colors.neutral._999}
              iconName="arrow-back"
              iconSize={24}
              iconColor={Colors.neutral._999}
              onIconPress={() => router.back()}
              containerStyle={[tw`w-full flex-row items-center justify-between pt-8 shadow`, {
                backgroundColor: Colors.main.BASE_1,
                height: Sizes.HEIGHT * 0.15,
                paddingHorizontal: 15
              }]}
            />
          )
        }} />
      </Stack>
    </SafeAreaView>
  );
}
