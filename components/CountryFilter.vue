<script setup>
//Imports
import { ref } from 'vue'
import { useCountryStore } from '../store/country'

//Store
const store = useCountryStore()

//State
const searchValue = ref('')

//Methods
function submitFromInput(e) {
  if (e.code === 'Enter') {
    e.preventDefault()
    handleSubmit()
  }
}

function handleReset() {
  store.resetSearchTerm()
  searchValue.value = ''
}

function handleSubmit() {
  store.searchTerm = searchValue.value
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col items-start sm:flex-row sm:items-end gap-4 max-w-xs mb-16"
    role="search"
  >
    <div>
      <label for="search">Search for a country</label>
      <input
        type="search"
        name="q"
        id="search"
        v-model="searchValue"
        class="py-2 px-4 text-gray-900 w-full sm:min-w-[250px]"
        @keypress="(e) => submitFromInput(e)"
      />
    </div>
    <button
      @click.prevent="handleReset"
      class="bg-white text-gray-900 font-bold py-2 px-4 h-max"
    >
      Reset
    </button>
    <button
      type="submit"
      class="bg-cyan-300 text-gray-900 font-bold py-2 px-4 h-max"
    >
      Search
    </button>
  </form>
</template>
