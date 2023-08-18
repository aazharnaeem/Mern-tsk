import axios from 'axios'
import http from '../../utils/Api'
import { loginType, registerType } from '../actionTypes/types';
import "react-toastify/dist/ReactToastify.css";


const signin =(data)=>async(dispatch)=>{
    try{
        console.log(data,":THAHASD")
        const res = await http.post('/api/auth/login', data);
        console.log(res.data,"THE ASD")
            dispatch({
                type: 'login',
                payload: res
            })
    }
    catch(error){
        console.log(error)
    }
}

const signup =(data)=>async (dispatch)=>{
    try{
        const dat = await http.post('/api/auth/register', data);  

    }
    catch(err){
    }
}



export {
    signin,
    signup,
}