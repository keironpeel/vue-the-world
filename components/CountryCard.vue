<script setup>
//Imports
import { ref } from 'vue'
import { useCountryStore } from '../store/country'
import { useModalStore } from '../store/modal'

//Store
const countryStore = useCountryStore()
const modalStore = useModalStore()

//Props
const props = defineProps({
  flag: String,
  id: String,
  name: String,
})

//State
const currentCard = ref(null)

//Methods
function openModal(e) {
  if (e.type === 'click' || e.keyCode === 13 || e.keyCode === 32) {
    countryStore.lastFocussedCountry = currentCard.value
    countryStore.modalCountryName = props.name
    modalStore.openModal()
  }
}
</script>

<template>
  <li
    class="cursor-pointer hover:bg-gray-800 flex items-start justify-center"
    @click="(e) => openModal(e)"
    @keypress="(e) => openModal(e)"
  >
    <button class="p-4 grid gap-2" ref="currentCard">
      <h2 class="font-bold text-2xl">{{ props.name }}</h2>
      <img :src="props.flag" alt="" class="w-full h-auto" />
    </button>
  </li>
</template>
