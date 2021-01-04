import 'dotenv/config';

export const jwtConstants = {
    secret: process.env.JWT_SECRET_CODE,
    refresh: process.env.JWT_REFRESH_CODE,
}
