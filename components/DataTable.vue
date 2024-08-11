<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="items"
        :search="searchQuery"
        class="elevation-1"
    >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Crypto Data</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="searchQuery"
            append-icon="mdi-magnify"
            label="Поиск"
            single-line
            hide-details
        />
      </v-toolbar>
    </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useCryptoData } from '~/composables/useCryptoData'

const { items, fetchCryptoData } = useCryptoData();
const searchQuery = ref(''); // Переменная для хранения поискового запроса

const headers = ref([
  { text: 'ID', value: 'id' },
  { text: 'Rate', value: 'rate' },
  { text: 'Executed', value: 'executed' },
  { text: 'Low', value: 'low' },
  { text: 'High', value: 'high' },
  { text: 'Commission', value: 'commission' }, // Новое поле
  { text: 'Status', value: 'status.name' },
  { text: 'Coin', value: 'coin.name' },
  { text: 'Purchase Date', value: 'purchaseDate' },
  { text: 'Sale Date', value: 'saleDate' },
  { text: 'Order Date', value: 'orderDate' },
]);


onMounted(() => {
  fetchCryptoData(); // Загружаем данные при монтировании
})

// Опционально: наблюдаем за изменениями items, чтобы видеть обновления данных
watch(items, (newItems) => {
  console.log('Data updated:', newItems);
})
</script>

<style scoped>
.v-container {
  max-width: 1200px;
  margin: auto;
}
</style>
