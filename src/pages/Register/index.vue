<template>
  <div class="register-page">
    <div class="register-header">
      <div class="container register-header-inner">
        <router-link to="/home" class="logo">
          <span class="logo-text">尚品汇</span>
        </router-link>
        <span class="page-desc">注册</span>
      </div>
    </div>

    <div class="register-content">
      <div class="register-box">
        <h3 class="register-title">注册新用户</h3>

        <div class="register-form">
          <div class="form-item">
            <label class="form-label">手机号</label>
            <input type="text" v-model="phone" placeholder="请输入手机号" class="form-input" />
          </div>
          <div class="form-item">
            <label class="form-label">验证码</label>
            <div class="code-group">
              <input type="text" v-model="code" placeholder="请输入验证码" class="form-input code-input" />
              <button class="code-btn" @click="getCode" :disabled="countdown > 0">
                {{ countdown > 0 ? `${countdown}s后重发` : '获取验证码' }}
              </button>
            </div>
          </div>
          <div class="form-item">
            <label class="form-label">密码</label>
            <input type="password" v-model="password" placeholder="请输入密码" class="form-input" />
          </div>
          <div class="form-item">
            <label class="form-label">确认密码</label>
            <input type="password" v-model="confirmPassword" placeholder="请确认密码" class="form-input" />
          </div>
          <div class="form-item agree">
            <label>
              <input type="checkbox" v-model="agree" />
              <span>同意并接受《用户服务协议》</span>
            </label>
          </div>
          <button class="register-btn" @click="handleRegister">完成注册</button>
          <div class="register-extra">
            <span>已有账号？</span>
            <router-link to="/login" class="login-link">立即登录</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="register-footer">
      <p>© 尚品汇电商平台 版权所有</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      phone: '',
      code: '',
      password: '',
      confirmPassword: '',
      agree: true,
      countdown: 0,
      timer: null
    }
  },
  methods: {
    getCode() {
      if (!this.phone) {
        alert('请输入手机号')
        return
      }
      this.countdown = 60
      const timerId = setInterval(() => {
        this.countdown--
        if (this.countdown <= 0) {
          clearInterval(timerId)
          this.timer = null
        }
      }, 1000)
      this.timer = timerId
    },
    handleRegister() {
      if (!this.phone) {
        alert('请输入手机号')
        return
      }
      if (!this.code) {
        alert('请输入验证码')
        return
      }
      if (!this.password) {
        alert('请输入密码')
        return
      }
      if (this.password !== this.confirmPassword) {
        alert('两次密码不一致')
        return
      }
      if (!this.agree) {
        alert('请同意用户协议')
        return
      }
      alert('注册功能需要后端API支持')
      this.$router.push('/login')
    }
  },
  beforeUnmount() {
    if (this.timer) clearInterval(this.timer)
  }
}
</script>

<style scoped lang="less">
.register-page {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.register-header {
  height: 80px;
  background: #fff;
  border-bottom: 2px solid #e1251b;

  .register-header-inner {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .logo .logo-text {
    font-size: 32px;
    font-weight: bold;
    color: #e1251b;
  }

  .page-desc {
    font-size: 22px;
    color: #666;
    margin-left: 30px;
    padding-left: 30px;
    border-left: 2px solid #ddd;
  }
}

.register-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;

  .register-box {
    width: 480px;
    background: #fff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

    .register-title {
      text-align: center;
      font-size: 22px;
      color: #333;
      margin-bottom: 30px;
    }

    .form-item {
      margin-bottom: 20px;

      .form-label {
        display: block;
        font-size: 14px;
        color: #333;
        margin-bottom: 8px;
      }

      .form-input {
        width: 100%;
        height: 40px;
        padding: 0 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s;

        &:focus {
          border-color: #e1251b;
        }
      }

      .code-group {
        display: flex;
        gap: 10px;

        .code-input {
          flex: 1;
        }

        .code-btn {
          width: 120px;
          height: 40px;
          background: #e1251b;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 13px;
          cursor: pointer;

          &:hover:not(:disabled) {
            background: #cc1f17;
          }

          &:disabled {
            background: #ccc;
            cursor: not-allowed;
          }
        }
      }

      &.agree {
        label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: #666;
          cursor: pointer;
        }
      }
    }

    .register-btn {
      width: 100%;
      height: 44px;
      background: #e1251b;
      color: #fff;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: #cc1f17;
      }
    }

    .register-extra {
      text-align: center;
      margin-top: 20px;
      font-size: 13px;
      color: #999;

      .login-link {
        color: #e1251b;
        margin-left: 5px;
      }
    }
  }
}

.register-footer {
  padding: 20px 0;
  text-align: center;
  color: #999;
  font-size: 12px;
}
</style>
