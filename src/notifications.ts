import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Muestra las notificaciones como alert sin sonido/badge por defecto
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function registerForPushNotificationsAsync(): Promise<string | null> {
    try {
        if (Platform.OS === "android") {
            // Canal por defecto en Android
            await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.DEFAULT,
            });
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            return null; // usuario no permitió
        }

        // Obtenemos el token de Expo
        const tokenResponse = await Notifications.getExpoPushTokenAsync();
        return tokenResponse.data || null;
    } catch {
        return null;
    }
}
