import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);

      const token = response;
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const username = decodedToken.username;
      const userRole = decodedToken.role;
      
      console.log('User', username, 'logged in');
      
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
      localStorage.setItem('role', userRole);

      if (userRole === 'admin') {
        navigate('/dashboard-admin');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      console.error('Login failed: ', err.message);
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-[680px] flex flex-col'>
        <div className='bg-black p-2 rounded border border-orange-500'>
          <h1 className="font-bold text-center text-primary text-[30px] mb-5 mt-[70px]">Login</h1>
          <form id="formLogin" className='mb-[100px]' onSubmit={handleSubmit}>
            <div className="w-full lg:w-2/3 mx-auto">
              <div className="w-full px-4 mb-8">
                <label htmlFor="email" className="text-base text-primary font-bold">Email</label>
                <input type="email" id="email" placeholder='Example (name@gmail.com)' className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary focus:bg-white" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="w-full px-4 mb-8">
                <label htmlFor="password" className="text-base text-primary font-bold">Password</label>
                <input type="password" id="password" placeholder='***********' className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary focus:bg-white" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="w-full px-4 mb-4">
                 <p className='text-white'>Belum punya akun? <Link to='/register' className='text-blue-500' > Register </Link> </p> 
              </div>
              <div className="w-full px-4 mb-4">
                <button className="text-base font-semibold text-white bg-primary py-3 px-8 rounded-full w-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out" type="submit">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
