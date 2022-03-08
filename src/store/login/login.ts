import { Module } from 'vuex'

import { ILoginState } from './type'
import { IRootState } from '../type'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
import {
  accountLoginRequest,
  userInfoRequest,
  userMenusByRoleIdRequest
} from '@/service/login/login'
import router from '@/router'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // 1.注册动态路由
      const mapRoute = mapMenusToRoutes(userMenus)
      mapRoute.forEach((route) => {
        router.addRoute('main', route)
      })
      // 2.获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: any) {
      // 1.登录获取 token,id,保存 token
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)
      // 发送初始化请求 （role,department）
      console.log('11')
      dispatch('getInitalDataAction', null, { root: true })
      // 2. 获取用户信息
      const userInfoResult = await userInfoRequest(id)
      const userInfo = userInfoResult.data
      userInfo.name = 'coderDong'
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      // 3.请求用户菜单
      const userMenusResult = await userMenusByRoleIdRequest(userInfo.role.id)
      const userMenus = userMenusResult.data
      userMenus.forEach((item: any) => {
        if (item.name === '随便聊聊') {
          item.name = '其他组件'
          item.children[0].name = '富文本'
          item.children.pop()
        }
      })
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      // 4.跳转首页
      router.push('/main')
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化的请求(完整的role/department)
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log('phoneLogin Action 预留代码未编写', payload, commit)
    },
    setuplogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (token) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (token) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}
export default loginModule
