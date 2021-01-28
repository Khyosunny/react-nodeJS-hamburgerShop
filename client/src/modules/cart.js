import axios from 'axios'
import { USER_SERVER } from '../config'
//액션 타입 생성
const ADD_TO_CART = 'add_to_cart'
const DELETE_FROM_CART = 'delete_from_cart'
const INC_COUNT = 'inc_count'
const DEC_COUNT = 'dec_count'
const ADD_TO_ADDRESS = 'add_to_address'
const GET_ADDRESS = 'get_address'
const REMOVE_ADDRESS = 'remove_address'

//액션 함수 생성
export const addToCart = cartData => ({ type: ADD_TO_CART, cartData })
export const deleteFromCart = _id => ({ type: DELETE_FROM_CART, _id })
export const increaseCount = _id => ({ type: INC_COUNT, _id })
export const DecreaseCount = _id => ({ type: DEC_COUNT, _id })
export const addToAddress = async data => {
  try {
    const request = await axios.post(`${USER_SERVER}/addToAddress`, data, {
      withCredentials: true,
    })
    return {
      type: ADD_TO_ADDRESS,
      payload: request.data,
    }
  } catch (e) {
    console.log(e)
  }
}
export const getAddress = async () => {
  try {
    const request = await axios.get(`${USER_SERVER}/userAddress`, {
      withCredentials: true,
    })
    return {
      type: GET_ADDRESS,
      payload: request.data,
    }
  } catch (e) {
    console.log(e)
  }
}

export const removeAddress = async () => {
  try {
    const request = await axios.get(`${USER_SERVER}/removeUserAddress`, {
      withCredentials: true,
    })
    return {
      type: REMOVE_ADDRESS,
      payload: request.data,
    }
  } catch (e) {
    console.log(e)
  }
}

//초기 스테이트
const INITIAL_STATE = {
  cartDatas: [],
  addressDatas: [],
}

//리듀서
export default function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TO_CART:
      let duplicate = false
      let result
      state.cartDatas.forEach(item => {
        if (item._id === action.cartData._id) {
          duplicate = true
        }
      })

      if (duplicate) {
        result = state.cartDatas.map(item =>
          item._id === action.cartData._id
            ? { ...item, count: item.count + 1 }
            : item,
        )
      } else {
        result = state.cartDatas.concat(action.cartData)
      }

      return {
        ...state,
        cartDatas: result,
      }
    case DELETE_FROM_CART:
      return {
        ...state,
        cartDatas: state.cartDatas.filter(item => item._id !== action._id),
      }
    case INC_COUNT:
      return {
        ...state,
        cartDatas: state.cartDatas.map(item =>
          item._id === action._id ? { ...item, count: item.count + 1 } : item,
        ),
      }
    case DEC_COUNT:
      return {
        ...state,
        cartDatas: state.cartDatas.map(item =>
          item._id === action._id
            ? { ...item, count: item.count > 1 ? item.count - 1 : 1 }
            : item,
        ),
      }
    case ADD_TO_ADDRESS:
      return {
        ...state,
        addressDatas: action.payload,
      }
    case GET_ADDRESS:
      return {
        ...state,
        addressDatas: action.payload,
      }
    case REMOVE_ADDRESS:
      return {
        ...state,
        addressDatas: action.payload,
      }
    default:
      return state
  }
}
