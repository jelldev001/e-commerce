import React, { useState, useEffect } from 'react'
import useEcomeStore from '../../store/Ecome_store'
import { UpdateProduct, ReadProduct } from '../../api/product'
import { toast } from 'react-toastify'
import { Uploadfile } from './Uploadfile'
import { useParams, useNavigate } from 'react-router-dom'

const FormEditeProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setform] = useState({
        title: '',
        description: '',
        price: 0,
        images: [],
        quantity: 0,
        categoryId: ''

    })
    const token = useEcomeStore((state) => state.token)
    const getCategory = useEcomeStore((state) => state.getCategory)
    const categories = useEcomeStore((state) => state.categories)

    useEffect(() => {
        getCategory()
        fetchProduct(token, id,form)
    }, [])
    const fetchProduct = async (token, id,form) => {
        try {
            const res = await ReadProduct(token, id,form)
            console.log("res from backend ", res)
            setform(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    // console.log('form frontend ',form)
    const handdleOnchang = (e) => {
        console.log(e.target.name, e.target.value)
        setform({
            ...form,
            [e.target.name]: e.target.value
        }
        )
    }
    const handdleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await UpdateProduct(token, id, form)
            console.log("res blackend", res)
            toast.success(`Update ${res.data.title} success`)
            navigate('/admin/product')
        } catch (err) {
            console.log(err)
        }
        // console.log("จากform",products)
    }
    // console.log(products)
    // console.log(categories)
    return (
        <div className='container mx-auto p-4 shadow-md bg-white'>
            <form onSubmit={handdleSubmit}>
                <h1>เพี่มข้อมูลสินค้า</h1>
                <input type="text"
                    className='border px-2 '
                    value={form.title}
                    onChange={handdleOnchang}
                    placeholder='Title'
                    name='title' />
                <input type="text"
                    className='border px-2 '
                    value={form.description}
                    onChange={handdleOnchang}
                    placeholder='Description'
                    name='description' />
                <input type="number"
                    className='border px-2 '
                    value={form.price}
                    onChange={handdleOnchang}
                    placeholder='Price'
                    name='price' />
                <input type="number"
                    className='border px-2 '
                    value={form.quantity}
                    onChange={handdleOnchang}
                    placeholder='quantity'
                    name='quantity' />
                <select
                    className='border'
                    name='categoryId' onChange={handdleOnchang} required value={form.categoryId}>
                    <option value='' disabled >Pls select </option>
                    {categories.map((item, index) =>
                        <option key={index} value={item.id}>{item.name} </option>
                    )}

                </select>
                <hr />
                {/* upload file */}
                <Uploadfile form={form} setform={setform} />
                <button className='bg-sky-500 text-white border rounded px-2 py-3 font-bold'>Update</button>
            </form>

        </div>
    )
}

export default FormEditeProduct