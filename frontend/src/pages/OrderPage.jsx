import { Store } from '../store.js'
import Loading from '../components/Loading'
import MessageBox from '../components/MessageBox'
import { useReducer } from 'react'

const reducer = (state, action ) => {
    switch(action.type){
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: ''};
            case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
            case 'FETCH_FAIL':
            return { ...state, loading: false, order: action.payload };
            default:
            return state
    }
     
}


export default function OrderPage(){
    const [{ loading, error, order }, dispatch ] = useReducer(reducer, {
        loading: true,
        error: '',
        order: {}
    })
    return (
        loading ? <Loading /> : error ? <MessageBox>{error}</MessageBox> : <div />
    )
}