import { INestApplication } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

export const login = async (app: INestApplication): Promise<string> => {
  const authService = app.get(AuthService);
  const token = await authService.login({
    email: 'hoofd.leiding@test.be',
    password: '12345678',
  });

  if (!token) {
    throw new Error('No token received');
  }

  return token;
};

export const loginAdmin = async (app: INestApplication): Promise<string> => {
  const authService = app.get(AuthService);
  const token = await authService.login({
    email: 'hoofd.leiding@test.be',
    password: '12345678',
  });

  if (!token) {
    throw new Error('No token received');
  }

  return token;
};
