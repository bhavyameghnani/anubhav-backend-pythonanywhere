import axios from 'axios';

export default axios.create({
    baseURL: "https://anubhavbackend.herokuapp.com/",
    headers: {
        "Content-type": "application/json"
    }
});