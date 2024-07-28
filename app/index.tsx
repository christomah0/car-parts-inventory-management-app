import { useFonts } from "expo-font";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { user$ } from "@/utils/legendappState";
import { useSelector } from "@legendapp/state/react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Index() {
    const { isAuth } = useSelector(() => user$.details);

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    const route = (!isAuth) ? (
        '/(authentication)'
    ) : (
        '/(main)'
    );

    return (
        <Redirect href={route} />
    );
}