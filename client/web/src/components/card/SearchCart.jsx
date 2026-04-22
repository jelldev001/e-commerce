import React, { use, useEffect, useState } from 'react'
import useEcomeStore from '../../store/Ecome_store'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const SearchCart = () => {
    const getProduct = useEcomeStore((state) => state.getProduct)
    const products = useEcomeStore((state) => state.products)
    const actionSearchProduct = useEcomeStore((state) => state.actionSearchProduct)
    const getcategory = useEcomeStore((state) => state.getCategory)
    const categories = useEcomeStore((state) => state.categories)
    const [text, setText] = useState('')
    const [categorySelected, setCategorySelected] = useState([])
    const [price, setPrice] = useState([1000, 30000])
    const [ok, setOk] = useState(false)
    // console.log(text);

    // search by text
    useEffect(() => {
        const delay = setTimeout(() => {

            if (text) {
                actionSearchProduct({ query: text })
            } else {
                getProduct()
            }
        }, 300);
        return () => clearTimeout(delay);
    }, [text])

    // serch by category
    useEffect(() => {
        getcategory()
    }, [])
    const handleChecked = (e) => {
        const inChecked = e.target.value; //ค่าที่ถูกเลือก
        const inState = [...categorySelected] //ค่าที่อยู่ใน state ปัจจุบัน 
        const found = inState.indexOf(inChecked) //เช็คว่าค่าที่เลือกมีใน state หรือไม่
        if (found === -1) {
            //ถ้าไม่เจอให้เพิ่มค่า
            inState.push(inChecked)
        } else {
            //ถ้าเจอให้ลบค่า
            inState.splice(found, 1)
        }
        setCategorySelected(inState)

        if (inState.length > 0) {
            actionSearchProduct({ category: inState })
        } else {
            getProduct()
        }

    }
    // console.log(categorySelected)
    // search by price
    useEffect(() => {
        actionSearchProduct({price})
    }, [ok])
    const hadlePrice = (value) => {
        // console.log(value)
        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }
    return (
        <>
            {/* search by text */}
            <h1 className='text-2xl front-bold mb-4'> Search Product</h1>
            <input type=" text" className='border rounded-md w-full mb-4 px-2'
                onChange={(e) => setText(e.target.value)}
                placeholder='search product ' />

            {/* search by category */}
            <hr />
            <div>
                <h1> category </h1>

                <div>
                    {
                        categories.map((item, index) =>
                            <div key={index}>
                                <input type='checkbox'
                                    value={item.id}
                                    onChange={handleChecked}
                                ></input>
                                <label> {item.name}</label>
                            </div>

                        )
                    }
                </div>
            </div>
            {/* search by price */}
            <div>
                <h1>price</h1>
                <div>
                    <div className='flex justify-between'>
                        <span>Min : {price[0]}</span>
                        <span>Max : {price[1]} </span>
                    </div>
                    <Slider onChange={hadlePrice}
                        range
                        min={0}
                        max={100000}
                        defaultValue={[1000, 30000]}
                    />
                </div>
            </div>

        </>



    )
}

export default SearchCart