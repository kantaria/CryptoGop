<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="coins"
        item-value="id"
        class="elevation-1"
        :loading="loading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Монеты</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="openAddDialog">Добавить монету</v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn icon @click="editCoin(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="confirmDeleteCoin(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Диалоговое окно для добавления/редактирования -->
    <v-dialog v-model="showAddDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ editMode ? 'Редактировать' : 'Добавить' }} монету</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
                ref="coinInput"
                v-model="coinForm.name"
                label="Название монеты"
                @keydown.enter="saveCoin"
                @input="validateInput"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showAddDialog = false">Отмена</v-btn>
          <v-btn color="blue darken-1" text @click="saveCoin">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Диалоговое окно подтверждения удаления -->
    <v-dialog v-model="showConfirmDeleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Подтверждение удаления</v-card-title>
        <v-card-text>Вы уверены, что хотите удалить монету "{{ coinToDelete.name }}"?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="showConfirmDeleteDialog = false">Отмена</v-btn>
          <v-btn color="red" text @click="deleteCoinConfirmed">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const coins = ref([])
const loading = ref(false)
const showAddDialog = ref(false)
const showConfirmDeleteDialog = ref(false)
const editMode = ref(false)
const coinForm = ref({ id: null, name: '' })
const coinToDelete = ref(null)
const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Название монеты', value: 'name' },
  { text: 'Действия', value: 'actions', sortable: false },
]

const fetchCoins = async () => {
  loading.value = true
  coins.value = await $fetch('/api/getCoins')
  loading.value = false
}

onMounted(() => {
  fetchCoins()
})

const openAddDialog = () => {
  showAddDialog.value = true
  editMode.value = false
  coinForm.value = { id: null, name: '' }

  nextTick(() => {
    if ($refs.coinInput) {
      $refs.coinInput.focus()
    }
  })
}

const saveCoin = async () => {
  if (!coinForm.value.name) return

  const endpoint = editMode.value ? '/api/editCoin' : '/api/addCoin'
  const method = editMode.value ? 'put' : 'post'

  await $fetch(endpoint, {
    method,
    body: coinForm.value,
  })

  showAddDialog.value = false
  fetchCoins()
  coinForm.value = { id: null, name: '' }
  editMode.value = false
}

const editCoin = (item) => {
  coinForm.value = { ...item }
  editMode.value = true
  showAddDialog.value = true

  nextTick(() => {
    if ($refs.coinInput) {
      $refs.coinInput.focus()
    }
  })
}

const confirmDeleteCoin = (item) => {
  coinToDelete.value = item
  showConfirmDeleteDialog.value = true
}

const deleteCoinConfirmed = async () => {
  await $fetch('/api/deleteCoin', {
    method: 'delete',
    body: { id: coinToDelete.value.id },
  })

  showConfirmDeleteDialog.value = false
  fetchCoins()
}

// Валидация ввода для английских букв
const validateInput = (event) => {
  const regex = /^[a-zA-Z0-9\s]*$/;
  if (!regex.test(event.target.value)) {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
  }
}
</script>
