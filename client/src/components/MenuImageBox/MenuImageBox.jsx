import React from 'react'

import styles from './MenuImageBox.module.scss'

export default function MenuImageBox({ children, onDeleteImg }) {
  return (
    <div className={styles.Container}>
      <button type="button" className={styles.Button} onClick={onDeleteImg}>
        삭제
      </button>
      {children}
    </div>
  )
}
