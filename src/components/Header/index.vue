<template>
  <header class="header">
    <!-- 头部顶部 -->
    <div class="header-top">
      <div class="container header-top-inner">
        <div class="header-top-left">
          <span>尚品汇欢迎您！</span>
          <template v-if="!isLogin">
            <router-link to="/login" class="login-link">请登录</router-link>
            <router-link to="/register" class="register-link">免费注册</router-link>
          </template>
          <template v-else>
            <span class="username">{{ userName }}</span>
            <a href="javascript:;" class="logout" @click="handleLogout">退出登录</a>
          </template>
        </div>
        <div class="header-top-right">
          <router-link to="/center">我的订单</router-link>
          <span class="divider">|</span>
          <a href="javascript:;">我的收藏</a>
          <span class="divider">|</span>
          <a href="javascript:;">品牌会员</a>
          <span class="divider">|</span>
          <a href="javascript:;">企业采购</a>
          <span class="divider">|</span>
          <a href="javascript:;">关注尚品汇</a>
          <span class="divider">|</span>
          <a href="javascript:;">合作招商</a>
          <span class="divider">|</span>
          <a href="javascript:;">商家后台</a>
        </div>
      </div>
    </div>

    <!-- 头部主体 -->
    <div class="header-main">
      <div class="container header-main-inner">
        <h1 class="logo">
          <router-link to="/home" title="尚品汇">
            <span class="logo-text">尚品汇</span>
          </router-link>
        </h1>

        <div class="search-box">
          <input
            type="text"
            class="search-input"
            placeholder="请输入搜索关键词..."
            v-model="keyword"
            @keyup.enter="handleSearch"
          />
          <button class="search-btn" @click="handleSearch">搜索</button>
        </div>

        <div class="header-cart">
          <router-link to="/shopcart" class="cart-link">
            <span class="cart-icon">🛒</span>
            <span>我的购物车</span>
            <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 三级联动导航 -->
    <TypeNav />
  </header>
</template>

<script>
import TypeNav from '../TypeNav/index.vue'

export default {
  name: 'HeaderComponent',
  components: { TypeNav },
  data() {
    return {
      keyword: '',
      isLogin: false,
      userName: '',
      cartCount: 0
    }
  },
  methods: {
    handleSearch() {
      if (this.keyword.trim()) {
        this.$router.push({
          name: 'Search',
          params: { keyword: this.keyword },
          query: this.$route.query
        })
      }
    },
    handleLogout() {
      this.isLogin = false
      this.userName = ''
      localStorage.removeItem('TOKEN')
    }
  },
  mounted() {
    // 从路由参数恢复搜索关键词
    if (this.$route.params.keyword) {
      this.keyword = this.$route.params.keyword
    }
  }
}
</script>

<style scoped lang="less">
.header {
  background: #fff;
}

.header-top {
  height: 30px;
  background: #eaeaea;
  line-height: 30px;
  font-size: 12px;
  color: #666;

  .header-top-inner {
    display: flex;
    justify-content: space-between;
  }

  .header-top-left {
    .login-link,
    .register-link {
      color: #e1251b;
      margin: 0 5px;
    }
    .username {
      color: #e1251b;
      margin-right: 10px;
    }
    .logout {
      color: #666;
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        color: #e1251b;
      }
    }
  }

  .header-top-right {
    a {
      color: #666;
      font-size: 12px;
      &:hover {
        color: #e1251b;
      }
    }
    .divider {
      margin: 0 8px;
      color: #ccc;
    }
  }
}

.header-main {
  height: 80px;

  .header-main-inner {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .logo {
    width: 170px;
    margin-right: 40px;

    a {
      display: block;
    }

    .logo-text {
      font-size: 28px;
      font-weight: bold;
      color: #e1251b;
      letter-spacing: 2px;
    }
  }

  .search-box {
    flex: 1;
    display: flex;
    max-width: 500px;

    .search-input {
      flex: 1;
      height: 36px;
      padding: 0 10px;
      border: 2px solid #e1251b;
      border-right: none;
      border-radius: 2px 0 0 2px;
      font-size: 14px;
      outline: none;
    }

    .search-btn {
      width: 80px;
      height: 36px;
      background: #e1251b;
      color: #fff;
      border: 2px solid #e1251b;
      border-radius: 0 2px 2px 0;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background: #cc1f17;
      }
    }
  }

  .header-cart {
    margin-left: 40px;

    .cart-link {
      display: flex;
      align-items: center;
      height: 36px;
      padding: 0 15px;
      border: 1px solid #ddd;
      border-radius: 2px;
      color: #e1251b;
      font-size: 14px;
      position: relative;

      .cart-icon {
        margin-right: 5px;
        font-size: 18px;
      }

      .cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        min-width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        background: #e1251b;
        color: #fff;
        border-radius: 9px;
        font-size: 12px;
        padding: 0 4px;
      }

      &:hover {
        background: #fff4e8;
      }
    }
  }
}
</style>
