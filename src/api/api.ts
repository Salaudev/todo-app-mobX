import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000/', // Change this to your actual API URL
    headers: {
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    }
})

export default instance;