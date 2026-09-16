// import { App } from 'vue';
import { withInstall } from '../utils';
import input from './input.vue';

// DartInput.install = (app: App): void => {
//   app.component(DartInput.name, DartInput);
// };
export const DartInput = withInstall(input);
export default DartInput;
export * from './input.vue';
