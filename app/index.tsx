import { useFonts } from "expo-font";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { dropSQLiteTable, initSQLiteDB } from "@/services/sqliteConfig";
import { log } from "@/utils/toolBox";
import { getUsernameAndIsAuth, putIsAuth } from "@/services/sqliteOperations";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Index() {
    const [isAuth, setIsAuth] = useState<boolean>();

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        async function setup() {
            initSQLiteDB();

            const result = await getUsernameAndIsAuth();
            setIsAuth(result?.isAuth); 

            if (result)
                await putIsAuth(result.username, result.isAuth);
        }

        if (loaded) {
            // dropSQLiteTable();
            
            setup()
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    const route = (isAuth) ? (
        "/(main)/[part]"
    ) : (
        "/(authentication)"
    );

    return (
        <Redirect href={route} />
    );
}
