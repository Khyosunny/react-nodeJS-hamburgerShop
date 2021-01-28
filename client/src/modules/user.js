import axios from 'axios'
import { USER_SERVER } from '../config'

// 액션 타입 생성
const REGISTER_USER = 'register_user'
const LOGIN_USER = 'login_user'
const AUTH_USER = 'auth_user'
const LOGOUT_USER = 'logout_user'

// 액션 함수 생성
export const registerUser = async data => {
  try {
    const request = await axios.post(`${USER_SERVER}/register`, data, {
      withCredentials: true,
    })
    return {
      type: REGISTER_USER,
      payload: request.data,
    }
  } catch (e) {
    console.log(e)
  }
}

export const loginUser = async data => {
  try {
    const request = await axios.post(`${USER_SERVER}/login`, data, {
      withCredentials: true,
    })
    return {
      type: LOGIN_USER,
      payload: request.data,
    }
  } catch (e) {
    console.log(e)
  }
}

export const auth = async () => {
  try {
    const request = await axios.get(`${USER_SERVER}/auth`, {
      withCredentials: true,
    })
    return {
      type: AUTH_USER,
      payload: request.data,
    }
  } catch (e) {
    console.log(e)
  }
}

export const logoutUser = async () => {
  try {
    const request = await axios.get(`${USER_SERVER}/logout`, {
      withCredentials: true,
    })
    return {
      type: LOGOUT_USER,
      payload: request.data,
    }
  } catch (e) {
    console.log(e)
  }
}

// 리듀서 함수
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        register: action.payload,
      }
    case LOGIN_USER:
      return {
        ...state,
        loginSucces: action.payload,
      }
    case AUTH_USER:
      return {
        ...state,
        userData: action.payload,
      }
    case LOGOUT_USER:
      return {
        ...state,
        logoutSucces: action.payload,
      }
    default:
      return state
  }
}
