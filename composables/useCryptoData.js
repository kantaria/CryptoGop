import { ref } from 'vue'

export function useCryptoData() {
    const items = ref([])

    const fetchCryptoData = async () => {
        items.value = await $fetch('/api/getCryptoData') // Загрузка данных из API
    }

    return {
        items,
        fetchCryptoData
    }
}
