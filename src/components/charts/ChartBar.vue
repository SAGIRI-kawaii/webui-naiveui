<script setup lang="ts">
import { ref, Ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Chart, registerables, ChartData, ChartType, DefaultDataPoint } from 'chart.js'

const props = defineProps<{
  height: number
  data: object
}>()

Chart.register(...registerables)

const chartCanvas = ref() as Ref<HTMLCanvasElement>

let chart: Chart

onMounted(() => {
  console.log(props.data)
  chart = new Chart(chartCanvas.value, {
    type: 'bar',
    data: props.data as ChartData<ChartType, DefaultDataPoint<ChartType>, unknown>,
    options: {
      layout: {
        padding: {
          top: 30,
          right: 15,
          left: 10,
          bottom: 5,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          grid: {
            display: true,
            color: 'rgba(255, 255, 255, .2)',
            borderDash: [6],
            borderDashOffset: 6,
          },
          ticks: {
            display: true,
            color: '#fff',
            font: {
              size: 14,
              lineHeight: 1.5,
              weight: 'bold',
              family: 'Open Sans',
            },
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            display: true,
            color: '#fff',
            font: {
              size: 14,
              lineHeight: 1.5,
              weight: 'bold',
              family: 'Open Sans',
            },
          },
        },
      },
    },
  })
})

watch(props.data, () => chart.update(), { deep: true })

onBeforeUnmount(() => {
  chart.destroy()
})
</script>

<template>
  <div>
    <canvas ref="chartCanvas" :style="{ height: `${height}px` }"></canvas>
  </div>
</template>

<style lang="scss" scoped>
canvas {
  background-image: linear-gradient(to right, #00369e, #005cfd, #a18dff);
}
</style>
