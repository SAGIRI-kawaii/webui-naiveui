<script lang="ts" setup>
import { useLoadingBar, useDialog, useMessage, useNotification } from 'naive-ui'

function registerGlobalComponents() {
  window.$loadingBar = useLoadingBar()
  window.$dialog = useDialog()
  window.$message = useMessage()
  window.$notify = useNotification()
}

registerGlobalComponents()
/* eslint-disable */
</script>

<template></template>
