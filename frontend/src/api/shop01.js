import axios from "axios";

export default async function getData() {
    try {
        const { data } = await axios.post(`http://localhost:5000/shop01/products`);
        return data;

    } catch (error) {
        console.log(error);
    }
}