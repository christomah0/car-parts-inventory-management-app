import { FormType } from '@/app/(authentication)';
import { db, handleSQLiteError } from "@/services/sqliteConfig";

export const getUserDetails = async () => {
    try {
        const result = await db.getFirstAsync<FormType>("SELECT username, password FROM users");
        return result;
    } catch (err) {
        handleSQLiteError(err);
    }
};

export const getUsernameAndIsAuth = async () => {
    try {
        const result = await db.getFirstAsync<{ username: string, isAuth: boolean }>("SELECT username, isAuth FROM users");
        return result;
    } catch (err) {
        handleSQLiteError(err);
    }
};

export const putIsAuth = async (username: string, isAuth: boolean) => {
    const statement = await db.prepareAsync(
        'UPDATE users SET isAuth=$isAuth WHERE username=$username'
    );
    try {
        await statement.executeAsync({ $username: username, $isAuth: isAuth });
    } finally {
        await statement.finalizeAsync();
    }
};
