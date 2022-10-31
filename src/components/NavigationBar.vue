<script setup lang="ts">
import { getCurrentInstance, ref, Ref, watch, h } from 'vue'
import { useRoute } from 'vue-router'

import { isDark, toggleDark } from '@/composables'

import { BrightnessHighTwotone, Brightness2Twotone } from '@vicons/material'
import { Github, UserAlt } from '@vicons/fa'

const { proxy } = getCurrentInstance()!

const sidebarCollapsed: Ref<boolean> = proxy!.$sidebarCollapsed

// const menuBtnMobile = ref()
const menuBtn = ref()

watch(sidebarCollapsed, () => {
  if (sidebarCollapsed.value) {
    menuBtn.value.classList.add('collapsed')
    // menuBtnMobile.value.classList.remove('collapsed')
  } else {
    menuBtn.value.classList.remove('collapsed')
    // menuBtnMobile.value.classList.add('collapsed')
  }
})

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const route = useRoute()
</script>

<template>
  <nav class="nav">
    <div class="nav-items" style="flex: 1">
      <div ref="menuBtn" class="menu-btn" @click="toggleSidebar">
        <span></span>
        <span></span>
      </div>
      <!-- <div class="menu-btn-mobile collapsed" ref="menuBtnMobile" @click="toggleSidebar">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div> -->
      <div style="display: flex; flex-direction: column; justify-content: center">
        <n-breadcrumb separator="/">
          <n-breadcrumb-item v-for="(item, index) in route.matched" :key="index" :href="item.path"
            >{{ item.name }}
          </n-breadcrumb-item>
        </n-breadcrumb>
        <div class="title">{{ route.name }}</div>
      </div>
    </div>
    <div class="nav-items">
      <div class="nav-item">
        <router-link to="/login">
          <n-avatar
            class="avatar"
            :src="`http://q1.qlogo.cn/g?b=qq&nk=2948531755&s=40`"
            :size="35"
            round
          />
          <span class="user-id">2948531755</span>
        </router-link>
      </div>
      <div class="nav-item" @click="toggleDark()">
        <span :style="{ display: isDark ? 'inline-block' : 'none' }">
          <BrightnessHighTwotone />
        </span>
        <span :style="{ display: isDark ? 'none' : 'inline-block' }"><Brightness2Twotone /></span>
      </div>
      <div class="nav-item">
        <a href="https://github.com/Redlnn" target="_blank"><Github /></a>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  height: 46px;
  flex: 1;
  display: flex;
  align-items: center;
}

.nav-items {
  display: flex;
  align-items: center;

  svg {
    height: 20px;
  }

  .nav-item {
    margin: 0 7px;
    white-space: nowrap;

    * {
      vertical-align: middle;
    }
    a {
      text-decoration: none;
    }
  }

  .user-id {
    margin-left: 5px;
    font-size: 14px;
    color: var(--text-color-regular);
  }
}

.menu-btn,
.menu-btn-mobile {
  position: relative;
  width: 23px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  margin-right: 20px;

  span {
    position: absolute;
    display: block;
    height: 4px;
    width: 100%;
    border-radius: 4px;
    background-color: var(--text-color-primary);
    opacity: 1;
    transition: all 0.31s ease-in-out;
  }
}

.menu-btn {
  span {
    width: 60%;
  }
  span:nth-child(1) {
    top: 4.25px;
    transform: rotate(-45deg);
  }
  span:nth-child(2) {
    bottom: 4.25px;
    transform: rotate(45deg);
  }
  &.collapsed span:nth-child(1) {
    transform: rotate(45deg);
  }
  &.collapsed span:nth-child(2) {
    transform: rotate(-45deg);
  }
}

.menu-btn-mobile {
  span:nth-child(1) {
    top: 0;
  }

  span:nth-child(4) {
    bottom: 0;
  }

  &.collapsed span:nth-child(1) {
    top: 18px;
    width: 0;
  }

  &.collapsed span:nth-child(2) {
    transform: rotate(45deg);
  }

  &.collapsed span:nth-child(3) {
    transform: rotate(-45deg);
  }

  &.collapsed span:nth-child(4) {
    bottom: 18px;
    width: 0;
  }
}

.avatar {
  border: solid 1.5px var(--color-primary);
}

.title {
  font-size: 14px;
  font-weight: bold;
  padding-left: 4px;
}
</style>
