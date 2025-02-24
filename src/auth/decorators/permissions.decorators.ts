import { SetMetadata } from '@nestjs/common';
import { ApiPermissions as permissions } from '../../permissions/Permissions';
export const RequirePermissions = (...permissions: string[]) => SetMetadata('permissions', permissions);
