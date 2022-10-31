<script lang="ts" setup>
import type { DefineComponent } from 'vue'
import { User } from '@vicons/fa'

const activities: {
  color?: string
  content: string
  lineType?: 'default' | 'dashed'
  time: string
  title?: string
  type?: 'default' | 'error' | 'info' | 'success' | 'warning'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  icon?: DefineComponent<{}, {}, any>
}[] = [
  {
    content: '我超，原？！',
    time: '2018-04-03 20:46',
    color: '#0bbd87',
  },
  {
    content: 'A60 嘿嘿嘿！',
    time: '2018-04-12 20:46',
    type: 'default',
    icon: User,
  },
  {
    content: '我超，原？！',
    time: '2018-04-03 20:46',
    color: '#0bbd87',
  },
  {
    content: '已与 23456789 成为好友',
    time: '2018-04-03 20:46',
  },
  {
    content: '加入群 123456789',
    time: '2018-04-03 20:46',
    type: 'default',
  },
  {
    content: '已启动',
    time: '2018-04-03 20:46',
  },
]
</script>

<template>
  <n-scrollbar>
    <n-timeline style="padding-left: 20px">
      <n-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        center
        :color="activity.color"
        :content="activity.content"
        :line-type="activity.lineType"
        :time="activity.time"
        :title="activity.title"
        :type="activity.type"
      >
        <template v-if="activity.icon" #icon>
          <n-icon>
            <component :is="activity.icon" />
          </n-icon>
        </template>
      </n-timeline-item>
    </n-timeline>
  </n-scrollbar>
</template>
