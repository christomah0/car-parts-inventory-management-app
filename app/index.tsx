import { useFonts } from "expo-font";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { dropSQLiteTable, initSQLiteDB } from "@/services/sqliteConfig";
import { log } from "@/utils/toolBox";
import { getUsernameAndIsAuth } from "@/services/sqliteOperations";
import { FALSE, TRUE } from "@/constants/Values";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Index() {
    const [isAuth, setIsAuth] = useState<number>(0);
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        async function setup() {
            initSQLiteDB();
            const result = await getUsernameAndIsAuth();

            if (result)
                // FIX ME
                setIsAuth(result.isAuth);
            
        }

        if (loaded) {
            // dropSQLiteTable();
            
            setup();
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    // FIX ME
    const route = (isAuth == FALSE) ? "/(main)/[part]" : "/(authentication)";

    return (
        <Redirect href={route} />
    );
}
