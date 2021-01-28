import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { RightMenu } from './Sections'

import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import styles from './Navbar.module.scss'

export default function Navbar() {
  const [hamburger, setHamburger] = useState(false)

  const onMenuToggle = () => {
    setHamburger(!hamburger)
  }

  const onMenuClose = () => {
    setHamburger(false)
  }
  return (
    <div className={styles.Container}>
      <nav className={styles.NavContainer}>
        <button className={styles.HamburgerBtn} onClick={onMenuToggle}>
          {hamburger ? (
            <CloseIcon fontSize="large" />
          ) : (
            <MenuIcon fontSize="large" />
          )}
        </button>
        <Link to="/">
          <h1>햄버거 딜리버리</h1>
        </Link>
        <RightMenu hamburger={hamburger} onMenuClose={onMenuClose} />
      </nav>
    </div>
  )
}
