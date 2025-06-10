import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {Route} from "@/types";

export const useDataStore = defineStore('data', () => {
  const routes = ref<Route[]>([
    { uuid: '1', address: '192.168.1.0', mask: '255.255.255.0', gateway: '192.168.1.1', interface: 'Подключение Ethernet' },
    { uuid: '2', address: '10.0.0.0', mask: '255.0.0.0', gateway: '10.0.0.1', interface: 'Гостевая сеть' },
    { uuid: '3', address: '172.16.0.0', mask: '255.240.0.0', gateway: '172.16.0.1', interface: 'Домашняя сеть' },
    { uuid: '4', address: '192.168.0.0', mask: '255.255.0.0', gateway: '192.168.0.1', interface: 'Подключение Ethernet' },
    { uuid: '5', address: '192.168.100.0', mask: '255.255.255.0', gateway: '192.168.100.1', interface: 'Гостевая сеть' },
    { uuid: '6', address: '10.10.0.0', mask: '255.255.0.0', gateway: '10.10.0.1', interface: 'Домашняя сеть' },
    { uuid: '7', address: '172.16.1.0', mask: '255.255.255.0', gateway: '172.16.1.1', interface: 'Гостевая сеть' },
    { uuid: '8', address: '10.0.1.0', mask: '255.255.255.0', gateway: '10.0.1.1', interface: 'Подключение Ethernet' },
    { uuid: '9', address: '192.0.2.0', mask: '255.255.255.0', gateway: '192.0.2.1', interface: 'Домашняя сеть' },
  ]);

  return { routes }
})
