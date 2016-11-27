import {POST_URL,GET_URL} from '../actions/types';
const Init = {
    newUrl:{url:null,error:null,status:false},
    getUrl:{url:null,error:null,status:false}
};

export default function (state = Init,action){
    switch(action.type){
        case POST_URL:
            return {...state,newUrl:{url:action.payload,error:null,status:true}}
        case GET_URL:
            return {...state,getUrl:{url:action.payload,error:null,status:true}}
        default:
            return state
    }
}
