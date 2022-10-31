<script setup lang="ts">
defineProps<{
  title: string
  contain: string | number
  extra?: string | number
}>()
</script>

<template>
  <div class="info-card">
    <div class="static">
      <div class="info-card__title">{{ title }}</div>
      <div class="info-card__container">
        {{ contain }}<span v-if="extra" class="extra">{{ extra }}</span>
      </div>
    </div>
    <div class="icon"><slot /></div>
  </div>
</template>

<style lang="scss" scoped>
.info-card {
  position: relative;
  padding: 16px;
  border-radius: 12px;
  background-color: var(--bg-color);
  box-shadow: 0 20px 27px rgb(0 0 0 / 5%);

  .static {
    display: inline-block;
    width: calc(100% - 50px);
  }

  .info-card__title {
    color: var(--text-color-secondary);
    font-size: 14px;
    font-weight: bold;
  }

  .info-card__container {
    font-size: 30px;
    font-weight: bold;

    .extra::before {
      content: '/';
      color: var(--text-color-secondary);
      font-size: 14px;
    }

    .extra {
      color: var(--text-color-secondary);
      font-size: 14px;
    }
  }

  .icon {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 16px;
    display: inline-flex;
    background-color: var(--color-primary);
    width: 50px;
    height: 50px;
    color: var(--color-white);
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 6px rgba(64, 158, 255, 0.12);
    border-radius: 8px;

    &:deep() svg {
      height: 22px;
      vertical-align: middle;
    }
  }
}
</style>
