import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-parent'>
    <div className='signup-form'>
    <form className='signup-data' onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
      <tr>
          <td><label>User Name</label></td>
          <td><input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input></td>
      </tr>
      <tr>
          <td><label>Email</label></td>
          <td><input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input></td>
      </tr>
      <tr>
          <td><label>Password</label></td>
          <td><input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input></td>
      </tr>
      <tr>
          <td><label>Repeat Password</label></td>
          <td><input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input></td>
      </tr>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
    </div>
    </div>
  );
};

export default SignUpForm;
