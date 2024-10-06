import { FormType } from '@/app/(authentication)';
import { db, handleSQLiteError } from "@/services/sqliteConfig";
import { CarType, PartType } from '@/utils/types';

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
        const result = await db.getFirstAsync<{ username: string, isAuth: number }>("SELECT username, isAuth FROM users");
        return result;
    } catch (err) {
        handleSQLiteError(err);
    }
};

export const putIsAuth = async (username: string, isAuth: number) => {
    const statement = await db.prepareAsync(
        'UPDATE users SET isAuth=$isAuth WHERE username=$username'
    );
    try {
        await statement.executeAsync({ $username: username, $isAuth: isAuth });
    } finally {
        await statement.finalizeAsync();
    }
};

export const postPart = async (data: PartType) => {
    const statement = await db.prepareAsync(`
      INSERT INTO parts (imagePath, registrationNumber, name, partCount, createdAt, updatedAt, idPartCar) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    try {
        await statement.executeAsync(
            data.imagePath, data.registrationNumber, data.name, data.partCount, data.createdAt, data.updatedAt, data.idPartCar
        );
    } catch (err) {
        handleSQLiteError(err);
    } finally {
        await statement.finalizeAsync();
    }
};

export const postCar = async (data: CarType) => {
    const statement = await db.prepareAsync(`
        INSERT INTO cars (brandCar, modelCar) 
        VALUES (?, ?)    
    `);

    let idCar = 0;

    try {
        if (data.brandCar && data.modelCar) {
            const result = await statement.executeAsync(
                data.brandCar, data.modelCar
            );

            idCar = result.lastInsertRowId;
        }
    } catch (err) {
        handleSQLiteError(err);
    } finally {
        await statement.finalizeAsync();
        return idCar;
    }
};
