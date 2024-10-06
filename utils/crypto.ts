import * as Crypto from "expo-crypto";

export const digestData = async (data: string) => {
    const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, data);
    return digest;
};
