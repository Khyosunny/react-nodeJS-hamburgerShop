import axios from 'axios'
import { USER_SERVER } from '../components/config'

// 액션 타입 생성
const REGISTER_USER = 'register_user'
const LOGIN_USER = 'login_user'
const AUTH_USER = 'auth_user'
const LOGOUT_USER = 'logout_user'

// 액션 함수 생성
export const registerUser = async dataToSubmit => {
  const request = await axios.post(`${USER_SERVER}/register`, dataToSubmit)
  return {
    type: REGISTER_USER,
    payload: request.data,
  }
}

// 리듀서 함수
export default function user(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        register: action.payload,
      }
    default:
      return state
  }
}
