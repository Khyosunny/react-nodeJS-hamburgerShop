import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../modules/user'

import styles from '../RegisterPage/Register.module.scss'

export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()

  const { register, watch, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = data => {
    dispatch(loginUser(data))
      .then(response => {
        if (response.payload.loginSuccess) {
          history.push('/')
        } else {
          alert('아이디 또는 비밀번호를 다시 확인해주세요')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.Container}>
      <h2>로그인</h2>
      <form className={styles.FormContainer} onSubmit={handleSubmit(onSubmit)}>
        <label>이메일</label>
        <input
          name="email"
          type="email"
          ref={register({
            required: '이메일은 필수 항목입니다.',
            pattern: {
              value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: '이메일 형식이 맞지 않습니다.',
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <label>비밀번호</label>
        <input
          name="password"
          type="password"
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>비밀번호는 필수 항목 입니다.</p>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <p>6자 이상 입력해주세요.</p>
        )}

        <button type="submit">로그인</button>
        <Link to="/register" className={styles.RegisterBtn}>
          회원가입하러 가기
        </Link>
      </form>
    </div>
  )
}
