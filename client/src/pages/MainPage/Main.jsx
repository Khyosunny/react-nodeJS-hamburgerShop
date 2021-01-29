import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../../modules/product'
import classNames from 'classnames'
import { Card } from '../../components'

import styles from './Main.module.scss'

const menuName = [
  { id: 1, name: '세트', label: 'setMenu', active: true },
  { id: 2, name: '단품', label: 'singleMenu', active: false },
  { id: 3, name: '음료', label: 'drink', active: false },
  { id: 4, name: '사이드', label: 'side', active: false },
]

export default function Main({ user }) {
  const { products } = useSelector(state => state.product)
  const dispatch = useDispatch()

  const [menuList, setMenuList] = useState(menuName)
  const [productList, setProductList] = useState([])

  const productFilter = item => {
    const label = products[`${item.label}`]
    setProductList(label)
  }

  const onMenuClick = item => {
    productFilter(item)
    const arr = menuList.map(test => ({
      ...test,
      active: test.id === item.id ? true : false,
    }))
    setMenuList(arr)
  }

  useEffect(() => {
    dispatch(getProducts())
  }, [])
  useEffect(() => {
    if (!products) return
    setProductList(products.setMenu)
  }, [products])

  return (
    <div className={styles.Container}>
      <div className={styles.IntroContainer}>
        <h1>메뉴</h1>
        <p>{process.env.REACT_APP_SERVER_BASE_URL}</p>
        <div>
          {menuList.map(item => {
            return (
              <button
                className={classNames(`${styles['Button']}`, {
                  [styles['active']]: item.active,
                })}
                onClick={() => onMenuClick(item)}
                key={item.id}
              >
                {item.name}
              </button>
            )
          })}
        </div>
      </div>
      <div className={styles.MenuContainer}>
        {productList &&
          productList.map(item => (
            <Card key={item._id} item={item} user={user} />
          ))}
      </div>
    </div>
  )
}
