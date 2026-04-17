<template>
  <div class="my-order">
    <h3 class="section-title">我的订单</h3>

    <div class="order-tabs">
      <span
        v-for="tab in tabs"
        :key="tab.value"
        :class="{ active: activeTab === tab.value }"
        @click="activeTab = tab.value"
      >{{ tab.label }}</span>
    </div>

    <div class="order-list" v-if="orderList.length">
      <div class="order-item" v-for="order in orderList" :key="order.id">
        <div class="order-header">
          <span class="order-time">{{ order.createTime }}</span>
          <span class="order-no">订单号：{{ order.orderNo }}</span>
          <span class="order-status" :class="order.statusClass">{{ order.statusText }}</span>
        </div>
        <div class="order-body">
          <div class="order-goods" v-for="goods in order.goodsList" :key="goods.id">
            <div class="goods-img">
              <img :src="goods.imgUrl" alt="" />
            </div>
            <div class="goods-name">{{ goods.name }}</div>
            <div class="goods-price">¥{{ goods.price }}</div>
            <div class="goods-qty">x{{ goods.quantity }}</div>
          </div>
        </div>
        <div class="order-footer">
          <span class="order-total">
            共 {{ order.totalCount }} 件商品，总计：
            <em>¥{{ order.totalAmount }}</em>
          </span>
          <div class="order-actions">
            <button v-if="order.status === 0" class="btn-pay">去付款</button>
            <button v-if="order.status === 1" class="btn-confirm">确认收货</button>
            <button class="btn-detail">查看详情</button>
          </div>
        </div>
      </div>
    </div>

    <div class="empty-order" v-else>
      <p>暂无订单</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyOrder',
  data() {
    return {
      activeTab: 'all',
      tabs: [
        { label: '全部订单', value: 'all' },
        { label: '待付款', value: 'unpaid' },
        { label: '待发货', value: 'unshipped' },
        { label: '已发货', value: 'shipped' },
        { label: '已完成', value: 'completed' }
      ],
      orderList: [
        {
          id: 1,
          orderNo: 'SPH20240101001',
          createTime: '2024-01-01 10:30:00',
          status: 2,
          statusText: '已发货',
          statusClass: 'shipped',
          totalCount: 2,
          totalAmount: '11898.00',
          goodsList: [
            { id: 1, name: 'Apple iPhone 15 Pro Max 256GB', price: 9999, quantity: 1, imgUrl: 'https://picsum.photos/60/60?random=80' },
            { id: 2, name: 'AirPods Pro 2', price: 1899, quantity: 1, imgUrl: 'https://picsum.photos/60/60?random=81' }
          ]
        },
        {
          id: 2,
          orderNo: 'SPH20240102002',
          createTime: '2024-01-02 15:20:00',
          status: 3,
          statusText: '已完成',
          statusClass: 'completed',
          totalCount: 1,
          totalAmount: '6999.00',
          goodsList: [
            { id: 3, name: 'Huawei Mate 60 Pro 512GB', price: 6999, quantity: 1, imgUrl: 'https://picsum.photos/60/60?random=82' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
.my-order {
  .section-title {
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
  }

  .order-tabs {
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
    border-bottom: 2px solid #e1251b;

    span {
      padding: 10px 20px;
      font-size: 14px;
      color: #666;
      cursor: pointer;
      transition: all 0.2s;

      &.active {
        background: #e1251b;
        color: #fff;
      }

      &:hover:not(.active) {
        color: #e1251b;
      }
    }
  }

  .order-item {
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    margin-bottom: 15px;
    overflow: hidden;

    .order-header {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 12px 15px;
      background: #f9f9f9;
      font-size: 13px;
      color: #999;

      .order-status {
        margin-left: auto;
        padding: 2px 10px;
        border-radius: 3px;
        font-size: 12px;

        &.shipped {
          background: #e6f7ff;
          color: #1890ff;
        }
        &.completed {
          background: #f6ffed;
          color: #52c41a;
        }
        &.unpaid {
          background: #fff7e6;
          color: #faad14;
        }
      }
    }

    .order-body {
      padding: 15px;

      .order-goods {
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #f5f5f5;

        &:last-child {
          border-bottom: none;
        }

        .goods-img {
          width: 60px;
          height: 60px;
          border-radius: 4px;
          overflow: hidden;
          margin-right: 15px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .goods-name {
          flex: 1;
          font-size: 14px;
          color: #333;
        }

        .goods-price,
        .goods-qty {
          width: 100px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
      }
    }

    .order-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 15px;
      background: #fafafa;

      .order-total {
        font-size: 14px;
        color: #666;

        em {
          color: #e1251b;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
        }
      }

      .order-actions {
        display: flex;
        gap: 10px;

        button {
          padding: 6px 18px;
          border-radius: 4px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-pay {
          background: #e1251b;
          color: #fff;
          border: 1px solid #e1251b;
          &:hover { background: #cc1f17; }
        }

        .btn-confirm {
          background: #52c41a;
          color: #fff;
          border: 1px solid #52c41a;
          &:hover { background: #45a016; }
        }

        .btn-detail {
          background: #fff;
          color: #666;
          border: 1px solid #ddd;
          &:hover { border-color: #e1251b; color: #e1251b; }
        }
      }
    }
  }

  .empty-order {
    text-align: center;
    padding: 60px 0;
    color: #999;
    font-size: 16px;
  }
}
</style>
