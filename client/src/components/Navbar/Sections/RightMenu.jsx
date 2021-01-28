import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logoutUser } from '../../../modules/user'

import classNames from 'classnames'

import styles from '../Navbar.module.scss'

export default function RightMenu({ hamburger, onMenuClose }) {
  const user = useSelector(state => state.user)
  const { cartDatas } = useSelector(state => state.cart)
  const history = useHistory()
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logoutUser())
      .then(reponse => {
        if (reponse.payload.success) {
          history.push('/login')
        } else {
          alert('로그아웃 실패')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <ul
      className={classNames(`${styles['RightMenuContainer']}`, {
        [styles['open']]: hamburger,
      })}
      onClick={onMenuClose}
    >
      {user.userData && !user.userData.isAuth ? (
        <>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/register">회원가입</Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/upload">메뉴 등록</Link>
          </li>
          <li>
            <Link to="/cart">
              딜리버리 카트({cartDatas.length > 0 ? cartDatas.length : 0})
            </Link>
          </li>
          <li>
            <button onClick={onLogout}>로그아웃</button>
          </li>
        </>
      )}
    </ul>
  )
}
