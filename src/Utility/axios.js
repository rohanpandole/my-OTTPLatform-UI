import axios from 'axios';

const userToken = localStorage.getItem("userToken");

export default axios.create({
    baseURL: 'https://localhost:7005'
});