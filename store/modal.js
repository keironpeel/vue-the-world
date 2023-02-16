import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({ open: false }),
  getters: {},
  actions: {
    openModal() {
      this.open = true
    },
    closeModal() {
      this.open = false
    },
  },
})
