<template>
  <div class="login-container" style="overflow: hidden">
    <div class="login-box">
      <div class="dark-toogler" @click="toggleDark()">
        <span :style="{ display: isDark ? 'inline-block' : 'none' }">
          <BrightnessHighTwotone />
        </span>
        <span :style="{ display: isDark ? 'none' : 'inline-block' }"><Brightness2Twotone /></span>
      </div>
      <div class="login-box__input-area">
        <h1 class="title">Login</h1>
        <div ref="user" class="input-group">
          <n-icon v-model:color="iconColor.user" class="input-icon user"><User /></n-icon>
          <input
            v-model="form.username"
            type="text"
            placeholder="帐号"
            class="input user"
            @focus="onUserFocus"
            @blur="onUserBlur"
          />
        </div>
        <div ref="pwd" class="input-group">
          <n-icon v-model:color="iconColor.pwd" class="input-icon pwd"><Lock /></n-icon>
          <input
            v-model="form.password"
            type="password"
            placeholder="密码"
            class="input pwd"
            @focus="onPwdFocus"
            @blur="onPwdBlur"
            @keyup.enter="onLogin"
          />
        </div>
        <button class="login-btn" @click="onLogin">登录</button>

        <span style="color: #5c5c5c; font-size: 0.85em">没有帐号？不能注册噢~</span>
        <button @click="$router.push('/')">直接进入</button>
      </div>
      <div class="login-box__pic"></div>
    </div>
    <p class="icp">{{ icp }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNotification } from 'naive-ui'

import { User, Lock } from '@vicons/fa'
import { BrightnessHighTwotone, Brightness2Twotone } from '@vicons/material'

import { isDark, toggleDark } from '@/composables'

export default defineComponent({
  components: {
    User,
    Lock,
    BrightnessHighTwotone,
    Brightness2Twotone,
  },
  setup() {
    const notification = useNotification()

    return {
      isDark,
      toggleDark,
      notification,
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     const jwt = JSON.parse(atob(token.split('.')[1]))
  //     if (jwt.exp * 1000 > Date.now()) {
  //       ElNotification.info('你已经登录过了，不用重复登录，正在跳转……')
  //       const redirect = from.query.redirect //如果来源路由有query
  //       if (!redirect || to.path === redirect) {
  //         next({ path: '/' })
  //       } else {
  //         next({ path: redirect.toString() }) //跳转到目的路由
  //       }
  //      } else {
  //       localStorage.removeItem('token')
  //       next()
  //     }
  //     return
  //   }
  //   next()
  // },
  data() {
    return {
      iconColor: {
        user: '#ccc',
        pwd: '#ccc',
      },
      form: {
        username: '',
        password: '',
      },
      icp: '沪ICP备13002172号-3',
    }
  },
  methods: {
    onUserFocus() {
      this.iconColor.user = '#888'
    },
    onUserBlur() {
      this.iconColor.user = '#ccc'
    },
    onPwdFocus() {
      this.iconColor.pwd = '#888'
    },
    onPwdBlur() {
      this.iconColor.pwd = '#ccc'
    },
    onLogin() {
      if (this.form.username.length === 0) {
        this.notification.error({
          title: '错误',
          content: '用户名不能为空',
        })
        return
      }
      if (this.form.password.length === 0) {
        this.notification.error({
          title: '错误',
          content: '密码不能为空',
        })
        return
      }

      this.$lib.requests.post({
        url: 'http://127.0.0.1:8000/login',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: this.form,
        sendSuccessMessage: true,
        success: () => {
          this.$router.push('/')
        },
        error: () => {
          this.onUserBlur()
          this.onPwdBlur()
        },
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg-color-page);
  background-image: repeating-linear-gradient(
    -45deg,
    hsla(0, 0%, 90%, 0.3),
    hsla(0, 0%, 90%, 0.3) 10px,
    transparent 0,
    transparent 13px
  );

  html.dark & {
    background-image: repeating-linear-gradient(
      -45deg,
      hsla(0, 0%, 10%, 0.3),
      hsla(0, 0%, 10%, 0.3) 10px,
      transparent 0,
      transparent 13px
    );
  }
}

.login-box {
  position: relative;
  width: 900px;
  height: 500px;
  background: var(--bg-color-overlay);
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-image: url('@/assets/login-bg.jpg');
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-clip: border-box;
  text-shadow: 1px 3px 6px rgba(0, 0, 0, 0.15);

  .dark-toogler {
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 1;

    svg {
      height: 18px;
      color: var(--text-color-regular);
    }
  }

  html.dark & {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url('@/assets/login-bg.jpg');

    .login-box__input-area {
      background-color: rgba(30, 30, 30, 90%);
    }
  }

  .login-box__input-area {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 90%);
    backdrop-filter: blur(5px);

    .input-group {
      width: 290px;
      display: flex;
      justify-content: center;

      .n-icon {
        top: 50%;
        transform: translateY(-50%);
      }

      .input {
        margin: 15px auto;
        height: 30px;
        width: 260px;
        text-indent: 3px;
        background: none;
        border: none;
        border-bottom: solid 1px var(--text-color-disabled);
        outline: none;
        transition: all 0.2s;

        & {
          background: no-repeat;
          background-position: 8px center;
          background-size: 5%;
        }

        &::placeholder {
          color: var(--text-color-secondary);
        }

        &:hover {
          border-bottom: solid 1px var(--text-color-placeholder);
        }

        &:focus {
          border-bottom: solid 1px var(--text-color-regular);
        }
      }

      .input-icon {
        transition: all 0.2s;
      }
    }
  }
  .login-btn {
    margin: 30px auto 45px auto;
    height: 40px;
    width: 290px;
    border: none;
    border-radius: 6px;
    color: var(--color-white);
    text-shadow: 0px 0px 10px #55555555;
    text-indent: 8px;
    letter-spacing: 8px;
    cursor: pointer;
    box-shadow: 1px 3px 10px rgba(64, 158, 255, 0.3);
    background-color: var(--color-primary);
    opacity: 0.8;
    transition: opacity 0.2s;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover,
    &:focus {
      opacity: 1;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
.icp {
  position: absolute;
  bottom: 0px;
  font-size: 0.6rem;
  color: var(--text-color-secondary);
}
</style>
