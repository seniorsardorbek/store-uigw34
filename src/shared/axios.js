import axios from 'axios'

import Cookies from 'js-cookie'

const api  =  axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${Cookies.get("passport")}`
    }
})

export default  api