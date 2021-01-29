import React from 'react'
import Navbar from '../Navbar'
import PathName from '../PathName'
import Footer from '../Footer'
import styles from './Layout.module.scss'

export default function Layout({ children }) {
  return (
    <div className={styles.Container}>
      <Navbar />
      <div className={styles.Content}>
        <PathName />
        {children}
      </div>
      <Footer />
    </div>
  )
}
