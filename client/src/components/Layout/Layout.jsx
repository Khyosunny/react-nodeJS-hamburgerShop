import React from 'react'
import Navbar from '../Navbar'
import styles from './Layout.module.scss'

export default function Layout({ children }) {
  return (
    <div className={styles.Container}>
      <Navbar />
      <div className={styles.Content}>{children}</div>
    </div>
  )
}
