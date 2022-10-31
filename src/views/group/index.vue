<script lang="tsx" setup>
import { h, ref, reactive, getCurrentInstance, onMounted } from 'vue'

import { NButton, NAvatar } from 'naive-ui'
import type { DataTableColumns, DataTableBaseColumn, DataTableFilterState } from 'naive-ui'

const { proxy } = getCurrentInstance()!
const $lib = proxy!.$lib

interface ResultGroup {
  id: number
  name: string
  permission: 'MEMBER' | 'ADMINISTRATOR' | 'OWNER'
}

interface DataGroup {
  id: number
  name: string
  permission: string
}

const data = ref<DataGroup[]>([])
const total = ref(0)
const loadingRef = ref(true)

function query() {
  $lib.requests.get({
    url: 'http://127.0.0.1:8000/api/group_list',
    success: (res: ResultGroup[]) => {
      // data.value = res
      res.forEach((group) => {
        data.value.push({
          id: group.id,
          name: group.name,
          permission: { MEMBER: '成员', ADMINISTRATOR: '管理员', OWNER: '群主' }[group.permission],
        })
      })
      total.value = res.length
    },
    complete: () => (loadingRef.value = false),
  })
}

const permissionColumn = reactive<DataTableBaseColumn<DataGroup>>({
  key: 'permission',
  title: '权限',
  minWidth: 100,
  width: '10%',
  align: 'center',
  filterMultiple: false,
  filterOptionValue: null,
  filterOptions: [
    {
      label: '成员',
      value: '成员',
    },
    {
      label: '管理员',
      value: '管理员',
    },
    {
      label: '群主',
      value: '群主',
    },
  ],
  filter: (value, row) => {
    return row.permission === value.toString()
  },
})

const columns = ref<DataTableColumns<DataGroup>>([
  {
    key: 'id',
    title: '群号',
    minWidth: 130,
    width: '10%',
    maxWidth: 180,
    sortOrder: false,
    sorter: (rowA: any, rowB: any) => {
      return rowA.id - rowB.id
    },
  },
  {
    key: 'name',
    title: '群名称',
    render: (rowData) =>
      h('span', { style: 'display: flex; align-items: center' }, [
        h(NAvatar, {
          src: `https://p.qlogo.cn/gh/${rowData.id}/${rowData.id}/`,
          size: 35,
          round: true,
          objectFit: 'cover',
          style: { marginRight: '5px', flexShrink: 0 },
        }),
        h('span', { style: '' }, rowData.name),
      ]),
  },
  permissionColumn,
  {
    key: 'operation',
    title: '操作',
    minWidth: 100,
    width: '10%',
    align: 'center',
    render: () => h(NButton, { size: 'small', type: 'error' }, () => '退群'),
  },
])

onMounted(() => query())

function handleSorterChange(sorter: { columnKey: any; order: any }) {
  // @ts-ignore
  columns.value.forEach((column: DataTableBaseColumn<DataGroup>) => {
    /** column.sortOrder !== undefined means it is uncontrolled */
    if (column.sortOrder === undefined) return
    if (!sorter) {
      column.sortOrder = false
      return
    }
    if (column.key === sorter.columnKey) column.sortOrder = sorter.order
    else column.sortOrder = false
  })
}

function handleUpdateFilter(filters: DataTableFilterState, sourceColumn: DataTableBaseColumn) {
  console.log(filters, sourceColumn, sourceColumn.key, filters[sourceColumn.key])
  permissionColumn.filterOptionValue = filters[sourceColumn.key] as string
}
</script>

<template>
  <section class="card">
    <n-data-table
      :columns="columns"
      :data="data"
      :loading="loadingRef"
      :pagination="{ pageSize: 15 }"
      :max-height="800"
      virtual-scroll
      @update:sorter="handleSorterChange"
      @update:filters="handleUpdateFilter"
    />
    <!-- <div>
            <el-avatar :src="`https://p.qlogo.cn/gh/${qunId}/${qunId}/`" :size="100" fit="cover" />
        </div> -->
  </section>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  padding: 20px;
  border-radius: 12px;
  background-color: var(--bg-color);
  box-shadow: 0 10px 20px rgb(0 0 0 / 5%);
  height: 100%;
}

.el-avatar {
  box-shadow: 0px 0px 10px rgb(0 0 0 / 5%);
}
</style>
