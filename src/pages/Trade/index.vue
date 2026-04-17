<template>
  <div class="trade">
    <div class="container">
      <h2 class="page-title">确认订单</h2>

      <div class="trade-content">
        <!-- 收货地址 -->
        <div class="section address-section">
          <h3 class="section-title">收货信息</h3>
          <div class="address-list">
            <div
              class="address-item"
              v-for="addr in addressList"
              :key="addr.id"
              :class="{ active: selectedAddress === addr.id }"
              @click="selectedAddress = addr.id"
            >
              <p class="addr-name">{{ addr.name }} {{ addr.phone }}</p>
              <p class="addr-detail">{{ addr.address }}</p>
              <span class="addr-default" v-if="addr.isDefault">默认</span>
            </div>
          </div>
        </div>

        <!-- 商品清单 -->
        <div class="section goods-section">
          <h3 class="section-title">商品清单</h3>
          <div class="goods-list">
            <div class="goods-item" v-for="item in goodsList" :key="item.id">
              <div class="goods-img">
                <img :src="item.imgUrl" alt="" />
              </div>
              <div class="goods-info">
                <p class="goods-name">{{ item.name }}</p>
                <p class="goods-attr">{{ item.attr }}</p>
              </div>
              <div class="goods-price">¥{{ item.price }}</div>
              <div class="goods-qty">x{{ item.quantity }}</div>
              <div class="goods-total">¥{{ (item.price * item.quantity).toFixed(2) }}</div>
            </div>
          </div>
        </div>

        <!-- 买家留言 -->
        <div class="section message-section">
          <h3 class="section-title">买家留言</h3>
          <textarea v-model="buyerMessage" placeholder="请填写您的留言（选填）" class="message-input"></textarea>
        </div>

        <!-- 结算信息 -->
        <div class="settle-bar">
          <div class="settle-info">
            <p>共 <em>{{ totalCount }}</em> 件商品</p>
            <p class="settle-total">应付总额：<em>¥{{ totalPrice }}</em></p>
          </div>
          <button class="btn-submit" @click="submitOrder">提交订单</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TradePage',
  data() {
    return {
      selectedAddress: 1,
      buyerMessage: '',
      addressList: [
        { id: 1, name: '张三', phone: '138****8888', address: '北京市海淀区中关村软件园', isDefault: true },
        { id: 2, name: '李四', phone: '139****9999', address: '上海市浦东新区陆家嘴金融区', isDefault: false }
      ],
      goodsList: [
        { id: 1, name: 'Apple iPhone 15 Pro Max', attr: '256GB 原色钛金属', price: 9999, quantity: 1, imgUrl: 'https://picsum.photos/80/80?random=70' },
        { id: 2, name: 'AirPods Pro 2', attr: 'USB-C版', price: 1899, quantity: 1, imgUrl: 'https://picsum.photos/80/80?random=71' }
      ]
    }
  },
  computed: {
    totalCount() {
      return this.goodsList.reduce((sum, item) => sum + item.quantity, 0)
    },
    totalPrice() {
      return this.goodsList.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
    }
  },
  methods: {
    submitOrder() {
      this.$router.push('/pay')
    }
  }
}
</script>

<style scoped lang="less">
.trade {
  padding: 20px 0;

  .page-title {
    font-size: 22px;
    color: #333;
    margin-bottom: 20px;
  }

  .section {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    margin-bottom: 15px;

    .section-title {
      font-size: 16px;
      color: #333;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #f0f0f0;
    }
  }

  .address-list {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;

    .address-item {
      width: 280px;
      padding: 15px;
      border: 2px solid #f0f0f0;
      border-radius: 4px;
      cursor: pointer;
      position: relative;
      transition: all 0.2s;

      &.active {
        border-color: #e1251b;
      }

      &:hover {
        border-color: #e1251b;
      }

      .addr-name {
        font-size: 14px;
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
      }

      .addr-detail {
        font-size: 13px;
        color: #666;
      }

      .addr-default {
        position: absolute;
        top: 0;
        right: 0;
        background: #e1251b;
        color: #fff;
        font-size: 11px;
        padding: 2px 8px;
        border-radius: 0 4px 0 4px;
      }
    }
  }

  .goods-list {
    .goods-item {
      display: flex;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .goods-img {
        width: 80px;
        height: 80px;
        border-radius: 4px;
        overflow: hidden;
        margin-right: 15px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .goods-info {
        flex: 1;
        .goods-name {
          font-size: 14px;
          color: #333;
          margin-bottom: 5px;
        }
        .goods-attr {
          font-size: 12px;
          color: #999;
        }
      }

      .goods-price,
      .goods-qty,
      .goods-total {
        width: 100px;
        text-align: center;
        font-size: 14px;
        color: #333;
      }

      .goods-total {
        color: #e1251b;
        font-weight: bold;
      }
    }
  }

  .message-input {
    width: 100%;
    height: 80px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    resize: vertical;
    outline: none;

    &:focus {
      border-color: #e1251b;
    }
  }

  .settle-bar {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 30px;

    .settle-info {
      text-align: right;
      font-size: 14px;
      color: #666;

      em {
        color: #e1251b;
        font-style: normal;
        font-weight: bold;
      }

      .settle-total em {
        font-size: 22px;
      }
    }

    .btn-submit {
      width: 150px;
      height: 46px;
      background: #e1251b;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        background: #cc1f17;
      }
    }
  }
}
</style>
