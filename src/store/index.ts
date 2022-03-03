import { createStore, Store, useStore as useVuexStore } from 'vuex'
import type { IStoreType } from './type'
import login from './login/login'
import { system } from './main/system/system'
import type { IRootState } from './type'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'dongdong',
      age: 12
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/setuplogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
