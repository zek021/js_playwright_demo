import dotenv from 'dotenv';

// Load the environment variables from the .env file
dotenv.config();

/**
 * Function to get environment variables from the .env file
 * @param {string} key - The key of the environment variable to retrieve.
 * @returns {string} The value of the environment variable.
 */
export function getEnvVariable(key, dictionary = false) {
    let value = process.env[key];

    if (!value) {
        console.warn(`Warning: The environment variable ${key} is not defined.`);
    }

    if (dictionary) {
        value = JSON.parse(value);
    }

    return value;
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}