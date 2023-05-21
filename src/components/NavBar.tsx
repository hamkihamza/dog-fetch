import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import { AuthContext } from '../api/auth';


const styles = {
  navbar: {
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  navItems: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
  },
  navItem: {
    marginRight: '15px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

const Navbar = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      
      if (response.ok) {
        setAuth(false);
        navigate('/');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navItems}>
        <li style={styles.navItem}>
          <Link to="/search" style={styles.navLink}>Search</Link>
        </li>
      </ul>
      <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
