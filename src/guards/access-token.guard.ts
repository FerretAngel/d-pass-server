import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = process.env.APP_PUBLIC_API_KEY || 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const IS_ADMIN_KEY = process.env.ADMIN_KEY || 'isAdmin';
export const Admin = () => SetMetadata(IS_ADMIN_KEY, true);