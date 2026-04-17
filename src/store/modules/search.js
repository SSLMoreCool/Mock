import { defineStore } from 'pinia'
import { reqSearchInfo } from '@/api'

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchInfo: {}
  }),
  getters: {
    goodsList() {
      return this.searchInfo.goodsList || []
    },
    attrsList() {
      return this.searchInfo.attrsList || []
    },
    trademarkList() {
      return this.searchInfo.trademarkList || []
    },
    total() {
      return this.searchInfo.total || 0
    }
  },
  actions: {
    async getSearchInfo(params = {}) {
      const result = await reqSearchInfo(params)
      if (result.code === 200) {
        this.searchInfo = result.data
      }
    }
  }
})
