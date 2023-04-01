import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-parent'>
    <div className='login-form'>
    <form className='login-data' onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
      <tr>
          <td><label htmlFor='email'>Email: </label></td>
          <td><input
          name='email'
          type='email'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          required
        /></td>
      </tr>
      <tr>
          <td><label htmlFor='password'>Password: </label></td>
          <td><input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          required
        /></td>
      </tr>


      </div>
      <div>


        <button type='submit'>Login</button>
        <button className="aa"
            onClick={() => {
              setEmail("demo@aa.io");
              setPassword("password");
            }}
          >
            Demo User
          </button>
      </div>
    </form>
    </div>
    </div>
  );
};

export default LoginForm;
