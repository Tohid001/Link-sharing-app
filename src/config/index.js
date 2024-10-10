export const isTest = process.env.NODE_ENV === 'test';
export const isDev = process.env.NODE_ENV === 'development';
export const CDN_DOMAIN = process.env.NEXT_PUBLIC_CDN_ROOT;
// export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_URL = 'https://api.ektakarkhobor.com';
export const BEFORE_EXPIRE_TIME = 30 * 1000;

export const SERVER_STAGE = process.env.NEXT_PUBLIC_SERVER_STAGE;
export const serverStage = {
    isStaging: SERVER_STAGE === 'staging',
    isProduction: SERVER_STAGE === 'production',
    isDevelopment: SERVER_STAGE === 'development',
};
