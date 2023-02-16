<script setup>
//Imports
import { ref, onMounted, computed } from 'vue'
import { useCountryStore } from '../store/country'
import { useModalStore } from '../store/modal'

//Store
const countryStore = useCountryStore()
const modalStore = useModalStore()

//State
const country = ref(null)
const closeButton = ref(null)

//Methods
function stopTabbing(e) {
  if (e.keyCode === 9 || (e.shiftKey && e.keyCode == 9)) {
    closeButton.value.focus()
    e.preventDefault()
  } else if (e.key === "Escape") {
    modalStore.closeModal()
    countryStore.modalCountryName = ''
    countryStore.lastFocussedCountry.focus()
   }
}

function handleClose(e) {
   if (e.type === 'click' || e.keyCode === 13 || e.keyCode === 32) {
    modalStore.closeModal()
    countryStore.modalCountryName = ''
    countryStore.lastFocussedCountry.focus()
   }
}

function closeModalOnClickOff(e) {
  if (e.type === 'click' || e.keyCode === 27) {
    modalStore.closeModal()
    countryStore.modalCountryName = ''
    countryStore.lastFocussedCountry.focus()
  }
}

function bluntClose(e) {
  e.preventDefault()
  e.stopPropagation()
  e.stopImmediatePropagation()
  return false
}

//Lifecycle Hooks
onMounted(async () => {
  country.value = await countryStore.fetchSingleCountry(
    countryStore.modalCountryName
  )
  if (await country) {
    closeButton.value.focus()
  }
})

//Computed
const getCountries = computed(() => {
  return store.getCountries
})
</script>

<template>
  <div
    class="max-h-full overflow-y-auto w-full bg-black/50 fixed top-0 left-0 bottom-0 right-0 grid place-items-center"
    @keypress="(e) => closeModalOnClickOff(e)"
    @click="(e) => closeModalOnClickOff(e)"
  >
    <div
      v-if="country"
      class="grid grid-cols-2 gap-y-8 gap-x-16 bg-white text-gray-900 p-20"
      @click="(e) => bluntClose(e)"
      role="dialog"
      aria-modal="true"
      aria-labelledby="countryName"
      tabindex="-1"
    >
    <div class="flex justify-end col-span-2">
      <button class="border py-2 px-4" ref="closeButton" @keydown="(e) => stopTabbing(e)" @keypress="(e) => handleClose(e)" @click="(e) => handleClose(e)">Close</button>
    </div>
      <div>
        <img :src="country.flags.png" alt="" class="shadow-lg" />
      </div>
      <div>
        <p>
          <span class="font-bold">Name:</span>
          <h2 id="countryName">{{ country.name.common }}</h2>
        </p>
        <p><span class="font-bold">Continent:</span> {{ country.region }}</p>
        <p>
          <span class="font-bold">Language(s) Spoken:</span>
          <span v-for="language in country.languages">{{ language }}</span>
        </p>
        <p>
          <span class="font-bold">Currencies used:</span>
          <span v-for="currency in country.currencies"
            >{{ currency.name }} ({{ currency.symbol }})</span
          >
        </p>
      </div>
    </div>
  </div>
</template>
