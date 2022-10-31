<script setup lang="ts">
import { getCurrentInstance, watch, ref } from 'vue'

import SideBar from '@/components/SideBar.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import FooterBar from '@/components/FooterBar.vue'

const { proxy } = getCurrentInstance()!

const width = ref('')
width.value = proxy!.$sidebarWidth.value

watch(proxy!.$sidebarCollapsed, () => {
  if (proxy!.$sidebarCollapsed.value) {
    if (proxy!.$roundedSidebar.value) width.value = proxy!.$collapsedRoundedSidebarWidth.value
    else width.value = proxy!.$collapsedSidebarWidth.value
  } else width.value = proxy!.$sidebarWidth.value
})
</script>

<template>
  <div class="layout">
    <side-bar />
    <n-scrollbar>
      <section
        class="container"
        :style="{
          marginLeft: width,
          width: `calc(100% - ${width})`,
        }"
      >
        <header>
          <navigation-bar />
        </header>
        <main>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in" appear>
              <component :is="Component" />
            </transition>
          </router-view>
        </main>
        <footer>
          <FooterBar />
        </footer>
      </section>
    </n-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 100%;
}

header {
  margin: 10px 20px;
  padding: 16px;
  width: unset;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
  transition: width 0.3s ease-in-out, margin-left 0.3s ease-in-out;
}

main {
  margin: 0 20px;
  flex: 1;
  flex-shrink: 0;
}

:deep(.n-scrollbar-container),
:deep(.n-scrollbar-content) {
  min-height: 100%;
}
</style>
