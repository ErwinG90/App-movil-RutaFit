import axios from "axios";
const API_BASE = "https://ms-rutafit-neg.vercel.app/ms-rutafit-neg";

export type UpdateUserPayload = {
    nombre?: string;
    apellido?: string;
    fechaNacimiento?: string; // "YYYY-MM-DD"
    genero?: "hombre" | "mujer";
    deporteFavorito?: string | null;
    nivelExperiencia?: string | null;
};

export type NotificationPrefs = {
    enabled?: boolean;
    onEventJoin?: boolean;
    onEventCancelled?: boolean;
};

export async function updateUserProfile(uid: string, payload: UpdateUserPayload) {
    const url = `${API_BASE}/users/${encodeURIComponent(uid)}`;
    const { data } = await axios.put(url, payload);
    return data;
}

export async function updateUserAvatar(uid: string, avatarKey: string) {
    const url = `${API_BASE}/users/${encodeURIComponent(uid)}`;
    const { data } = await axios.put(url, { avatar: avatarKey });
    return data;
}

export async function getUserById(uid: string) {
    const url = `${API_BASE}/users/${encodeURIComponent(uid)}`;
    const { data } = await axios.get(url);
    return data;
}

/** guardar Expo Push Token */
export async function updateUserPushToken(uid: string, expoPushToken: string) {
    const url = `${API_BASE}/users/${encodeURIComponent(uid)}`;
    const { data } = await axios.put(url, { expoPushToken });
    return data;
}

/** guardar preferencias de notificaciones */
export async function updateNotificationPrefs(uid: string, prefs: NotificationPrefs) {
    const url = `${API_BASE}/users/${encodeURIComponent(uid)}`;
    const { data } = await axios.put(url, { notifications: prefs });
    return data;
}
