import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context } from '../main';

const Navbar = () => {

  const {setIsAuthenticated, isAuthenticated} = useContext(Context);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:4000/api/v1/users/logout',
        {}, // Empty object for the request body
        { withCredentials: true }
      );

      toast.success(data.message);
      setIsAuthenticated(false)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {
        isAuthenticated && (
          <nav>
            <Link to={'/'}>HOME</Link>
            <Link onClick={handleLogout}>LOGOUT</Link>
          </nav>
        )
      }
    </>
  )
}

export default Navbar