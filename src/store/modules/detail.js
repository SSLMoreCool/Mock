import { defineStore } from 'pinia'
import { reqDetailInfo, reqAddOrUpdateCart } from '@/api'

export const useDetailStore = defineStore('detail', {
  state: () => ({
    detailInfo: {},
    loading: false
  }),
  getters: {
    categoryView() {
      return this.detailInfo.categoryView || {}
    },
    skuInfo() {
      return this.detailInfo.skuInfo || {}
    },
    spuSaleAttrList() {
      return this.detailInfo.spuSaleAttrList || []
    }
  },
  actions: {
    async getDetailInfo(skuId) {
      this.loading = true
      const result = await reqDetailInfo(skuId)
      if (result.code === 200) {
        this.detailInfo = result.data
      }
      this.loading = false
    }
  }
})
