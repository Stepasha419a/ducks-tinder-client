import authImg from '../../assets/images/auth/img-01.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setFormError } from '../../redux/authReducer';
import { Link, useNavigate } from 'react-router-dom';
import { AppStateType } from '../../redux/reduxStore';

const LoginForm = (props: {formError: string}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isAuth = useSelector((state: AppStateType) => state.authPage.isAuth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [emailError, setEmailError] = useState('Email can\'t be empty')
  const [passwordError, setPasswordError] = useState('Password can\'t be empty')
  const [isFormValid, setIsFormValid] = useState(false)
  
  useEffect(() => {
    if(emailError || passwordError) {
      setIsFormValid(false)
    } else {
      setIsFormValid(true)
    }
  }, [emailError, passwordError])

  useEffect(() => {
    if(isAuth) {
        navigate('/')
    }
  }, [isAuth, navigate])

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Incorrect email')
    } else {
      setEmailError('')
    }
  }

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if(e.target.value.length < 6 || e.target.value.length > 30) {
      setPasswordError('Password has to be more 6 and less 30')
      if(!e.target.value) {
        setPasswordError('Password can\'t be empty')
      }
    } else{
      setPasswordError('')
    }
  }

  const blurHandler = (event: ChangeEvent<HTMLInputElement>) => {
    switch(event.target.name) {
      case 'email':
        setEmailDirty(true)
        dispatch(setFormError(''))
        break
      case 'password':
        setPasswordDirty(true)
        dispatch(setFormError(''))
        break
    }
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if(!emailError && !passwordError) {
      dispatch(login({email, password}) as any)
    }
  }

  return (
      <div className="auth-form">
        <div className="auth-form__container">
          <div className="auth-form__wrap">
            <div className="auth-form__img">
                <img src={authImg} alt="IMG"/>
            </div>
            <form onSubmit={e => submitHandler(e as FormEvent<HTMLFormElement>)} className="auth-form__form">
              <span className="auth-form__title">
                Member Login
              </span>

              {props.formError && 
                <span className="auth-form__validation">
                  <div>{props.formError}</div>
                </span>
              }

              <span className="auth-form__validation">
                {(emailDirty && emailError) && <div>{emailError}</div> }
              </span>
              <div className="auth-form__input-wrap">
                <input 
                  className="auth-form__input" 
                  name="email"
                  type="text" 
                  placeholder="Email" 
                  onBlur={e => blurHandler(e)}
                  value={email} 
                  onChange={e => emailHandler(e)}
                />
                <span className="auth-form__symbol-input">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>

              <span className="auth-form__validation">
                {(passwordDirty && passwordError) && <div>{passwordError}</div> }
              </span>
              <div className="auth-form__input-wrap">
                <input 
                  className="auth-form__input"
                  name="password"
                  type="password" 
                  placeholder="Password" 
                  onBlur={e => blurHandler(e)}
                  value={password} 
                  onChange={e => passwordHandler(e)}
                />
                <span className="auth-form__symbol-input">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>

              <div className="auth-form__container-btn">
                <button disabled={!isFormValid} type='submit' className={"auth-form__submit-btn" + (isFormValid ? "" : " auth-form__disabled-submit-btn")}>
                  Login
                </button>
              </div>
              <div className="text-center p-t-136 auth-form__create-account">
                <Link className="auth-form__create-account-link" to='/reg'>
                  Create your Account &nbsp;
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default LoginForm