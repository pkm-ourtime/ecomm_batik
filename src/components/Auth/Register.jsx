import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { register } from '../../services/AuthService'


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await register(username, email, password, role);

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const decodedUsername = decodedToken.username;
      const userRole = decodedToken.role;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', decodedUsername);
      localStorage.setItem('role', userRole);

      if (userRole === 'admin') {
        navigate('/dashboard-admin');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      console.error('Registration failed: ', err.message);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-[680px] flex flex-col'>
        <div className='bg-black p-2 rounded border border-orange-500'>
          <h1 className="font-bold text-center text-primary text-[30px] mb-5 mt-[70px]">Register</h1>
          <form id="formLogin" className='mb-[100px]' onSubmit={handleSubmit}>
            <div className="w-full lg:w-2/3 mx-auto">
              <div className="w-full px-4 mb-8">
                <label htmlFor="username" className="text-base text-primary font-bold">Username</label>
                <input type="username" id="username" placeholder='Username' className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary focus:bg-white" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="w-full px-4 mb-8">
                <label htmlFor="email" className="text-base text-primary font-bold">Email</label>
                <input type="email" id="email" placeholder='Example (name@gmail.com)' className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary focus:bg-white" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="w-full px-4 mb-8">
                <label htmlFor="password" className="text-base text-primary font-bold">Password</label>
                <input type="password" id="password" placeholder='***********' className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary focus:bg-white" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="w-full px-4 mb-8">
                <label htmlFor="role" className="text-base text-primary font-bold">Role</label>
                <select name="role" id="role" className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary focus:bg-white" value={role} onChange={(e) => setRole(e.target.value)} >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
              </div>
              <div className="w-full px-4 mb-4">
                <button className="text-base font-semibold text-white bg-primary py-3 px-8 rounded-full w-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out" type="submit">register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register