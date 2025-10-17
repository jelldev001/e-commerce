import React, { useState, useEffect } from 'react'
import { createCategory, removeCategory} from '../../api/category'
import useEcomeStore from '../../store/Ecome_store'
import { toast } from 'react-toastify'
const FormCategory = () => {
  const token = useEcomeStore((state) => state.token)
  const [name, setName] = useState('')
  // const [categories, setCategories] = useState([])
const categories = useEcomeStore((state)=>state.categories)
const getCategory = useEcomeStore((state)=>state.getCategory)
  useEffect(() => {
    getCategory(token)
  }, [])


  const handdleSubmit = async (e) => {
    e.preventDefault()
    if (!name) { // can use name ===''
      return toast.warning('Pls Fill Data');
    }
    try {
      const res = await createCategory(token, { name })
      console.log(res.data.name)
      // console.log(token,{name})
      toast.success(`Add Category ${res.data.name} Success!`)
        getCategory(token)
    } catch (err) {
      console.log(err)
    }

  }
  const handdleRemove =async (id)=>{
    try {
     const res = await removeCategory(token,id)
     getCategory(token)
      console.log(res)
      toast.success(`Delete ${res.data.name} success!`)
    }catch (err) {
      console.log(err)
    }

  }

  return (
    <div className='container mx-auto p-4 bg-white shadow-md'>
      <h1>Category Management</h1>
      <form className='my-4' onSubmit={handdleSubmit}>
        <input type="text"
          onChange={(e) => setName(e.target.value)}
          className='border'
        />
        <button className='bg-blue-600 px-2 py-2 mx-2 text-white '>Add Category</button>
      </form>
      <hr />
      <ul className='list-none'>
        {
          categories.map((item, index) =>
            <li className='flex justify-between my-2'
              key={index} >
              <span>{item.name}</span>
              <button className='bg-red-500 px-2 py-3 text-white rounded ' onClick={()=>handdleRemove(item.id)}>Delete</button>
            </li>
          )
        }

      </ul>
    </div>
  )
}

export default FormCategory