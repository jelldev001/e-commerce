import axios from "axios";
export const CreatProduct = async (token, form) => {
    return axios.post('http://localhost:3000/api/product', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const listProduct = async ( count = 20) => {
    return axios.get('http://localhost:3000/api/products/' + count)
}
export const ReadProduct = async (token, id,form) => {
    return axios.get('http://localhost:3000/api/product/' + id,form ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const RemoveProduct = async (token, id) => {
    console.log("remove product from frontend" ,id)
    return axios.delete('http://localhost:3000/api/product/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const UpdateProduct = async (token, id, form) => {
    console.log('this is from frontend')
    console.log("Id",id)
    console.log("Token",token)
    console.log("form",form)
    return axios.put('http://localhost:3000/api/product/' + id, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const uploadfile = async (token, form) => {
    console.log("from api frontend ", form)
    return axios.post('http://localhost:3000/api/product/images', {
        image: form
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removefile = async (token, publicId) => {
    console.log("publicId from frontend ", publicId)
    return axios.post('http://localhost:3000/api/product/removeimage',{publicId}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const searchProduct = async (arg) => {
    return axios.post('http://localhost:3000/api/search/filter',arg)
}