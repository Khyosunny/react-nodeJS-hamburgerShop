import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { uploadMenu } from '../../modules/product'
import { FileUpload } from '../../components'
import styles from './UploadProduct.module.scss'

const menuSelect = [
  { key: 1, value: '햄버거세트' },
  { key: 2, value: '햄버거단품' },
  { key: 3, value: '음료' },
  { key: 4, value: '사이드' },
]

export default function UploadProductPage({ user }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const [menuTitle, setMenuTitle] = useState('')
  const [menuPrice, setMenuPrice] = useState(0)
  const [menu, setMenu] = useState(1)
  const [menuImages, setMenuImages] = useState([])

  const titleChangeHandler = e => {
    setMenuTitle(e.target.value)
  }
  const priceChangeHandler = e => {
    setMenuPrice(e.target.value)
  }

  const setMenuChangeHandler = e => {
    setMenu(e.target.value)
  }

  const updateImages = newImages => {
    setMenuImages(newImages)
  }

  const onSubmit = e => {
    e.preventDefault()
    if (!menuTitle || !menuPrice || !menu || !menuImages)
      return alert('빈칸을 채워주세요')

    const body = {
      writer: user.userData._id,
      title: menuTitle,
      price: menuPrice,
      menuType: menu,
      images: menuImages,
    }
    dispatch(uploadMenu(body)).then(response => {
      if (response.payload.success) {
        alert('메뉴 등록을 성공하였습니다')
        history.push('/')
      } else {
        alert('메뉴 등록을 실패하였습니다')
      }
    })
  }

  return (
    <div className={styles.Container}>
      <h2>메뉴 등록</h2>
      <form className={styles.FormContainer} onSubmit={e => onSubmit(e)}>
        <FileUpload refreshFunction={updateImages} />

        <label>메뉴 이름</label>
        <input onChange={titleChangeHandler} value={menuTitle} />

        <label>가격</label>
        <input onChange={priceChangeHandler} value={menuPrice} />

        <label>상품 타입</label>
        <select onChange={setMenuChangeHandler} value={menu}>
          {menuSelect.map(item => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <button type="submit" className={styles.productUploadButton}>
          확인
        </button>
      </form>
    </div>
  )
}
