<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { Route } from "@/types";
import {compareIp, maskToCidr} from "@/utils/utilsIP.ts";
import { useDataStore } from "@/stores/data.ts";

const sortKey = ref<keyof Route | "">('');
const sortOrder = ref<'asc' | 'desc'>('asc');
const store = useDataStore();

function sortBy(key: keyof Route) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

const sortedRoutes = computed(() => {
  const sorted = [...store.routes].sort((a, b) => {
    let result = 0;
    if (sortKey.value === 'address' || sortKey.value === 'gateway') {
      result = compareIp(a[sortKey.value], b[sortKey.value]);
    } else if (sortKey.value === 'interface') {
      result = a[sortKey.value].localeCompare(b[sortKey.value]);
    }
    return sortOrder.value === 'asc' ? result : -result;
  });
  return sorted;
});

</script>


<template>
  <div class="table-wrapper">
    <table class="route-table">
      <thead>
      <tr>
        <th @click="sortBy('address')">
          Адрес назначения
          <span v-if="sortKey === 'address'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
        </th>
        <th @click="sortBy('gateway')">
          Шлюз
          <span v-if="sortKey === 'gateway'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
        </th>
        <th @click="sortBy('interface')">
          Интерфейс
          <span v-if="sortKey === 'interface'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="route in sortedRoutes" :key="route.uuid">
        <td>{{ `${route.address}/${maskToCidr(route.mask)}` }}</td>
        <td>{{ route.gateway }}</td>
        <td>{{ route.interface }}</td>
      </tr>
      </tbody>
    </table>

    <button v-if="sortKey"  @click="sortKey = ''" type="button">Сбросить сортировку</button>
  </div>
</template>

<style scoped>
.table-wrapper {
  padding: 10px;
  width: 70%;
  overflow-x: auto;

  display: flex;
  flex-direction: column;
  gap: 15px;
}

.table-wrapper button{
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #f5f5f5;
  cursor: pointer;
}

.route-table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

th {
  background-color: #f5f5f5;
  cursor: pointer;
}

tbody tr{
  transition: .3s;
}
tbody tr:hover {
  background-color: #f9f9f9;
}
</style>

