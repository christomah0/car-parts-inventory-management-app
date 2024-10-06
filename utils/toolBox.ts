/**
 * Logs a message to the console with an optional prefix.
 * 
 * @param msg The message to log (optional).
 * @param optionalParams Additional arguments to be printed (optional).
 */
export const log = (msg?: any, ...optionalParams: any[]) => {
    console.log(`[$] ${msg}`, ...optionalParams);
};
