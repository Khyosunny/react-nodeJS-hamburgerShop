import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  addToAddress,
  getAddress,
  removeAddress,
  AllDeleteFromCart,
} from '../../modules/cart'
import { PostNum, CartItem } from '../../components'
import AddIcon from '@material-ui/icons/Add'
import classNames from 'classnames'
import styles from './Cart.module.scss'

export default function Cart() {
  const [cartList, setCartList] = useState([])
  const [allPrice, setAllPrice] = useState(0)
  const [isPostOpen, setIsPostNum] = useState(false)
  const [addressChangeButtonOpen, setAddressChangeButtonOpen] = useState(false)
  const [postData, setPostData] = useState({
    postCode: '',
    address: '',
    detailAddress: '',
  })
  const [detailAddress, setDetailAddress] = useState('')
  const { cartDatas, addressDatas } = useSelector(state => state.cart)

  const history = useHistory()
  const dispatch = useDispatch()

  const onOrder = () => {
    if (cartDatas.length === 0) {
      alert('주문 가능한 상품이 없습니다')
    } else {
      if (addressDatas.length === 0) {
        return alert('배송주소를 입력해주세요')
      }
      dispatch(AllDeleteFromCart())
      alert('주문해주셔서 감사합니다')
      history.push('/')
    }
  }

  // 주소검색 팝업창 닫는 이벤트
  const isClose = () => {
    setIsPostNum(false)
  }

  // 주소검색 팝업창 여는 이벤트
  const isOpen = () => {
    setIsPostNum(true)
  }

  // 주소검색을 이용해 주소가져오는 이벤트
  const getPostData = data => {
    // 우편번호
    const postCode = data.zonecode
    // 주소
    const address = data.roadAddress
    setPostData({
      postCode,
      address,
      detailAddress,
    })
  }

  const onAddressSave = () => {
    const addressInfo = {
      postCode: postData.postCode,
      address: postData.address,
      detailAddress,
    }
    setAddressChangeButtonOpen(true)
    dispatch(addToAddress(addressInfo))
  }

  const onRemoveAndChangeAddress = () => {
    dispatch(removeAddress())
    setPostData({
      postCode: '',
      address: '',
    })
    setDetailAddress('')
    setAddressChangeButtonOpen(false)
  }

  const goBack = () => {
    history.goBack()
  }

  useEffect(() => {
    setCartList(cartDatas)
    dispatch(getAddress()).then(response => {
      if (response.payload) {
        setAddressChangeButtonOpen(true)
      }
    })
  }, [cartDatas])

  useEffect(() => {
    const price = cartList.reduce((acc, curr) => {
      return acc + curr.price * curr.count
    }, 0)
    setAllPrice(price)
  }, [cartList])

  return (
    <div className={styles.Container}>
      <h1>딜리버리 카트</h1>

      <div className={styles.ItemBox}>
        {cartList.length > 0 ? (
          cartList.map(item => <CartItem key={item._id} item={item} />)
        ) : (
          <h2>장바구니 내역이 없습니다!</h2>
        )}
      </div>

      <div className={styles.AddrBox}>
        {addressDatas.length === 0 ? (
          <>
            <div className={styles.AddrIntro}>
              <h2>배송주소</h2>
              <button onClick={onAddressSave}>저장</button>
            </div>

            <div className={styles.Addr}>
              <div className={styles.AddrText}>
                <h4>우편번호</h4>
                <p className={styles.AddrTextBor}>{postData.postCode}</p>
                <button onClick={isOpen}>주소찾기</button>
              </div>
              <div className={styles.AddrText}>
                <h4>주소</h4>
                <p className={styles.AddrTextBor}>{postData.address}</p>
              </div>
            </div>

            <div className={styles.Addr}>
              <div className={styles.AddrText}>
                <h4>상세주소</h4>
                <input
                  type="text"
                  onChange={e => setDetailAddress(e.target.value)}
                  value={detailAddress}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.AddrIntro}>
              <h2>배송주소</h2>
              {addressChangeButtonOpen ? (
                <button onClick={onRemoveAndChangeAddress}>주소변경</button>
              ) : (
                <button onClick={onAddressSave}>저장</button>
              )}
            </div>

            <div className={styles.Addr}>
              <div className={styles.AddrText}>
                <h4>우편번호</h4>
                <p
                  className={classNames(`${styles['AddrTextBor']}`, {
                    [styles['active']]: addressChangeButtonOpen,
                  })}
                >
                  {addressDatas.length > 0
                    ? addressDatas[0].postCode
                    : postData.postCode}
                </p>
                {addressChangeButtonOpen ? null : (
                  <button onClick={isOpen}>주소찾기</button>
                )}
              </div>
              <div className={styles.AddrText}>
                <h4>주소</h4>
                <p
                  className={classNames(`${styles['AddrTextBor']}`, {
                    [styles['active']]: addressChangeButtonOpen,
                  })}
                >
                  {addressDatas.length > 0
                    ? addressDatas[0].address
                    : postData.address}
                </p>
              </div>
            </div>

            <div className={styles.Addr}>
              <div className={styles.AddrText}>
                <h4>상세주소</h4>
                {addressDatas.length > 0 ? (
                  <p
                    className={classNames(`${styles['AddrTextBor']}`, {
                      [styles['active']]: addressChangeButtonOpen,
                    })}
                  >
                    {addressDatas[0].detailAddress}
                  </p>
                ) : (
                  <input
                    type="text"
                    onChange={e => setDetailAddress(e.target.value)}
                    value={detailAddress}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className={styles.AllPrice}>
        <h2>총 주문금액</h2>
        <p>
          {allPrice?.toLocaleString('ko-KR', {
            maximumFractionDigits: 2,
          })}{' '}
          원
        </p>
      </div>

      <div className={styles.BtnBox}>
        <button onClick={goBack}>
          메뉴 추가
          <AddIcon fontSize="large" />
        </button>
        <button className={styles.Order} onClick={onOrder}>
          주문하기
        </button>
      </div>
      {isPostOpen && <PostNum isClose={isClose} getPostData={getPostData} />}
    </div>
  )
}
