import React, { useState, useEffect } from 'react'
import useEcomeStore from '../../store/Ecome_store'
import { CreatProduct, ReadProduct, UpdateProduct, RemoveProduct } from '../../api/product'
import { toast } from 'react-toastify'
import { Uploadfile } from './Uploadfile'
import { Link } from 'react-router-dom'
import { Pencil,Trash2 } from 'lucide-react';
const  innitailState = {
        title: '',
        description: '',
        price: 0,
        images: [],
        quantity: 0,
        categoryId: ''
    }
const FormProduct = () => {
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
    const getProduct = useEcomeStore((state) => state.getProduct)
    const products = useEcomeStore((state) => state.products)

    useEffect(() => {
        getCategory()
        getProduct()
    }, [])
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
            const res = await CreatProduct(token, form)
            console.log(res)
            setform(innitailState)
            getProduct()   
            toast.success(`Creat ${res.data.title} Success`)
        } catch (err) {
            console.log(err)
        }
        // console.log("จากform",products)
    }
    const handdleRemove = async (id) => {

        try {
            const res = await RemoveProduct(token, id)
            getProduct()
            console.log(res)
            toast.success(`Remove ${res.data.title} sucess`)
        } catch (err) {
            console.log(err)

        }
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
                    placeholder='Product name'
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
                <button className='bg-sky-500 text-white border rounded px-2 py-3 font-bold'>กดเพี่มสีนค้า</button>
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr className='bg-gray-300'>
                            <th className="border px-4 py-2">NO.</th>
                            <th className="border px-4 py-2">Image</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Quantity</th>
                            <th className="border px-4 py-2">Sold</th>
                            <th className="border px-4 py-2">Updated At</th>
                            <th className="border px-4 py-2">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">
                                    {
                                        item.images.length > 0
                                            ? <img src={item.images[0].url} alt="product" className="w-26 h-26 object-cover rounded shadow-m" />
                                            : <div className='w-26 h-26 items-center justify-center flex bg-stone-400 rounded-md'>No Image</div>
                                    }
                                </td>
                                <td className="border px-4 py-2">{item.title}</td>
                                <td className="border px-4 py-2">{item.description}</td>
                                <td className="border px-4 py-2">{item.price}</td>
                                <td className="border px-4 py-2">{item.quantity}</td>
                                <td className="border px-4 py-2">{item.sold}</td>
                                <td className="border px-4 py-2">{item.updatedAt}</td>
                                <td className="border px-4 py-2">
                                    <div className='flex gap-2'>
                                        <Link className='bg-sky-400 px-4 py-2 rounded-md ' to={'/admin/product/edite/' + item.id}> 
                                        <Pencil/>
                                        </Link>
                                        <button className='bg-red-400 px-4 py-2 rounded-md ' onClick={() => handdleRemove(item.id)} >
                                            <Trash2/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </form>

        </div>
    )
}

export default FormProduct