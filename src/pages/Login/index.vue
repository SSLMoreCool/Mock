<template>
  <div class="login-page">
    <div class="login-header">
      <div class="container login-header-inner">
        <router-link to="/home" class="logo">
          <span class="logo-text">尚品汇</span>
        </router-link>
        <span class="page-desc">欢迎登录</span>
      </div>
    </div>

    <div class="login-content">
      <div class="login-box">
        <h3 class="login-title">账户登录</h3>

        <div class="login-form">
          <div class="form-item">
            <span class="form-icon">📱</span>
            <input
              type="text"
              v-model="phone"
              placeholder="请输入手机号"
              class="form-input"
            />
          </div>
          <div class="form-item">
            <span class="form-icon">🔒</span>
            <input
              type="password"
              v-model="password"
              placeholder="请输入密码"
              class="form-input"
              @keyup.enter="handleLogin"
            />
          </div>
          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe" />
              <span>自动登录</span>
            </label>
            <a href="javascript:;" class="forget-pwd">忘记密码</a>
          </div>
          <button class="login-btn" @click="handleLogin">登&nbsp;&nbsp;&nbsp;录</button>
          <div class="login-extra">
            <span>还没有账号？</span>
            <router-link to="/register" class="register-link">立即注册</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="login-footer">
      <p>© 尚品汇电商平台 版权所有</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      phone: '',
      password: '',
      rememberMe: false
    }
  },
  methods: {
    async handleLogin() {
      if (!this.phone) {
        alert('请输入手机号')
        return
      }
      if (!this.password) {
        alert('请输入密码')
        return
      }
      // 模拟登录
      alert('登录功能需要后端API支持')
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped lang="less">
.login-page {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.login-header {
  height: 80px;
  background: #fff;
  border-bottom: 2px solid #e1251b;

  .login-header-inner {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .logo {
    .logo-text {
      font-size: 32px;
      font-weight: bold;
      color: #e1251b;
    }
  }

  .page-desc {
    font-size: 22px;
    color: #666;
    margin-left: 30px;
    padding-left: 30px;
    border-left: 2px solid #ddd;
  }
}

.login-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0;

  .login-box {
    width: 400px;
    background: #fff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

    .login-title {
      text-align: center;
      font-size: 22px;
      color: #333;
      margin-bottom: 30px;
    }

    .form-item {
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 20px;
      overflow: hidden;
      transition: border-color 0.2s;

      &:focus-within {
        border-color: #e1251b;
      }

      .form-icon {
        width: 40px;
        text-align: center;
        font-size: 18px;
        color: #999;
      }

      .form-input {
        flex: 1;
        height: 44px;
        padding: 0 10px;
        font-size: 14px;
        border: none;
        outline: none;
      }
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;

      .remember-me {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 13px;
        color: #666;
        cursor: pointer;
      }

      .forget-pwd {
        font-size: 13px;
        color: #999;
        &:hover {
          color: #e1251b;
        }
      }
    }

    .login-btn {
      width: 100%;
      height: 44px;
      background: #e1251b;
      color: #fff;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: #cc1f17;
      }
    }

    .login-extra {
      text-align: center;
      margin-top: 20px;
      font-size: 13px;
      color: #999;

      .register-link {
        color: #e1251b;
        margin-left: 5px;
      }
    }
  }
}

.login-footer {
  padding: 20px 0;
  text-align: center;
  color: #999;
  font-size: 12px;
}
</style>
