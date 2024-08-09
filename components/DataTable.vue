<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Crypto Data</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const headers = ref([
  { text: 'ID', value: 'id' },
  { text: 'Rate', value: 'rate' },
  { text: 'Executed', value: 'executed' },
  { text: 'Low', value: 'low' },
  { text: 'High', value: 'high' },
  { text: 'Status', value: 'status' },
  { text: 'Coin', value: 'coin' },
  { text: 'Purchase Date', value: 'purchaseDate' },
  { text: 'Sale Date', value: 'saleDate' },
  { text: 'Order Date', value: 'orderDate' },
])

const items = ref([
  {
    id: 1,
    rate: 45000,
    executed: 1.2,
    low: 44000,
    high: 46000,
    status: 'completed',
    coin: 'BTC',
    purchaseDate: '2024-08-01',
    saleDate: '2024-08-02',
    orderDate: '2024-08-01',
  },
  {
    id: 2,
    rate: 3000,
    executed: 10,
    low: 2900,
    high: 3100,
    status: 'completed',
    coin: 'ETH',
    purchaseDate: '2024-08-03',
    saleDate: '2024-08-04',
    orderDate: '2024-08-03',
  },
])
</script>

<style scoped>
.v-container {
  max-width: 1200px;
  margin: auto;
}
</style>
