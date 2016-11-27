import axios from 'axios'
import {POST_URL,GET_URL} from './types';
const ROOT_URL = 'http://localhost:8000';

export const postUrl = (long_url)=> {
    return (dispatch) =>{  
        axios.post(`${ROOT_URL}/`,{long_url:long_url})
            .then(response =>{
                dispatch({
                    type:POST_URL,
                    payload:response
                })
            })
    }
};
export const getLongUrl = (short_url)=> {
    return (dispatch) =>{  
        axios.get(`${ROOT_URL}/${short_url}`)
            .then(response =>{
                dispatch({
                    type:GET_URL,
                    payload:response
                })
            })
    }
};
