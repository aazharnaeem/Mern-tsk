import axios from "axios";
import http from '../../utils/Api'
import { add, get, remove, update } from "../actionTypes/types";
import jwt_decode from 'jwt-decode';



const getNews = () => async (dispatch) => {
    const token = localStorage.getItem('accessToken');
     let {id} = jwt_decode(token)
    try {
        const res = await http.get(`/api/user/News/${id}`, http.generateConfig(token))
        if (res) {
            dispatch({
                type: get,
                payload: res.result
            })
        }
    }
    catch (err) {
        console.log(err.response.data.message);
    }
}

const addNews = (data) => async dispatch => {
    try {


        const res = await http.post(`/api/example/News`, data, http.generateConfig(token))
        if (res) {
            dispatch({
                type: add,
                payload: res.result
            })  
        }

    }
    catch (error) {
        console.log(error.response.data.message)
    }
}
const updateNews = (data) => async (dispatch) => {
    try {
        // config['x.access-Token'] = `${token}`

        const res = await http.put(`api/example/News/${data.id}`,data, http.generateConfig(token))
        if (res) {
            dispatch({
                type: update,
                payload: res.result
            })
        }
    }
    catch (error) {
        console.log(error.response.data.message)
    }
}
const removeNews = (data) => async (dispatch) => {
    try {
        
        // config['x.access-Token'] = `${token}`

        const res = await http.post(`/api/example/News/delete/${data}`, http.generateConfig(token));
        dispatch({
            type: remove,
            payload: data
        });
    }
    catch (error) {
        console.log(error.response.data.message)
    }
}



export {
    getNews,
    addNews,
    updateNews,
    removeNews,
}