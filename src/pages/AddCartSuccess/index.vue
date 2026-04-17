<template>
  <div class="add-cart-success">
    <div class="container">
      <div class="success-box">
        <div class="success-icon">✅</div>
        <div class="success-info">
          <h3>商品已成功加入购物车！</h3>
          <p>商品数量：{{ $route.query.skuNum || 1 }}</p>
        </div>
        <div class="success-actions">
          <button class="btn-view-cart" @click="$router.push('/shopcart')">
            查看购物车
          </button>
          <button class="btn-continue" @click="$router.go(-1)">
            继续购物
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddCartSuccess'
}
</script>

<style scoped lang="less">
.add-cart-success {
  padding: 60px 0;

  .success-box {
    background: #fff;
    padding: 50px;
    border-radius: 8px;
    text-align: center;

    .success-icon {
      font-size: 60px;
      margin-bottom: 20px;
    }

    .success-info {
      margin-bottom: 30px;

      h3 {
        font-size: 20px;
        color: #333;
        margin-bottom: 10px;
      }

      p {
        color: #999;
        font-size: 14px;
      }
    }

    .success-actions {
      display: flex;
      justify-content: center;
      gap: 20px;

      button {
        width: 160px;
        height: 44px;
        font-size: 14px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .btn-view-cart {
        background: #e1251b;
        color: #fff;
        border: 2px solid #e1251b;

        &:hover {
          background: #cc1f17;
        }
      }

      .btn-continue {
        background: #fff;
        color: #333;
        border: 2px solid #ddd;

        &:hover {
          border-color: #e1251b;
          color: #e1251b;
        }
      }
    }
  }
}
</style>
