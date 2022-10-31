import type { Ref } from 'vue'
import type Common from '@/lib/common'
import type Requests from '@/lib/requests'

import type { LoadingBarApiInjection } from 'naive-ui/es/loading-bar/src/LoadingBarProvider'
import type { DialogApiInjection } from 'naive-ui/es/dialog/src/DialogProvider'
import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
import type { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider'

declare module 'vue' {
  export interface ComponentCustomProperties {
    $roundedSidebar: Ref<boolean>
    $sidebarCollapsed: Ref<boolean>
    $sidebarWidth: Ref<string>
    $collapsedSidebarWidth: Ref<string>
    $collapsedRoundedSidebarWidth: Ref<string>
    $lib: {
      common: Common
      requests: Requests
    }
  }
}

declare global {
  interface Window {
    $axiosRequestsList: Array<AbortController>
    $loadingBar: LoadingBarApiInjection
    $dialog: DialogApiInjection
    $message: MessageApiInjection
    $notify: NotificationApiInjection
  }
}

export {}
