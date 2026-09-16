import { withInstallFunction } from '../utils';
import http from './http';

export const DartHttp = withInstallFunction(http, 'http');
export default DartHttp;
export * from './http';
