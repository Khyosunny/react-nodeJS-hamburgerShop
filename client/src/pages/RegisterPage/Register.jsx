import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../modules/user'

import styles from './Register.module.scss'

export default function Register() {
  const history = useHistory()
  const dispatch = useDispatch()

  const { register, watch, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  })
  const password = useRef()
  password.current = watch('password')

  const onSubmit = data => {
    console.log('data', data)
    dispatch(registerUser(data))
      .then(response => {
        if (response.payload.success) {
          history.push('/login')
        } else {
          alert('가입을 실패하였습니다')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.Container}>
      <h2>회원 가입</h2>
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
        <label>이름</label>
        <input name="name" ref={register({ required: true, maxLength: 10 })} />
        {errors.name && errors.name.type === 'required' && (
          <p>이름은 필수 항목 입니다.</p>
        )}
        {errors.name && errors.name.type === 'maxLength' && (
          <p>10글자 이상을 초과하였습니다.</p>
        )}
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
        <label>비밀번호 확인</label>
        <input
          name="password_confirm"
          type="password"
          ref={register({
            required: true,
            validate: value => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === 'required' && (
            <p>비밀번호 확인은 필수 항목 입니다.</p>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === 'minLength' && (
            <p>비밀번호가 일치하지 않습니다.</p>
          )}
        <button type="submit">가입하기</button>
      </form>
    </div>
  )
}
