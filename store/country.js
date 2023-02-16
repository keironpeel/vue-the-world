import { defineStore } from 'pinia'

export const useCountryStore = defineStore('country', {
  state: () => ({
    countries: [],
    searchTerm: '',
    lastFocussedCountry: '',
    modalCountryName: '',
  }),
  getters: {
    getCountries: (state) => {
      return state.searchTerm === ''
        ? state.countries
        : state.countries.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(state.searchTerm.toLowerCase())
          )
    },
  },
  actions: {
    async fetchAllCountries() {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        this.countries = await response.json()
      } catch (error) {
        console.error(error)
      }
    },
    async fetchSingleCountry(countryName) {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
        )
        const json = await response.json()
        return json[0]
      } catch (error) {
        console.error(error)
      }
    },
    resetSearchTerm() {
      this.searchTerm = ''
    },
  },
})
