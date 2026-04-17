<template>
  <div class="search">
    <div class="container">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <router-link to="/home">首页</router-link>
        <span> &gt; </span>
        <span v-if="searchParams.categoryName">{{ searchParams.categoryName }}</span>
        <span v-if="searchParams.keyword" class="keyword-tag">
          {{ searchParams.keyword }}
          <a href="javascript:;" @click="removeKeyword">×</a>
        </span>
      </div>

      <div class="search-content">
        <!-- 搜索筛选条件 -->
        <div class="search-selector">
          <h3 class="selector-title">筛选条件</h3>

          <!-- 品牌筛选 -->
          <div class="selector-group" v-if="trademarkList.length">
            <div class="selector-label">品牌：</div>
            <div class="selector-options">
              <a
                href="javascript:;"
                v-for="tm in trademarkList"
                :key="tm.tmId"
                @click="selectTrademark(tm)"
                class="option-item"
              >
                {{ tm.tmName }}
              </a>
            </div>
          </div>

          <!-- 属性筛选 -->
          <div class="selector-group" v-for="attr in attrsList" :key="attr.attrId">
            <div class="selector-label">{{ attr.attrName }}：</div>
            <div class="selector-options">
              <a
                href="javascript:;"
                v-for="val in attr.attrValueList"
                :key="val"
                @click="selectAttr(attr, val)"
                class="option-item"
              >
                {{ val }}
              </a>
            </div>
          </div>
        </div>

        <!-- 排序 -->
        <div class="search-sort">
          <span class="sort-label">排序：</span>
          <a
            href="javascript:;"
            :class="{ active: sortType === 'comprehensive' }"
            @click="changeSort('comprehensive')"
          >综合</a>
          <a
            href="javascript:;"
            :class="{ active: sortType === 'price' }"
            @click="changeSort('price')"
          >价格 {{ sortType === 'price' ? (sortAsc ? '↑' : '↓') : '' }}</a>
          <a
            href="javascript:;"
            :class="{ active: sortType === 'sales' }"
            @click="changeSort('sales')"
          >销量</a>
          <a
            href="javascript:;"
            :class="{ active: sortType === 'new' }"
            @click="changeSort('new')"
          >新品</a>
        </div>

        <!-- 商品列表 -->
        <div class="goods-list" v-if="goodsList.length">
          <div class="goods-item" v-for="goods in goodsList" :key="goods.id">
            <div class="goods-img">
              <router-link :to="`/detail/${goods.id}`">
                <img :src="goods.defaultImg" :alt="goods.title" />
              </router-link>
            </div>
            <div class="goods-info">
              <p class="goods-price">
                <span class="price-symbol">¥</span>
                <span class="price-value">{{ goods.price }}</span>
              </p>
              <p class="goods-title">
                <router-link :to="`/detail/${goods.id}`">{{ goods.title }}</router-link>
              </p>
              <p class="goods-extra">
                <span>已有 <em>{{ goods.hotScore }}</em> 人评价</span>
              </p>
              <div class="goods-actions">
                <button class="btn-cart" @click="addToCart(goods)">加入购物车</button>
                <button class="btn-collect">收藏</button>
              </div>
            </div>
          </div>
        </div>
        <div class="no-goods" v-else>
          <p>暂无搜索结果，换个关键词试试吧~</p>
        </div>

        <!-- 分页 -->
        <div class="pagination" v-if="total > 0">
          <button
            class="page-btn"
            :disabled="currentPage <= 1"
            @click="changePage(currentPage - 1)"
          >上一页</button>
          <span class="page-info">第 {{ currentPage }} / {{ totalPages }} 页</span>
          <button
            class="page-btn"
            :disabled="currentPage >= totalPages"
            @click="changePage(currentPage + 1)"
          >下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useSearchStore } from '@/store'

export default {
  name: 'SearchPage',
  data() {
    return {
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        order: '1:desc',
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: ''
      },
      sortType: 'comprehensive',
      sortAsc: false,
      currentPage: 1
    }
  },
  computed: {
    goodsList() {
      return useSearchStore().goodsList
    },
    attrsList() {
      return useSearchStore().attrsList
    },
    trademarkList() {
      return useSearchStore().trademarkList
    },
    total() {
      return useSearchStore().total
    },
    totalPages() {
      return Math.ceil(this.total / this.searchParams.pageSize)
    }
  },
  methods: {
    async getData() {
      const searchStore = useSearchStore()
      await searchStore.getSearchInfo(this.searchParams)
    },
    removeKeyword() {
      this.searchParams.keyword = ''
      this.$router.push({ name: 'Search' })
      this.getData()
    },
    selectTrademark(tm) {
      this.searchParams.trademark = `${tm.tmId}:${tm.tmName}`
      this.getData()
    },
    selectAttr(attr, val) {
      const prop = `${attr.attrId}:${val}:${attr.attrName}`
      if (!this.searchParams.props.includes(prop)) {
        this.searchParams.props.push(prop)
      }
      this.getData()
    },
    changeSort(type) {
      if (this.sortType === type && type === 'price') {
        this.sortAsc = !this.sortAsc
      } else {
        this.sortType = type
        this.sortAsc = false
      }
      const orderMap = {
        comprehensive: '1',
        price: '2',
        sales: '3',
        new: '4'
      }
      this.searchParams.order = `${orderMap[type]}:${this.sortAsc ? 'asc' : 'desc'}`
      this.getData()
    },
    changePage(page) {
      this.currentPage = page
      this.searchParams.pageNo = page
      this.getData()
    },
    addToCart(goods) {
      this.$router.push({
        name: 'AddCartSuccess',
        query: {
          skuId: goods.id,
          skuNum: 1
        }
      })
    }
  },
  beforeMount() {
    // 从路由获取参数
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted() {
    this.getData()
  },
  watch: {
    $route() {
      // 路由变化时重新获取数据
      Object.assign(this.searchParams, {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        props: [],
        trademark: '',
        pageNo: 1
      }, this.$route.query, this.$route.params)
      this.currentPage = 1
      this.getData()
    }
  }
}
</script>

<style scoped lang="less">
.search {
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
      &:hover {
        color: #e1251b;
      }
    }

    .keyword-tag {
      display: inline-block;
      background: #e1251b;
      color: #fff;
      padding: 2px 8px;
      border-radius: 3px;
      margin-left: 5px;

      a {
        color: #fff;
        margin-left: 5px;
      }
    }
  }

  .search-content {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
  }

  .search-selector {
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 15px;
    margin-bottom: 15px;

    .selector-title {
      font-size: 16px;
      color: #333;
      margin-bottom: 15px;
    }

    .selector-group {
      display: flex;
      margin-bottom: 10px;

      .selector-label {
        width: 80px;
        color: #999;
        font-size: 13px;
        line-height: 28px;
      }

      .selector-options {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        .option-item {
          padding: 4px 15px;
          border: 1px solid #ddd;
          border-radius: 3px;
          font-size: 13px;
          color: #666;
          transition: all 0.2s;

          &:hover {
            border-color: #e1251b;
            color: #e1251b;
          }
        }
      }
    }
  }

  .search-sort {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;

    .sort-label {
      color: #666;
      font-size: 14px;
      margin-right: 10px;
    }

    a {
      padding: 6px 18px;
      border: 1px solid #ddd;
      border-radius: 3px;
      font-size: 13px;
      color: #666;
      transition: all 0.2s;

      &:hover,
      &.active {
        background: #e1251b;
        border-color: #e1251b;
        color: #fff;
      }
    }
  }

  .goods-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;

    .goods-item {
      border: 1px solid #f0f0f0;
      border-radius: 4px;
      overflow: hidden;
      transition: all 0.3s;

      &:hover {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transform: translateY(-3px);
      }

      .goods-img {
        height: 200px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        &:hover img {
          transform: scale(1.05);
        }
      }

      .goods-info {
        padding: 10px;

        .goods-price {
          color: #e1251b;
          margin-bottom: 5px;

          .price-symbol {
            font-size: 12px;
          }
          .price-value {
            font-size: 20px;
            font-weight: bold;
          }
        }

        .goods-title {
          margin-bottom: 5px;
          a {
            font-size: 13px;
            color: #333;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;

            &:hover {
              color: #e1251b;
            }
          }
        }

        .goods-extra {
          font-size: 12px;
          color: #999;
          margin-bottom: 8px;

          em {
            color: #e1251b;
            font-style: normal;
          }
        }

        .goods-actions {
          display: flex;
          gap: 8px;

          button {
            flex: 1;
            height: 30px;
            border-radius: 3px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
          }

          .btn-cart {
            background: #e1251b;
            color: #fff;
            border: 1px solid #e1251b;

            &:hover {
              background: #cc1f17;
            }
          }

          .btn-collect {
            background: #fff;
            color: #666;
            border: 1px solid #ddd;

            &:hover {
              border-color: #e1251b;
              color: #e1251b;
            }
          }
        }
      }
    }
  }

  .no-goods {
    text-align: center;
    padding: 80px 0;
    color: #999;
    font-size: 16px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 30px;
    padding-top: 20px;

    .page-btn {
      padding: 8px 20px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #333;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover:not(:disabled) {
        border-color: #e1251b;
        color: #e1251b;
      }

      &:disabled {
        color: #ccc;
        cursor: not-allowed;
      }
    }

    .page-info {
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
