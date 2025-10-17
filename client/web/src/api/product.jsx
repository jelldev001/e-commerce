import axios from "axios";
export const CreatProduct = async (token, form) => {
    return axios.post('http://localhost:3000/api/product', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const listProduct = async (token, count = 20) => {
    return axios.get('http://localhost:3000/api/products/' + count, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const ReadProduct = async (token, id) => {
    return axios.put('http://localhost:3000/api/product/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const UpdateProduct = async (token, id, form) => {
    console.log(id)
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

export const removefile = async (token, public_id) => {
    return axios.post('http://localhost:3000/api/product/removeimage', { public_id }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}