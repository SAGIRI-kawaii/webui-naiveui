<script setup lang="ts">
import { getCurrentInstance, watch, ref, onMounted, Ref } from 'vue'

import { useTimeoutFn, useWindowSize } from '@vueuse/core'

import { TerminalTwotone, GroupTwotone, SettingsTwotone, CropSquareSharp } from '@vicons/material'
import { DashboardTwotone } from '@vicons/antd'

const { width } = useWindowSize()
const { proxy } = getCurrentInstance()!

const barWidth = ref('')
barWidth.value = proxy!.$sidebarWidth.value

const sidebar = ref() as Ref<HTMLDivElement>
const brandTitle = ref() as Ref<HTMLDivElement>

function toggleRoundSidebar() {
  proxy!.$roundedSidebar.value = !proxy!.$roundedSidebar.value
  if (proxy!.$roundedSidebar.value) sidebar.value.classList.add('rounded')
  else sidebar.value.classList.remove('rounded')
}

watch(width, () => {
  useTimeoutFn(() => {
    if (width.value <= 1280) proxy!.$sidebarCollapsed.value = true
    else if (proxy!.$sidebarCollapsed.value === true) proxy!.$sidebarCollapsed.value = false
  }, 10)
})

onMounted(() => {
  if (proxy!.$roundedSidebar.value) sidebar.value.classList.add('rounded')
  if (width.value <= 1280) proxy!.$sidebarCollapsed.value = true
})

watch(proxy!.$sidebarCollapsed, () => {
  if (proxy!.$sidebarCollapsed.value) {
    sidebar.value.classList.add('collapsed')
    if (proxy!.$roundedSidebar.value) barWidth.value = proxy!.$collapsedRoundedSidebarWidth.value
    else barWidth.value = proxy!.$collapsedSidebarWidth.value
    useTimeoutFn(() => {
      brandTitle.value.style.width = '0'
      // useTimeoutFn(() => (brandTitle.value.style.width = ''), 10)
    }, 300)
  } else {
    brandTitle.value.style.width = ''
    sidebar.value.classList.remove('collapsed')
    barWidth.value = proxy!.$sidebarWidth.value
  }
})
</script>

<template>
  <div ref="sidebar">
    <aside class="aside" :style="{ width: barWidth }">
      <div class="sidebar">
        <div class="brand">
          <img src="/vite.svg" class="brand__logo" alt="Vite logo" />
          <span ref="brandTitle" class="brand__title">Dashboard</span>
          <hr />
        </div>
        <section class="menu">
          <router-link v-slot="{ isActive }" to="/dashboard">
            <div class="menu-item" :class="isActive ? 'active' : ''">
              <span class="menu-item__icon">
                <dashboard-twotone />
              </span>
              <span class="menu-item__title">概览</span>
            </div>
          </router-link>
          <router-link v-slot="{ isActive }" to="/group">
            <div class="menu-item" :class="isActive ? 'active' : ''">
              <span class="menu-item__icon">
                <group-twotone />
              </span>
              <span class="menu-item__title">群组</span>
            </div>
          </router-link>
        </section>
        <div class="sidebar__btn">
          <span><settings-twotone /></span>
          <span @click="toggleRoundSidebar">
            <span><crop-square-sharp /></span>
          </span>
        </div>
      </div>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
.aside {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1;
  box-shadow: 1px 3px 10px rgba(0, 0, 0, 10%);
  transition: width 0.3s ease-in-out, box-shadow 0.2s ease-in-out;

  .rounded & {
    box-shadow: none;
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 15px 0 10px 0;
  background-color: var(--color-white);
  color: #555;
  overflow: hidden;
  transition: background-color 0.2s ease-in-out, height 0.2s ease-in-out, margin 0.2s ease-in-out,
    border-radius 0.3s ease-in-out, box-shadow 0.2s ease-in-out;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  .rounded & {
    height: calc(100% - 20px);
    margin: 10px;
    border-radius: 10px;
    box-shadow: 1px 3px 10px rgba(0, 0, 0, 10%);
  }

  html.dark & {
    background-color: #1a1a1a;
    color: #bbb;
  }
}

.brand {
  font-weight: bold;
  margin: 20px auto 0 auto;
  white-space: nowrap;
  padding: 0 10px;

  .brand__logo,
  .brand__title {
    display: inline-block;
    vertical-align: middle;
    transition: all 0.2s ease-in-out;
  }

  .brand__logo {
    width: 32px;
  }

  .brand__title {
    margin-left: 7px;
    overflow: hidden;
  }

  .collapsed & .brand__logo {
    margin-left: 9px;
  }

  .collapsed & .brand__title {
    opacity: 0;
    // width: 0;
  }

  hr {
    margin: 20px auto;
    border: none;
    height: 1px;
    background-image: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.4), transparent);
    opacity: 0.25;
  }
}

.menu {
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
  padding: 0 10px;

  a {
    text-decoration: none;
  }
}

.menu-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 10px auto;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  height: 50px;
  min-width: 50px;
  border-radius: 10px;

  .menu-item__icon,
  .menu-item__title {
    display: inline-block;
    vertical-align: middle;
    transition: all 0.1s ease-in-out;
  }

  &.active,
  &:hover {
    color: var(--color-white);
    background-color: var(--color-primary);
    box-shadow: 1px 3px 10px rgba(64, 158, 255, 0.3);
  }

  .menu-item__icon {
    margin-left: 18px;
    svg {
      width: 24px;
      vertical-align: middle;
    }
  }

  .menu-item__title {
    margin-left: 10px;
    overflow: hidden;
  }

  .collapsed & .menu-item__icon {
    margin-left: 13px;
  }

  .collapsed & .menu-item__title {
    opacity: 0;
  }
}

.sidebar__btn {
  height: 30px;
  overflow: hidden;
  padding: 0 10px;

  svg {
    height: 30px;
    margin-right: 8px;
    transition: transform 0.5s cubic-bezier(0.5, -1, 0.5, 2), opacity 0.3s ease-in-out;

    &:hover {
      transform: rotate(90deg);
    }

    .collapsed & {
      opacity: 0;
    }
  }
}
</style>
