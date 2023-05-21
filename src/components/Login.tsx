import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { AuthContext } from '../api/auth';
import "./css/login.css"



const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(name, email);
      
      if (response.ok) {
        setAuth(true);
        navigate('/search');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      throw error
    }
  };

  
  return (
    <div className='main'>
    <div className="container">
  <h1>Login</h1>
  <form onSubmit={handleSubmit} className='form'>
    <label>
      Name:
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </label>
    <label>
      Email:
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
    </label>
    <input type="submit" value="Submit" />
  </form>
</div>
</div>
  );
};

export default Login;
