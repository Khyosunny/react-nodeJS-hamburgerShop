import axios from 'axios'
import { PRODUCT_SERVER } from '../config'

// 액션 타입 생성
const UPLOAD_IMAGES = 'upload_images'
const UPLOAD_MENU = 'upload_menu'
const GET_PRODUCTS = 'get_products'

// 액션 함수 생성
export const uploadImages = async data => {
  try {
    const request = await axios.post(`${PRODUCT_SERVER}/image`, data, {
      header: { 'content-type': 'multipart/fomr-data' },
      withCredentials: true,
    })
    return {
      type: UPLOAD_IMAGES,
      payload: request.data,
    }
  } catch (e) {
    console.log(e)
  }
}

export const uploadMenu = async body => {
  try {
    const request = await axios.post(`${PRODUCT_SERVER}`, body, {
      withCredentials: true,
    })
    return {
      type: UPLOAD_MENU,
      payload: request.data,
    }
  } catch (e) {
    console.log(e)
  }
}

export const getProducts = async body => {
  try {
    const request = await axios.post(`${PRODUCT_SERVER}/products`, body, {
      withCredentials: true,
    })
    return {
      type: GET_PRODUCTS,
      payload: request.data,
    }
  } catch (e) {
    console.log(e)
  }
}

// 리듀서 함수
export default function productReducer(state = {}, action) {
  switch (action.type) {
    case UPLOAD_IMAGES:
      return {
        ...state,
        uploadImageSuccess: action.payload,
      }
    case UPLOAD_MENU:
      return {
        ...state,
        uploadProductSuccess: action.payload,
      }
    case GET_PRODUCTS:
      const menu = action.payload
      const setMenu = menu.data.filter(item => item.menuType === 1)
      const singleMenu = menu.data.filter(item => item.menuType === 2)
      const drink = menu.data.filter(item => item.menuType === 3)
      const side = menu.data.filter(item => item.menuType === 4)
      return {
        ...state,
        products: {
          setMenu,
          singleMenu,
          drink,
          side,
        },
      }

    default:
      return state
  }
}
