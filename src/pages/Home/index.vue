<template>
  <div class="home">
    <!-- 主内容区域 -->
    <div class="home-main container">
      <div class="home-banner">
        <!-- 左侧分类区域在TypeNav中已经处理 -->
        <!-- 轮播图 -->
        <div class="banner-carousel">
          <Carousel :list="bannerList" />
        </div>
      </div>
    </div>

    <!-- 今日推荐 -->
    <div class="recommend-section container">
      <div class="section-header">
        <h3 class="section-title">今日推荐</h3>
      </div>
      <div class="recommend-list">
        <div class="recommend-item" v-for="item in recommendList" :key="item.id">
          <div class="recommend-img">
            <img :src="item.imgUrl" :alt="item.name" />
          </div>
          <div class="recommend-info">
            <p class="recommend-name">{{ item.name }}</p>
            <p class="recommend-price">
              <span class="price-symbol">¥</span>
              <span class="price-value">{{ item.price }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 楼层区域 -->
    <div class="floor-section" v-for="floor in floorList" :key="floor.id">
      <div class="container">
        <div class="floor-header">
          <div class="floor-title">
            <h3>{{ floor.name }}</h3>
          </div>
          <div class="floor-nav">
            <a
              href="javascript:;"
              v-for="nav in floor.navList"
              :key="nav.text"
              class="floor-nav-link"
            >
              {{ nav.text }}
            </a>
          </div>
        </div>

        <div class="floor-content">
          <div class="floor-left">
            <div class="floor-keywords">
              <a
                href="javascript:;"
                v-for="keyword in floor.keywords"
                :key="keyword"
                class="keyword-link"
              >
                {{ keyword }}
              </a>
            </div>
            <div class="floor-big-img">
              <img :src="floor.bigImg" alt="" />
            </div>
          </div>

          <div class="floor-right">
            <div class="floor-product-list">
              <div
                class="floor-product"
                v-for="(img, index) in floor.recommendList"
                :key="index"
              >
                <img :src="img" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 品牌推荐 -->
    <div class="brand-section container">
      <div class="section-header">
        <h3 class="section-title">品牌推荐</h3>
      </div>
      <div class="brand-list">
        <div class="brand-item" v-for="brand in brands" :key="brand.id">
          <div class="brand-logo">{{ brand.logo }}</div>
          <p class="brand-name">{{ brand.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel/index.vue'
import { useHomeStore } from '@/store'

export default {
  name: 'HomePage',
  components: { Carousel },
  data() {
    return {
      recommendList: [
        { id: 1, name: 'Apple iPhone 15', price: '5999', imgUrl: 'https://picsum.photos/200/200?random=50' },
        { id: 2, name: 'Huawei Mate 60', price: '4999', imgUrl: 'https://picsum.photos/200/200?random=51' },
        { id: 3, name: 'Xiaomi 14 Pro', price: '3999', imgUrl: 'https://picsum.photos/200/200?random=52' },
        { id: 4, name: 'Samsung Galaxy S24', price: '5499', imgUrl: 'https://picsum.photos/200/200?random=53' }
      ],
      brands: [
        { id: 1, name: 'Apple', logo: '🍎' },
        { id: 2, name: 'Huawei', logo: '📱' },
        { id: 3, name: 'Xiaomi', logo: '🔶' },
        { id: 4, name: 'Samsung', logo: '💫' },
        { id: 5, name: 'Sony', logo: '🎮' },
        { id: 6, name: 'Lenovo', logo: '💻' }
      ]
    }
  },
  computed: {
    bannerList() {
      return useHomeStore().bannerList
    },
    floorList() {
      return useHomeStore().floorList
    }
  },
  mounted() {
    const homeStore = useHomeStore()
    homeStore.getBannerList()
    homeStore.getFloorList()
  }
}
</script>

<style scoped lang="less">
.home {
  .home-main {
    margin-top: 10px;
  }

  .home-banner {
    .banner-carousel {
      margin-left: 210px;
      height: 460px;
    }
  }

  // 推荐区域
  .recommend-section {
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    border-radius: 4px;

    .section-header {
      border-bottom: 2px solid #e1251b;
      padding-bottom: 10px;
      margin-bottom: 20px;

      .section-title {
        font-size: 20px;
        color: #333;
        position: relative;
        padding-left: 15px;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 2px;
          width: 4px;
          height: 22px;
          background: #e1251b;
          border-radius: 2px;
        }
      }
    }

    .recommend-list {
      display: flex;
      gap: 20px;

      .recommend-item {
        flex: 1;
        text-align: center;
        padding: 20px;
        border: 1px solid #f0f0f0;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transform: translateY(-3px);
        }

        .recommend-img {
          width: 160px;
          height: 160px;
          margin: 0 auto 15px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
          }
        }

        .recommend-name {
          font-size: 14px;
          color: #333;
          margin-bottom: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .recommend-price {
          color: #e1251b;
          font-size: 14px;

          .price-symbol {
            font-size: 12px;
          }

          .price-value {
            font-size: 22px;
            font-weight: bold;
          }
        }
      }
    }
  }

  // 楼层区域
  .floor-section {
    margin-top: 20px;

    .floor-header {
      display: flex;
      align-items: center;
      background: #fff;
      padding: 15px 20px;
      border-bottom: 2px solid #e1251b;

      .floor-title {
        h3 {
          font-size: 20px;
          color: #e1251b;
          margin-right: 30px;
        }
      }

      .floor-nav {
        display: flex;
        gap: 20px;

        .floor-nav-link {
          color: #666;
          font-size: 14px;

          &:hover {
            color: #e1251b;
          }
        }
      }
    }

    .floor-content {
      display: flex;
      background: #fff;
      padding: 15px;
      min-height: 360px;

      .floor-left {
        width: 210px;
        margin-right: 15px;

        .floor-keywords {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 15px;

          .keyword-link {
            padding: 4px 12px;
            background: #f5f5f5;
            border-radius: 3px;
            font-size: 12px;
            color: #666;

            &:hover {
              background: #e1251b;
              color: #fff;
            }
          }
        }

        .floor-big-img {
          img {
            width: 100%;
            border-radius: 4px;
          }
        }
      }

      .floor-right {
        flex: 1;

        .floor-product-list {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;

          .floor-product {
            aspect-ratio: 1;
            overflow: hidden;
            border-radius: 4px;
            border: 1px solid #f0f0f0;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              transform: scale(1.02);
            }

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
  }

  // 品牌推荐
  .brand-section {
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    border-radius: 4px;

    .section-header {
      border-bottom: 2px solid #e1251b;
      padding-bottom: 10px;
      margin-bottom: 20px;

      .section-title {
        font-size: 20px;
        color: #333;
        position: relative;
        padding-left: 15px;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 2px;
          width: 4px;
          height: 22px;
          background: #e1251b;
          border-radius: 2px;
        }
      }
    }

    .brand-list {
      display: flex;
      justify-content: space-around;

      .brand-item {
        text-align: center;
        cursor: pointer;
        padding: 15px;
        border-radius: 4px;
        transition: all 0.3s;

        &:hover {
          background: #f5f5f5;
        }

        .brand-logo {
          font-size: 48px;
          margin-bottom: 10px;
        }

        .brand-name {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
}
</style>
