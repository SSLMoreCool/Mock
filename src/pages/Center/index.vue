<template>
  <div class="center">
    <div class="container">
      <div class="center-layout">
        <!-- 左侧菜单 -->
        <div class="center-menu">
          <h3 class="menu-title">个人中心</h3>
          <ul class="menu-list">
            <li :class="{ active: activeMenu === 'myorder' }">
              <router-link to="/center/myorder">
                <span class="menu-icon">📋</span>
                我的订单
              </router-link>
            </li>
            <li>
              <a href="javascript:;">
                <span class="menu-icon">❤️</span>
                我的收藏
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <span class="menu-icon">📍</span>
                收货地址
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <span class="menu-icon">👤</span>
                个人信息
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <span class="menu-icon">🔒</span>
                安全设置
              </a>
            </li>
          </ul>
        </div>

        <!-- 右侧内容 -->
        <div class="center-content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CenterPage',
  data() {
    return {
      activeMenu: 'myorder'
    }
  }
}
</script>

<style scoped lang="less">
.center {
  padding: 20px 0;

  .center-layout {
    display: flex;
    gap: 20px;
  }

  .center-menu {
    width: 200px;
    background: #fff;
    border-radius: 4px;
    padding: 20px 0;

    .menu-title {
      font-size: 18px;
      color: #333;
      padding: 0 20px;
      margin-bottom: 15px;
    }

    .menu-list {
      li {
        a {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          font-size: 14px;
          color: #666;
          transition: all 0.2s;

          .menu-icon {
            font-size: 16px;
          }

          &:hover {
            color: #e1251b;
            background: #fff5f5;
          }
        }

        &.active a {
          color: #e1251b;
          background: #fff5f5;
          border-right: 3px solid #e1251b;
        }
      }
    }
  }

  .center-content {
    flex: 1;
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    min-height: 500px;
  }
}
</style>
