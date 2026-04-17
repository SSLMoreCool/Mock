<template>
  <div class="pay-page">
    <div class="container">
      <div class="pay-box">
        <div class="pay-header">
          <h2>订单提交成功，请您支付</h2>
          <p class="order-info">
            订单号：<em>{{ orderId }}</em>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            应付金额：<em class="amount">¥11898.00</em>
          </p>
        </div>

        <div class="pay-methods">
          <h3>请选择支付方式</h3>
          <div class="method-list">
            <div
              class="method-item"
              :class="{ active: payMethod === 'wechat' }"
              @click="payMethod = 'wechat'"
            >
              <span class="method-icon">💳</span>
              <span>微信支付</span>
            </div>
            <div
              class="method-item"
              :class="{ active: payMethod === 'alipay' }"
              @click="payMethod = 'alipay'"
            >
              <span class="method-icon">🔵</span>
              <span>支付宝</span>
            </div>
            <div
              class="method-item"
              :class="{ active: payMethod === 'bank' }"
              @click="payMethod = 'bank'"
            >
              <span class="method-icon">🏦</span>
              <span>银行卡</span>
            </div>
          </div>
        </div>

        <div class="pay-action">
          <button class="btn-pay" @click="handlePay">立即支付</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayPage',
  data() {
    return {
      orderId: 'SPH' + Date.now() + Math.random().toString(36).substring(2, 8),
      payMethod: 'wechat'
    }
  },
  methods: {
    handlePay() {
      alert('支付功能演示 - 支付成功！')
      this.$router.push('/center/myorder')
    }
  }
}
</script>

<style scoped lang="less">
.pay-page {
  padding: 40px 0;

  .pay-box {
    background: #fff;
    padding: 40px;
    border-radius: 8px;
    max-width: 700px;
    margin: 0 auto;

    .pay-header {
      text-align: center;
      padding-bottom: 30px;
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: 30px;

      h2 {
        font-size: 22px;
        color: #333;
        margin-bottom: 15px;
      }

      .order-info {
        font-size: 14px;
        color: #666;

        em {
          font-style: normal;
          color: #333;
        }

        .amount {
          color: #e1251b;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }

    .pay-methods {
      margin-bottom: 40px;

      h3 {
        font-size: 16px;
        color: #333;
        margin-bottom: 20px;
      }

      .method-list {
        display: flex;
        gap: 20px;

        .method-item {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 20px;
          border: 2px solid #f0f0f0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 15px;

          .method-icon {
            font-size: 24px;
          }

          &.active {
            border-color: #e1251b;
            background: #fff5f5;
          }

          &:hover {
            border-color: #e1251b;
          }
        }
      }
    }

    .pay-action {
      text-align: center;

      .btn-pay {
        width: 200px;
        height: 50px;
        background: #e1251b;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 18px;
        cursor: pointer;

        &:hover {
          background: #cc1f17;
        }
      }
    }
  }
}
</style>
