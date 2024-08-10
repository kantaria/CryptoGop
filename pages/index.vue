<template>
  <v-container>
    <h1>Главная страница</h1>
    <DataTable />

    <v-form @submit.prevent="saveCryptoData">
      <v-row>
        <!-- Поле для ставки -->
        <v-col cols="12" md="4">
          <v-text-field
              v-model="cryptoData.rate"
              label="Ставка"
              :rules="[rules.required, rules.number]"
              required
          />
        </v-col>

        <!-- Поле для точки выхода -->
        <v-col cols="12" md="4">
          <v-text-field
              v-model="cryptoData.executed"
              label="Точка выхода"
              :rules="[rules.number]"
          />
        </v-col>

        <!-- Поле Low -->
        <v-col cols="12" md="4">
          <v-text-field
              v-model="cryptoData.low"
              label="Low"
              :rules="[rules.required, rules.number]"
              required
          />
        </v-col>

        <!-- Поле High -->
        <v-col cols="12" md="4">
          <v-text-field
              v-model="cryptoData.high"
              label="High"
              :rules="[rules.required, rules.number]"
              required
          />
        </v-col>

        <!-- Выпадающий список Монета -->
        <v-col cols="12" md="4">
          <v-select
              v-if="coins.length > 0"
              v-model="cryptoData.coin"
              :hint="cryptoData.coin?.name || 'Выбрать Монету'"
              :items="coins"
              item-title="name"
              item-value="id"
              label="Монета"
              persistent-hint
              return-object
              single-line
              :menu-props="{ eager: true }"
          >
            <template v-slot:prepend-item>
              <v-list-item>
                <v-list-item-title>Выбрать Монету</v-list-item-title>
              </v-list-item>
            </template>
          </v-select>
        </v-col>

        <!-- Выпадающий список Статус -->
        <v-col cols="12" md="4">
          <v-select
              v-if="statuses.length > 0"
              v-model="cryptoData.status"
              :hint="cryptoData.status?.name || 'Выбрать Статус'"
              :items="statuses"
              item-title="name"
              item-value="id"
              label="Статус"
              persistent-hint
              return-object
              single-line
              :menu-props="{ eager: true }"
          >
            <template v-slot:prepend-item>
              <v-list-item>
                <v-list-item-title>Выбрать Статус</v-list-item-title>
              </v-list-item>
            </template>
          </v-select>
        </v-col>

        <!-- Поле Дата покупки -->
        <v-col cols="12" md="4">
          <v-text-field
              v-model="cryptoData.purchaseDate"
              label="Дата покупки"
              :rules="[rules.date]"
          />
        </v-col>

        <!-- Поле Дата продажи -->
        <v-col cols="12" md="4">
          <v-text-field
              v-model="cryptoData.saleDate"
              label="Дата продажи"
              :rules="[rules.date]"
          />
        </v-col>

        <!-- Поле Дата ордера -->
        <v-col cols="12" md="4">
          <v-text-field
              v-model="cryptoData.orderDate"
              label="Дата ордера"
              :rules="[rules.date]"
          />
        </v-col>
      </v-row>

      <v-btn type="submit" color="primary">Сохранить</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Инициализация данных
const cryptoData = ref({
  rate: '',
  executed: '',
  low: '',
  high: '',
  coin: null,
  status: null,
  purchaseDate: '',
  saleDate: '',
  orderDate: ''
})

const coins = ref([]);
const statuses = ref([]);

// Правила валидации
const rules = {
  required: value => !!value || 'Обязательно для заполнения.',
  number: value => !isNaN(parseFloat(value)) || 'Только цифры.',
  date: value => /^\d{4}-\д{2}-\д{2}$/.test(value) || 'Неверный формат даты. Используйте ГГГ-ММ-ДД.'
}

// Функции для загрузки данных
const fetchCoins = async () => {
  try {
    const result = await $fetch('/api/getCoins');
    coins.value = result || [];
  } catch (error) {
    console.error('Ошибка при загрузке монет:', error);
    coins.value = [];
  }
};

const fetchStatuses = async () => {
  try {
    const result = await $fetch('/api/getStatus');
    statuses.value = result || [];
  } catch (error) {
    console.error('Ошибка при загрузке статусов:', error);
    statuses.value = [];
  }
};

// Функция для сохранения данных
const saveCryptoData = async () => {
  try {
    await $fetch('/api/addCryptoData', {
      method: 'post',
      body: {
        ...cryptoData.value,
        coinId: cryptoData.value.coin?.id || null,
        statusId: cryptoData.value.status?.id || null
      }
    });
    alert('Данные успешно сохранены!');
  } catch (error) {
    alert('Ошибка при сохранении данных');
  }
};

// Загрузка данных при монтировании компонента
onMounted(() => {
  fetchCoins();
  fetchStatuses();
});
</script>
