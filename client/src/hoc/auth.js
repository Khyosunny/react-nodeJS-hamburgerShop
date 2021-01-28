import React, { useEffect } from 'react'
import { auth } from '../modules/user'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function authFun(SpecificComponent, option, adminRoute = null) {
  const AuthenticationCheck = props => {
    let user = useSelector(state => state.user)
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(auth()).then(response => {
        // 로그인을 안한 사람이
        if (!response.payload.isAuth) {
          // 로그인해야 접속 가능한 페이지에 들어갔을 때
          if (option) {
            alert('로그인이 필요한 페이지입니다.')
            history.push('/login')
          }
        } else {
          // 로그인을 했지만 관리자가 아닌 사람
          if (adminRoute && !response.payload.isAdmin) {
            history.push('/')
          } else {
            // 로그인을 한 사람은 로그인 페이지,회원가입 페이지 접속불가처리
            if (option === false) {
              history.push('/')
            }
          }
        }
      })
    }, [])

    return <SpecificComponent {...props} user={user} />
  }
  return AuthenticationCheck
}
