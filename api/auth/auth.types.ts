// src/auth/auth.types.ts (Updated)

import { Role } from './roles';

export interface AuthUser {
  id: number;
  // Use the strong enum type for the roles array
  roles: Role[]; 
  email: string;
}