import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { IMAGE_SERVER } from '../../config'
import { addToCart } from '../../modules/cart'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import styles from '../../pages/MainPage/Main.module.scss'

export default function Card({ item, user }) {
  const { images, title, price } = item

  const history = useHistory()
  const dispatch = useDispatch()
  const onAddToCart = item => {
    if (user.userData.isAuth) {
      const body = {
        _id: item._id,
        title: item.title,
        price: item.price,
        images: item.images,
        count: 1,
      }
      dispatch(addToCart(body))
      history.push('/cart')
    } else {
      alert('로그인 후 이용해주세요')
    }
  }

  return (
    <div
      onClick={() => {
        onAddToCart(item)
      }}
      className={styles.CardContainer}
    >
      <img src={`${IMAGE_SERVER}${images}`} alt="메뉴사진" />
      <div className={styles.TextContainer}>
        <div>
          <h2>{title}</h2>
          <h3>
            {price.toLocaleString('ko-KR', {
              maximumFractionDigits: 2,
            })}{' '}
            원
          </h3>
        </div>
        <div className={styles.AddtoCart}>
          <p>카트에 담기</p>
          <ArrowForwardIosIcon fontSize="small" />
        </div>
      </div>
    </div>
  )
}
