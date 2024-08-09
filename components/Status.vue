<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="status"
        item-value="id"
        class="elevation-1"
        :loading="loading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Статус</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="openAddDialog">Добавить статус</v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn icon @click="editStatus(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="confirmDeleteStatus(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Диалоговое окно для добавления/редактирования -->
    <v-dialog v-model="showAddDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ editMode ? 'Редактировать' : 'Добавить' }} статус</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
                ref="statusInput"
                v-model="statusForm.name"
                label="Название Статус"
                @keydown.enter="saveStatus"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showAddDialog = false">Отмена</v-btn>
          <v-btn color="blue darken-1" text @click="saveStatus">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Диалоговое окно подтверждения удаления -->
    <v-dialog v-model="showConfirmDeleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Подтверждение удаления</v-card-title>
        <v-card-text>Вы уверены, что хотите удалить статус "{{ statusToDelete.name }}"?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="showConfirmDeleteDialog = false">Отмена</v-btn>
          <v-btn color="red" text @click="deleteStatusConfirmed">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const status = ref([])
const loading = ref(false)
const showAddDialog = ref(false)
const showConfirmDeleteDialog = ref(false)
const editMode = ref(false)
const statusForm = ref({ id: null, name: '' })
const statusToDelete = ref(null)
const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Название Статус', value: 'name' },
  { text: 'Действия', value: 'actions', sortable: false },
]

const fetchStatus = async () => {
  loading.value = true
  status.value = await $fetch('/api/getStatus')
  loading.value = false
}

onMounted(() => {
  fetchStatus()
})

const openAddDialog = () => {
  showAddDialog.value = true
  editMode.value = false
  statusForm.value = { id: null, name: '' }

  nextTick(() => {
    if ($refs.statusInput) {
      $refs.statusInput.focus()
    }
  })
}

const saveStatus = async () => {
  if (!statusForm.value.name) return

  const endpoint = editMode.value ? '/api/editStatus' : '/api/addStatus'
  const method = editMode.value ? 'put' : 'post'

  await $fetch(endpoint, {
    method,
    body: statusForm.value,
  })

  showAddDialog.value = false
  fetchStatus()
  statusForm.value = { id: null, name: '' }
  editMode.value = false
}

const editStatus = (item) => {
  statusForm.value = { ...item }
  editMode.value = true
  showAddDialog.value = true

  nextTick(() => {
    if ($refs.statusInput) {
      $refs.statusInput.focus()
    }
  })
}

const confirmDeleteStatus = (item) => {
  statusToDelete.value = item
  showConfirmDeleteDialog.value = true
}

const deleteStatusConfirmed = async () => {
  await $fetch('/api/deleteStatus', {
    method: 'delete',
    body: {id: statusToDelete.value.id},
  })

  showConfirmDeleteDialog.value = false
  fetchStatus()
}
</script>
