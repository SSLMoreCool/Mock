<template>
  <div class="detail" v-if="!loading">
    <div class="container">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <router-link to="/home">首页</router-link>
        <span> &gt; </span>
        <a href="javascript:;">{{ categoryView.category1Name }}</a>
        <span> &gt; </span>
        <a href="javascript:;">{{ categoryView.category2Name }}</a>
        <span> &gt; </span>
        <a href="javascript:;">{{ categoryView.category3Name }}</a>
      </div>

      <!-- 商品主信息 -->
      <div class="detail-main">
        <!-- 左侧图片 -->
        <div class="detail-left">
          <div class="main-image">
            <img :src="currentImage || defaultImg" alt="" />
          </div>
          <div class="image-list">
            <div
              class="image-item"
              v-for="(img, index) in skuImageList"
              :key="index"
              :class="{ active: currentImageIndex === index }"
              @click="selectImage(index)"
            >
              <img :src="img.imgUrl" alt="" />
            </div>
          </div>
        </div>

        <!-- 右侧信息 -->
        <div class="detail-right">
          <h1 class="sku-name">{{ skuInfo.skuName }}</h1>
          <p class="sku-desc">{{ skuInfo.skuDesc }}</p>
          <div class="sku-price">
            <span class="price-symbol">¥</span>
            <span class="price-value">{{ skuInfo.price }}</span>
          </div>

          <!-- 销售属性 -->
          <div class="sku-attrs" v-if="spuSaleAttrList.length">
            <div class="attr-group" v-for="attr in spuSaleAttrList" :key="attr.id">
              <span class="attr-label">{{ attr.saleAttrName }}：</span>
              <div class="attr-values">
                <span
                  v-for="val in attr.spuSaleAttrValueList"
                  :key="val.id"
                  :class="['attr-value', { active: val.isChecked === '1' }]"
                  @click="selectAttr(attr, val)"
                >
                  {{ val.saleAttrValueName }}
                </span>
              </div>
            </div>
          </div>

          <!-- 数量选择 -->
          <div class="sku-quantity">
            <span class="qty-label">购买数量：</span>
            <div class="qty-control">
              <button class="qty-btn" @click="changeNum(-1)">-</button>
              <input type="number" v-model.number="skuNum" min="1" class="qty-input" />
              <button class="qty-btn" @click="changeNum(1)">+</button>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="sku-actions">
            <button class="btn-buy" @click="buyNow">立即购买</button>
            <button class="btn-cart" @click="addToCart">加入购物车</button>
          </div>
        </div>
      </div>

      <!-- 商品详情标签 -->
      <div class="detail-tabs">
        <div class="tabs-header">
          <span
            :class="['tab-item', { active: activeTab === 'detail' }]"
            @click="activeTab = 'detail'"
          >商品介绍</span>
          <span
            :class="['tab-item', { active: activeTab === 'spec' }]"
            @click="activeTab = 'spec'"
          >规格与包装</span>
          <span
            :class="['tab-item', { active: activeTab === 'review' }]"
            @click="activeTab = 'review'"
          >商品评价</span>
        </div>
        <div class="tabs-content">
          <div v-show="activeTab === 'detail'" class="tab-pane">
            <p>商品详情加载中...</p>
          </div>
          <div v-show="activeTab === 'spec'" class="tab-pane">
            <p>规格与包装信息加载中...</p>
          </div>
          <div v-show="activeTab === 'review'" class="tab-pane">
            <p>暂无评价</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    <p>加载中...</p>
  </div>
</template>

<script>
import { useDetailStore } from '@/store'

export default {
  name: 'DetailPage',
  data() {
    return {
      skuNum: 1,
      currentImageIndex: 0,
      activeTab: 'detail'
    }
  },
  computed: {
    loading() {
      return useDetailStore().loading
    },
    categoryView() {
      return useDetailStore().categoryView
    },
    skuInfo() {
      return useDetailStore().skuInfo
    },
    spuSaleAttrList() {
      return useDetailStore().spuSaleAttrList
    },
    skuImageList() {
      return this.skuInfo.skuImageList || []
    },
    currentImage() {
      return this.skuImageList[this.currentImageIndex]?.imgUrl
    },
    defaultImg() {
      return this.skuInfo.skuDefaultImg || ''
    }
  },
  methods: {
    selectImage(index) {
      this.currentImageIndex = index
    },
    changeNum(num) {
      this.skuNum = Math.max(1, this.skuNum + num)
    },
    selectAttr(attr, val) {
      attr.spuSaleAttrValueList.forEach(v => {
        v.isChecked = '0'
      })
      val.isChecked = '1'
    },
    addToCart() {
      this.$router.push({
        name: 'AddCartSuccess',
        query: {
          skuId: this.$route.params.skuId,
          skuNum: this.skuNum
        }
      })
    },
    buyNow() {
      this.$router.push('/trade')
    }
  },
  mounted() {
    const detailStore = useDetailStore()
    detailStore.getDetailInfo(this.$route.params.skuId)
  }
}
</script>

<style scoped lang="less">
.detail {
  padding: 20px 0;

  .breadcrumb {
    background: #fff;
    padding: 10px 15px;
    margin-bottom: 15px;
    border-radius: 4px;
    font-size: 13px;
    color: #999;

    a {
      color: #666;
      &:hover { color: #e1251b; }
    }
  }

  .detail-main {
    display: flex;
    background: #fff;
    padding: 30px;
    border-radius: 4px;
    gap: 40px;

    .detail-left {
      width: 400px;

      .main-image {
        width: 400px;
        height: 400px;
        border: 1px solid #f0f0f0;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 10px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .image-list {
        display: flex;
        gap: 8px;

        .image-item {
          width: 60px;
          height: 60px;
          border: 2px solid transparent;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;

          &.active, &:hover {
            border-color: #e1251b;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }

    .detail-right {
      flex: 1;

      .sku-name {
        font-size: 18px;
        color: #333;
        line-height: 1.6;
        margin-bottom: 8px;
      }

      .sku-desc {
        font-size: 13px;
        color: #999;
        margin-bottom: 15px;
      }

      .sku-price {
        background: #f5f5f5;
        padding: 15px 20px;
        margin-bottom: 20px;
        border-radius: 4px;

        .price-symbol {
          font-size: 14px;
          color: #e1251b;
        }
        .price-value {
          font-size: 28px;
          font-weight: bold;
          color: #e1251b;
        }
      }

      .sku-attrs {
        margin-bottom: 20px;

        .attr-group {
          display: flex;
          align-items: flex-start;
          margin-bottom: 15px;

          .attr-label {
            width: 80px;
            color: #999;
            font-size: 13px;
            line-height: 32px;
          }

          .attr-values {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;

            .attr-value {
              padding: 6px 18px;
              border: 1px solid #ddd;
              border-radius: 4px;
              font-size: 13px;
              cursor: pointer;
              transition: all 0.2s;

              &:hover, &.active {
                border-color: #e1251b;
                color: #e1251b;
              }
            }
          }
        }
      }

      .sku-quantity {
        display: flex;
        align-items: center;
        margin-bottom: 30px;

        .qty-label {
          color: #999;
          font-size: 13px;
          margin-right: 10px;
        }

        .qty-control {
          display: flex;

          .qty-btn {
            width: 32px;
            height: 32px;
            border: 1px solid #ddd;
            background: #f5f5f5;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
              background: #eee;
            }
          }

          .qty-input {
            width: 60px;
            height: 32px;
            text-align: center;
            border: 1px solid #ddd;
            border-left: none;
            border-right: none;
            font-size: 14px;
            -moz-appearance: textfield;
            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
              -webkit-appearance: none;
            }
          }
        }
      }

      .sku-actions {
        display: flex;
        gap: 15px;

        button {
          width: 160px;
          height: 46px;
          font-size: 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-buy {
          background: #e1251b;
          color: #fff;
          border: 2px solid #e1251b;

          &:hover {
            background: #cc1f17;
          }
        }

        .btn-cart {
          background: #fff;
          color: #e1251b;
          border: 2px solid #e1251b;

          &:hover {
            background: #fff5f5;
          }
        }
      }
    }
  }

  .detail-tabs {
    margin-top: 20px;
    background: #fff;
    border-radius: 4px;

    .tabs-header {
      display: flex;
      border-bottom: 2px solid #e1251b;

      .tab-item {
        padding: 12px 30px;
        font-size: 15px;
        color: #666;
        cursor: pointer;
        transition: all 0.2s;

        &.active {
          background: #e1251b;
          color: #fff;
        }

        &:hover:not(.active) {
          color: #e1251b;
        }
      }
    }

    .tabs-content {
      padding: 30px;
      min-height: 200px;

      .tab-pane {
        color: #666;
        font-size: 14px;
        line-height: 2;
      }
    }
  }
}

.loading {
  text-align: center;
  padding: 100px 0;
  color: #999;
  font-size: 16px;
}
</style>
