import { withInstallFunction } from '../utils';
import permission from './permission';

export const DartPermission = withInstallFunction(permission, 'permission');
export default DartPermission;
export * from './permission';
