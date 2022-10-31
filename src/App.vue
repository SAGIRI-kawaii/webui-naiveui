<script setup lang="ts">
import { zhCN, dateZhCN, darkTheme, GlobalThemeOverrides } from 'naive-ui'
import NaiveApi from '@/composables/NaiveApi.vue'
import { isDark } from '@/composables/index'

const themeOverrides: GlobalThemeOverrides = {
  // common: {
  //   primaryColor: 'var(--color-primary)',
  //   primaryColorHover: 'var(--color-primary-light-3)',
  //   primaryColorPressed: 'var(--color-primary-dark-2)',
  //   primaryColorSuppl: 'var(--color-primary-light-3)',
  // },
  // Button: {
  //   colorDisabledPrimary: 'var(--color-primary-light-5)',
  // },
}
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="isDark ? darkTheme : undefined"
    :theme-overrides="themeOverrides"
  >
    <n-loading-bar-provider
      :loading-bar-style="{
        loading: 'background-color: var(--color-primary)',
      }"
    >
      <n-dialog-provider>
        <n-message-provider placement="top">
          <n-notification-provider :max="3">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in" appear>
                <component :is="Component" />
              </transition>
            </router-view>
            <naive-api />
          </n-notification-provider>
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style>
.n-config-provider {
  height: 100%;
}
</style>
