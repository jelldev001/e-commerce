import axios from 'axios'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { listCategory } from '../api/category'
import { listProduct, searchProduct } from '../api/product'
import _ from 'lodash';
const ecomeStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  actionAdtoCart: (product) => {
    const carts = get().carts;
    const updatedCarts = [...carts, { ...product, count: 1 }];
    // step uniqe 
    const unique = _.unionWith(updatedCarts, _.isEqual);
    set({ carts: unique })

  },
  actionUpdateQuantity: (productId, newQuantity) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : { ...item }
      )

    }))
    // console.log("click update quantity",productId,newQuantity)
  },
  actionRemoveProduct: (productId) => {
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId)
    }))
  },
  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count
    }, 0)
  },
  actionLogin: async (form) => {
    const res = await axios.post('http://localhost:3000/api/login', form)
    set({
      user: res.data.payload,
      token: res.data.token
    })
    //   console.log(res)
    return res

  },
  getCategory: async () => {
    try {
      const res = await listCategory()
      set({ categories: res.data })
    } catch (err) {
      console.log(err)
    }

  },
  getProduct: async (count) => {
    try {
      const res = await listProduct((count))
      set({ products: res.data })
    } catch (err) {
      console.log(err)
    }

  },
  actionSearchProduct: async (arg) => {
    try {
      const res = await searchProduct(arg)
      set({ products: res.data })
    } catch (err) {
      console.log(err)
    }
  },

})
const usePersist = {
  name: 'ecome-store',
  Storage: createJSONStorage(() => localStorage)

}

const useEcomeStore = create(persist(ecomeStore, usePersist))


export default useEcomeStore; 