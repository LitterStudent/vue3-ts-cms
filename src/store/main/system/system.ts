import { Module } from 'vuex'
import { ISystemState } from './type'
import { IRootState } from '@/store/type'
import { getPageListData } from '@/service/main/system/system'
const system: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      usersCount: 0,
      usersList: [],
      roleCount: 0,
      roleList: [],
      goodsCount: 0,
      goodsList: [],
      menuCount: 0,
      menuList: []
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, roleCount: number) {
      state.goodsCount = roleCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const { pageName, queryInfo } = payload
      const url = `/${pageName}/list`
      const pageResult = await getPageListData(url, queryInfo)
      const { list, totalCount } = pageResult.data
      const pageNameUp = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${pageNameUp}List`, list)
      commit(`change${pageNameUp}Count`, totalCount)
    }
  }
}

export { system }
