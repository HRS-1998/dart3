import { withInstall } from '../utils';
import state from './state.vue';

export type DartStateType = 'primary' | 'success' | 'info' | 'warning' | 'danger';

export const DartState = withInstall(state);
export default DartState;
export * from './state.vue';
