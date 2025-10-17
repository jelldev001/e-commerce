import axios from 'axios'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { listCategory } from '../api/category'
import { listProduct } from '../api/product'
const ecomeStore = (set) => (({
  user: null,
  token: null,
  categories: [],
  products: [],
  actionLogin: async (form) => {

    const res = await axios.post('http://localhost:3000/api/login', form)
    set({
      user: res.data.payload,
      token: res.data.token
    })
    //   console.log(res)
    return res

  },
  getCategory: async (token) => {
    try {
      const res = await listCategory((token))
      set({ categories: res.data })
    } catch (err) {
      console.log(err)
    }

  },
  getProduct : async (token,count) => {
    try {
      const res = await listProduct((token,count))
      set({ products : res.data })
    } catch (err) {
      console.log(err)
    }

  }
}))
const usePersist = {
  name: 'ecome-store',
  Storage: createJSONStorage(() => localStorage)

}

const useEcomeStore = create(persist(ecomeStore, usePersist))


export default useEcomeStore; 