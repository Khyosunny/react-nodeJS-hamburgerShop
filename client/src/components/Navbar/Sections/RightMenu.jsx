import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logoutUser } from '../../../modules/user'

export default function RightMenu() {
  const user = useSelector(state => state.user)
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
    <ul>
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
        <li>
          <button onClick={onLogout}>로그아웃</button>
        </li>
      )}
    </ul>
  )
}
