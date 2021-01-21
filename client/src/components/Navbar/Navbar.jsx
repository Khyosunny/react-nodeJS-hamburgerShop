import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { RightMenu } from './Sections'

import styles from './Navbar.module.scss'

export default function Navbar() {
  const user = useSelector(state => state.user)
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <div className={styles.Container}>
      <nav className={styles.NavContainer}>
        <ul>
          <li>
            <Link to="/">
              <h1>햄버거 딜리버리</h1>
            </Link>
          </li>
        </ul>
        <RightMenu />
      </nav>
    </div>
  )
}
