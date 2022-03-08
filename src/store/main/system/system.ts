import { Module } from 'vuex'
import { ISystemState } from './type'
import { IRootState } from '@/store/type'
import {
  deletePageData,
  getPageListData,
  editPageData,
  createPageData
} from '@/service/main/system/system'
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
      menuList: [],
      departmentList: [],
      departmentCount: 0,
      categoryList: [],
      categoryCount: 0
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
    },
    changeDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList
    },
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount
    },
    changeCategoryList(state, categoryList: any) {
      state.categoryList = categoryList
    },
    changeCategoryCount(state, categoryCount: number) {
      state.categoryCount = categoryCount
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
    },
    async deletePageDataAction({ commit }, payload: any) {
      console.log(commit)
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`

      await deletePageData(pageUrl)
    },
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      const res = await editPageData(pageUrl, editData)
      console.log(res)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, createData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, createData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default system
