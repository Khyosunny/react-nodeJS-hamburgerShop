import React from 'react'
import { useLocation } from 'react-router-dom'

import styles from './PathName.module.scss'

export default function PathName() {
  const loaction = useLocation()
  const menu = {
    '/': '메뉴',
    '/cart': '딜리버리 카트',
    '/upload': '메뉴 등록',
    '/login': '로그인',
    '/register': '회원가입',
  }
  return (
    <div className={styles.Container}>
      <div className={styles.Inner}>
        <p>
          딜리버리 {'>'} {menu[loaction.pathname]}
        </p>
      </div>
    </div>
  )
}
