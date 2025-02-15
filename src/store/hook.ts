import { store } from './index';

import { appStore } from './modules/application';

function useApplicationStore() {
  return appStore(store);
}

export { useApplicationStore };
