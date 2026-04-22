import axios from "axios";
export const AddUserCart = async (token, cart) => {
    return axios.post('http://localhost:3000/api/user/cart', cart, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}