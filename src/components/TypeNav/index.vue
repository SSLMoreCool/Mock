<template>
  <div class="type-nav" @mouseleave="leaveIndex">
    <div class="container">
      <div class="nav-left">
        <h2
          class="all-category"
          @mouseenter="showCategoryList = true"
          @click="showCategoryList = !showCategoryList"
        >
          <span>全部商品分类</span>
        </h2>

        <!-- 三级分类列表 -->
        <transition name="sort">
          <div class="category-list" v-show="showCategoryList || isHome">
            <div
              class="category-item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ active: currentIndex === index }"
              @mouseenter="changeIndex(index)"
            >
              <h3 class="category-name">
                <a href="javascript:;" @click="goSearch(c1)">{{ c1.categoryName }}</a>
              </h3>

              <!-- 二级三级分类 -->
              <transition name="fade">
                <div class="sub-category" v-show="currentIndex === index">
                  <div
                    class="sub-category-group"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <div class="sub-title">
                      <a href="javascript:;" @click="goSearch(c2)">{{ c2.categoryName }}</a>
                    </div>
                    <div class="sub-items">
                      <a
                        href="javascript:;"
                        v-for="c3 in c2.categoryChild"
                        :key="c3.categoryId"
                        @click="goSearch(c3)"
                      >
                        {{ c3.categoryName }}
                      </a>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </transition>
      </div>

      <!-- 导航菜单 -->
      <nav class="nav-right">
        <a href="javascript:;" class="nav-link active">首页</a>
        <a href="javascript:;" class="nav-link">秒杀</a>
        <a href="javascript:;" class="nav-link">超市</a>
        <a href="javascript:;" class="nav-link">时尚</a>
        <a href="javascript:;" class="nav-link">家电</a>
        <a href="javascript:;" class="nav-link">生鲜</a>
        <a href="javascript:;" class="nav-link">旅行</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { useHomeStore } from '@/store'

export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      showCategoryList: false
    }
  },
  computed: {
    categoryList() {
      const homeStore = useHomeStore()
      return homeStore.categoryList.slice(0, 16)
    },
    isHome() {
      return this.$route.path === '/home' || this.$route.path === '/'
    }
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index
    },
    leaveIndex() {
      this.currentIndex = -1
      if (!this.isHome) {
        this.showCategoryList = false
      }
    },
    goSearch(category) {
      this.$router.push({
        name: 'Search',
        query: {
          categoryName: category.categoryName,
          ...(category.category1Id && { category1Id: category.category1Id }),
          ...(category.category2Id && { category2Id: category.category2Id }),
          ...(category.category3Id && { category3Id: category.category3Id })
        }
      })
      this.showCategoryList = false
    }
  },
  mounted() {
    const homeStore = useHomeStore()
    if (homeStore.categoryList.length === 0) {
      homeStore.getCategoryList()
    }
  }
}
</script>

<style scoped lang="less">
.type-nav {
  background: #e1251b;
  height: 45px;

  .container {
    display: flex;
    position: relative;
  }

  .nav-left {
    width: 210px;
    position: relative;
    z-index: 999;

    .all-category {
      height: 45px;
      line-height: 45px;
      background: rgba(0, 0, 0, 0.1);
      color: #fff;
      font-size: 14px;
      font-weight: normal;
      text-align: center;
      cursor: pointer;
    }

    .category-list {
      position: absolute;
      top: 45px;
      left: 0;
      width: 210px;
      background: #fafafa;
      border: 1px solid #ddd;
      z-index: 1000;

      .category-item {
        position: relative;
        height: 32px;
        line-height: 32px;
        padding: 0 10px;
        transition: background 0.2s;

        &:hover,
        &.active {
          background: #e1251b;
          h3 a {
            color: #fff;
          }
        }

        .category-name {
          font-size: 13px;
          font-weight: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          a {
            color: #333;
            &:hover {
              color: #fff;
            }
          }
        }

        .sub-category {
          position: absolute;
          top: 0;
          left: 210px;
          width: 700px;
          min-height: 300px;
          background: #fff;
          border: 1px solid #ddd;
          padding: 20px;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;

          .sub-category-group {
            width: 100%;
            display: flex;
            margin-bottom: 10px;

            .sub-title {
              width: 80px;
              font-weight: bold;
              font-size: 13px;
              a {
                color: #333;
                &:hover {
                  color: #e1251b;
                }
              }
            }

            .sub-items {
              flex: 1;
              display: flex;
              flex-wrap: wrap;
              gap: 5px 15px;

              a {
                color: #666;
                font-size: 12px;
                &:hover {
                  color: #e1251b;
                }
              }
            }
          }
        }
      }
    }
  }

  .nav-right {
    display: flex;
    align-items: center;
    margin-left: 20px;

    .nav-link {
      color: #fff;
      font-size: 14px;
      padding: 0 15px;
      height: 45px;
      line-height: 45px;
      display: inline-block;

      &:hover,
      &.active {
        background: rgba(255, 255, 255, 0.15);
      }
    }
  }
}

// 过渡动画
.sort-enter-active {
  transition: all 0.3s ease;
}
.sort-leave-active {
  transition: all 0.2s ease;
}
.sort-enter-from,
.sort-leave-to {
  height: 0;
  opacity: 0;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
