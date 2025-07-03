const secret = process.env.JWT_SECRET;

export const secret_token = secret;
export const expiresIn = process.env.JWT_EXPIRATION || '1d';