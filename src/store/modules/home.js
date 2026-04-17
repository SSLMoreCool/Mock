import { defineStore } from 'pinia'
import { reqCategoryList, reqBannerList, reqFloorList } from '@/api'

export const useHomeStore = defineStore('home', {
  state: () => ({
    categoryList: [],
    bannerList: [],
    floorList: []
  }),
  actions: {
    async getCategoryList() {
      const result = await reqCategoryList()
      if (result.code === 200) {
        this.categoryList = result.data
      }
    },
    async getBannerList() {
      const result = await reqBannerList()
      if (result.code === 200) {
        this.bannerList = result.data
      }
    },
    async getFloorList() {
      const result = await reqFloorList()
      if (result.code === 200) {
        this.floorList = result.data
      }
    }
  }
})
