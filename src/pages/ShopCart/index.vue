<template>
  <div class="shop-cart">
    <div class="container">
      <h2 class="page-title">我的购物车</h2>

      <div class="cart-content" v-if="cartList.length">
        <div class="cart-header">
          <div class="col-check">
            <input type="checkbox" v-model="allChecked" @change="toggleAll" />
          </div>
          <div class="col-product">商品</div>
          <div class="col-price">单价</div>
          <div class="col-quantity">数量</div>
          <div class="col-total">小计</div>
          <div class="col-action">操作</div>
        </div>

        <div class="cart-item" v-for="item in cartList" :key="item.id">
          <div class="col-check">
            <input type="checkbox" v-model="item.checked" />
          </div>
          <div class="col-product">
            <div class="product-img">
              <img :src="item.imgUrl" :alt="item.name" />
            </div>
            <div class="product-name">{{ item.name }}</div>
          </div>
          <div class="col-price">
            <span class="price">¥{{ item.price }}</span>
          </div>
          <div class="col-quantity">
            <div class="qty-control">
              <button @click="changeQuantity(item, -1)">-</button>
              <input type="number" v-model.number="item.quantity" min="1" />
              <button @click="changeQuantity(item, 1)">+</button>
            </div>
          </div>
          <div class="col-total">
            <span class="total-price">¥{{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
          <div class="col-action">
            <a href="javascript:;" @click="removeItem(item)">删除</a>
          </div>
        </div>

        <div class="cart-footer">
          <div class="footer-left">
            <label>
              <input type="checkbox" v-model="allChecked" @change="toggleAll" />
              全选
            </label>
            <a href="javascript:;" @click="removeChecked">删除选中</a>
          </div>
          <div class="footer-right">
            <span>已选 <em>{{ checkedCount }}</em> 件</span>
            <span class="total">总计：<em>¥{{ totalPrice }}</em></span>
            <button class="btn-settle" @click="settle">去结算</button>
          </div>
        </div>
      </div>

      <div class="empty-cart" v-else>
        <p>🛒 购物车空空如也~</p>
        <router-link to="/home" class="go-shopping">去购物</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopCart',
  data() {
    return {
      cartList: [
        { id: 1, name: '示例商品 - Apple iPhone 15 Pro Max', price: 9999, quantity: 1, checked: true, imgUrl: 'https://picsum.photos/80/80?random=60' },
        { id: 2, name: '示例商品 - Huawei Mate 60 Pro', price: 6999, quantity: 2, checked: false, imgUrl: 'https://picsum.photos/80/80?random=61' }
      ]
    }
  },
  computed: {
    allChecked: {
      get() {
        return this.cartList.length > 0 && this.cartList.every(item => item.checked)
      },
      set() {}
    },
    checkedCount() {
      return this.cartList.filter(item => item.checked).reduce((sum, item) => sum + item.quantity, 0)
    },
    totalPrice() {
      return this.cartList
        .filter(item => item.checked)
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2)
    }
  },
  methods: {
    toggleAll() {
      const newVal = !this.cartList.every(item => item.checked)
      this.cartList.forEach(item => { item.checked = newVal })
    },
    changeQuantity(item, num) {
      item.quantity = Math.max(1, item.quantity + num)
    },
    removeItem(item) {
      this.cartList = this.cartList.filter(i => i.id !== item.id)
    },
    removeChecked() {
      this.cartList = this.cartList.filter(item => !item.checked)
    },
    settle() {
      if (this.checkedCount === 0) {
        alert('请选择商品')
        return
      }
      this.$router.push('/trade')
    }
  }
}
</script>

<style scoped lang="less">
.shop-cart {
  padding: 20px 0;

  .page-title {
    font-size: 22px;
    color: #333;
    margin-bottom: 20px;
  }

  .cart-content {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  }

  .cart-header,
  .cart-item {
    display: flex;
    align-items: center;
    padding: 15px 20px;

    .col-check { width: 40px; }
    .col-product { flex: 1; display: flex; align-items: center; gap: 15px; }
    .col-price { width: 120px; text-align: center; }
    .col-quantity { width: 140px; text-align: center; }
    .col-total { width: 120px; text-align: center; }
    .col-action { width: 80px; text-align: center; }
  }

  .cart-header {
    background: #f5f5f5;
    font-size: 13px;
    color: #999;
    border-bottom: 1px solid #eee;
  }

  .cart-item {
    border-bottom: 1px solid #f0f0f0;

    .product-img {
      width: 80px;
      height: 80px;
      border: 1px solid #f0f0f0;
      border-radius: 4px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .product-name {
      font-size: 14px;
      color: #333;
    }

    .price {
      color: #e1251b;
      font-weight: bold;
    }

    .qty-control {
      display: inline-flex;
      button {
        width: 28px;
        height: 28px;
        border: 1px solid #ddd;
        background: #f5f5f5;
        cursor: pointer;
      }
      input {
        width: 50px;
        height: 28px;
        text-align: center;
        border: 1px solid #ddd;
        border-left: none;
        border-right: none;
        -moz-appearance: textfield;
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }
      }
    }

    .total-price {
      color: #e1251b;
      font-weight: bold;
      font-size: 16px;
    }

    .col-action a {
      color: #666;
      font-size: 13px;
      &:hover { color: #e1251b; }
    }
  }

  .cart-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #f9f9f9;

    .footer-left {
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 13px;

      label {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
      }

      a {
        color: #666;
        &:hover { color: #e1251b; }
      }
    }

    .footer-right {
      display: flex;
      align-items: center;
      gap: 20px;

      em {
        color: #e1251b;
        font-style: normal;
        font-weight: bold;
      }

      .total em {
        font-size: 20px;
      }

      .btn-settle {
        width: 120px;
        height: 42px;
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

  .empty-cart {
    background: #fff;
    padding: 80px;
    text-align: center;
    border-radius: 4px;

    p {
      font-size: 18px;
      color: #999;
      margin-bottom: 20px;
    }

    .go-shopping {
      display: inline-block;
      padding: 10px 30px;
      background: #e1251b;
      color: #fff;
      border-radius: 4px;

      &:hover {
        background: #cc1f17;
        color: #fff;
      }
    }
  }
}
</style>
