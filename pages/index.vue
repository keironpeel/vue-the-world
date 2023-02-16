<script setup>
//Imports
import { ref, computed, onMounted } from 'vue'
import { useCountryStore } from '../store/country'
import { useModalStore } from '../store/modal'
import Header from '../components/Header.vue'
import CountryFilter from '../components/CountryFilter.vue'
import CountryCard from '../components/CountryCard.vue'

//Store
const store = useCountryStore()
const modalStore = useModalStore()

//State
const modalOpen = ref(false)

//Methods
function openModal() {
  modalOpen.value = true
}

//Lifecycle Hooks
onMounted(() => {
  store.fetchAllCountries()
})

//Computed
const getCountries = computed(() => {
  return store.getCountries
})
</script>

<template>
  <div>
    <CountryModal v-if="modalStore.open" />
    <Header />
    <main id="main" class="p-8">
      <CountryFilter />
      <ul
        class="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        <CountryCard
          v-for="country in getCountries"
          :key="country.fifa"
          :name="country.name.common"
          :flag="country.flags.png"
          :id="country.fifa"
        />
      </ul>
    </main>
    <footer id="footer"></footer>
  </div>
</template>

<style>
body {
  @apply bg-gray-900 text-white;
}
</style>
