import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IMAGE_SERVER } from '../../config'
import {
  deleteFromCart,
  increaseCount,
  DecreaseCount,
} from '../../modules/cart'

import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

import styles from '../../pages/CartPage/Cart.module.scss'

export default function CartItem({ item }) {
  const [price, setPrice] = useState(item.price)

  const dispatch = useDispatch()

  useEffect(() => {
    setPrice(item.price * item.count)
  }, [item.count])

  return (
    <>
      <div className={styles.CartItemContainer}>
        <button
          className={styles.Close}
          onClick={() => {
            dispatch(deleteFromCart(item._id))
          }}
        >
          <CloseIcon />
        </button>

        <div className={styles.CartMid}>
          <div className={styles.TextAlign}>
            <h1>{item.title}</h1>
            <h2>
              {item.price.toLocaleString('ko-KR', {
                maximumFractionDigits: 2,
              })}{' '}
              원
            </h2>
          </div>
          <img src={`${IMAGE_SERVER}${item.images}`} alt="음식사진" />
        </div>

        <div className={styles.CartBottom}>
          <div className={styles.CountBox}>
            <button
              className={styles.Minus}
              onClick={() => {
                dispatch(DecreaseCount(item._id))
              }}
            >
              <RemoveIcon />
            </button>
            <h2 className={styles.Count}>{item.count}개</h2>
            <button
              className={styles.Plus}
              onClick={() => {
                dispatch(increaseCount(item._id))
              }}
            >
              <AddIcon />
            </button>
          </div>

          <div className={styles.TotalPrice}>
            <p>합계금액</p>
            <h3>
              {price?.toLocaleString('ko-KR', {
                maximumFractionDigits: 2,
              })}{' '}
              원
            </h3>
          </div>
        </div>
      </div>
    </>
  )
}
