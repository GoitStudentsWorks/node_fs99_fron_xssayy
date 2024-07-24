import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useDispatch } from 'react-redux';
// import { signIn } from '../../redux/auth/operations';
import { Link } from 'react-router-dom';
import style from './SignInForm.module.css';

const emailRegExp = /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

const minPasswordLength = 8;
const maxPasswordLength = 112;

const loginSchema = Yup.object({
  email: Yup.string()
    .required('Email is required!')
    .matches(emailRegExp, 'Entered email address is not valid')
    .email('Please enter a valid email address!'),
  password: Yup.string()
    .required('Password is required!')
    .min(minPasswordLength, 'Too short')
    .max(maxPasswordLength, 'Too long'),
});

const SignInForm = () => {
  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = data => {
    console.log(data);
    // dispatch(signIn(data)).then(action => {
    //   if (action.type === 'auth/signIn/fulfilled') {
    //     // Перенаправлення на TrackerPage після успішної авторизації
    //     window.location.href = '/tracker';
    //   }
    // });
    reset();
  };

  return (
    <div className={style.signInContainer}>
      <a href="/aquatrack-frontend" className={style.logo}>
        AQUATRACK
      </a>
      <div className={style.formContainer}>
        <h2 className={style.title}>Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.inputContainer}>
            <div className={style.inputItem}>
              <label className={style.label}>Email</label>
              <input
                className={`${style.field} ${
                  errors.email ? style.errorField : ''
                }`}
                type="email"
                {...register('email')}
                placeholder="Enter your email"
              />
              <p className={style.text}>{errors.email?.message}</p>
            </div>

            <div className={style.inputItem}>
              <label className={style.label}>Password</label>
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                className={`${style.field} ${
                  errors.password ? style.errorField : ''
                }`}
                placeholder="Enter your password"
              />
              <button
                onClick={() => toggleVisibility('password')}
                className={style.toggleVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              <p className={style.text}>{errors.password?.message}</p>
            </div>
          </div>
          <input className={style.button} type="submit" value="Sing In" />
        </form>
        <p className={style.redirect}>
          Don’t have an account?{' '}
          <Link to="/signup" className={style.redirectLink}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
