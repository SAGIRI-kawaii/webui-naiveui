import { createApp, ref } from 'vue'

import '@/styles/index.scss'

import App from './App.vue'

import router from '@/router'

import Common from '@/lib/common'
import Requests from '@/lib/requests'

const app = createApp(App)
app.use(router)

app.config.globalProperties.$roundedSidebar = ref(false)
app.config.globalProperties.$sidebarCollapsed = ref(false)
app.config.globalProperties.$sidebarWidth = ref('270px')
app.config.globalProperties.$collapsedSidebarWidth = ref('70px')
app.config.globalProperties.$collapsedRoundedSidebarWidth = ref('90px')
app.config.globalProperties.$lib = {
  common: new Common(),
  requests: new Requests(),
}

app.mount('#app')

export default app
