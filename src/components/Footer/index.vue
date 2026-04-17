<template>
  <footer class="footer">
    <div class="footer-service">
      <div class="container">
        <ul class="service-list">
          <li class="service-item">
            <span class="service-icon">🚚</span>
            <div class="service-info">
              <h4>正品保证</h4>
              <p>正品保障，提供发票</p>
            </div>
          </li>
          <li class="service-item">
            <span class="service-icon">💰</span>
            <div class="service-info">
              <h4>急速物流</h4>
              <p>急速物流，送货上门</p>
            </div>
          </li>
          <li class="service-item">
            <span class="service-icon">🔄</span>
            <div class="service-info">
              <h4>退换无忧</h4>
              <p>7天无理由退换货</p>
            </div>
          </li>
          <li class="service-item">
            <span class="service-icon">💎</span>
            <div class="service-info">
              <h4>特色服务</h4>
              <p>私人定制家电套餐</p>
            </div>
          </li>
          <li class="service-item">
            <span class="service-icon">📞</span>
            <div class="service-info">
              <h4>帮助中心</h4>
              <p>您的购物指南</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-links">
      <div class="container">
        <div class="footer-links-inner">
          <div class="footer-nav">
            <a href="javascript:;">关于我们</a>
            <span>|</span>
            <a href="javascript:;">联系我们</a>
            <span>|</span>
            <a href="javascript:;">关于配送</a>
            <span>|</span>
            <a href="javascript:;">帮助中心</a>
            <span>|</span>
            <a href="javascript:;">售后服务</a>
            <span>|</span>
            <a href="javascript:;">合作伙伴</a>
          </div>
          <div class="footer-copyright">
            <p>© 尚品汇电商平台 版权所有</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped lang="less">
.footer {
  margin-top: 30px;
  background: #fff;

  .footer-service {
    border-bottom: 1px solid #e4e4e4;
    padding: 30px 0;

    .service-list {
      display: flex;
      justify-content: space-around;
    }

    .service-item {
      display: flex;
      align-items: center;

      .service-icon {
        font-size: 36px;
        margin-right: 12px;
      }

      .service-info {
        h4 {
          font-size: 16px;
          color: #333;
          margin-bottom: 4px;
        }
        p {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }

  .footer-links {
    padding: 30px 0;

    .footer-links-inner {
      text-align: center;
    }

    .footer-nav {
      margin-bottom: 15px;

      a {
        color: #666;
        font-size: 13px;
        &:hover {
          color: #e1251b;
        }
      }

      span {
        margin: 0 10px;
        color: #ccc;
      }
    }

    .footer-copyright {
      p {
        color: #999;
        font-size: 12px;
      }
    }
  }
}
</style>
