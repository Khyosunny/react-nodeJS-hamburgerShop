import React from 'react'

import GitHubIcon from '@material-ui/icons/GitHub'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.Container}>
      <a
        href="https://github.com/Khyosunny/react-nodeJS-hamburgerShop"
        target="_blank"
      >
        <GitHubIcon fontSize="large" />
      </a>
      <p>Copyrightⓒ2021. Kim hyo sun. All rights reserved.</p>
    </footer>
  )
}
