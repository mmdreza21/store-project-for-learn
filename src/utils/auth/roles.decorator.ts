import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/models/user/userModel';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// export const checkRole = (role: Role, userRole: Role): boolean => {
//   return role === userRole;
// };
