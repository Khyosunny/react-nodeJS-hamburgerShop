import React from 'react'
import DaumPostcode from 'react-daum-postcode'

import styles from '../../pages/CartPage/Cart.module.scss'

export default function PostNum(props) {
  const handleComplete = data => {
    props.getPostData(data)
    props.isClose()
  }

  return (
    <div
      className={styles.PostNumContainer}
      onClick={() => {
        props.isClose()
      }}
    >
      <div className={styles.PostNumInner}>
        <DaumPostcode
          className={styles.DaumPost}
          onComplete={data => handleComplete(data)}
        />
      </div>
    </div>
  )
}
