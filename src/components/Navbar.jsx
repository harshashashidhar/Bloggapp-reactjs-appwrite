//src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from './container/Container'; 

const Navbar = () => {
  const userData = useSelector(state => state.auth.userData);

  return (
    <header className="bg-blue-600 text-white py-4">
      <Container>
        <h1 className="text-3xl font-bold">My Blog</h1>
        <nav>
           {/* Public Navigation Links  */}
          <NavLink 
            to="/" 
            className="mr-4 text-white hover:text-yellow-300" 
            activeClassName="text-yellow-500"
          >
            Home
          </NavLink>
          <NavLink 
            to="/all-posts" 
            className="mr-4 text-white hover:text-yellow-300" 
            activeClassName="text-yellow-500"
          >
            All Posts
          </NavLink>
          <NavLink 
                to="/logout" 
                className="mr-4 text-white hover:text-yellow-300" 
                activeClassName="text-yellow-500"
              >
                Logout
              </NavLink>

          {/* Conditional Navigation for Logged-in Users */}
          {userData && (
            <>
              <NavLink 
                to="/add-post" 
                className="mr-4 text-white hover:text-yellow-300" 
                activeClassName="text-yellow-500"
              >
                Add Post
              </NavLink>
              <NavLink 
                to="/logout" 
                className="mr-4 text-white hover:text-yellow-300" 
                activeClassName="text-yellow-500"
              >
                Logout
              </NavLink>
            </>
          )}

          {/* Conditional Navigation for Unauthenticated Users */}
          {!userData && (
            <>
              <NavLink 
                to="/login" 
                className="mr-4 text-white hover:text-yellow-300" 
                activeClassName="text-yellow-500"
              >
                Login
              </NavLink>
              <NavLink 
                to="/signup" 
                className="mr-4 text-white hover:text-yellow-300" 
                activeClassName="text-yellow-500"
              >
                Signup
              </NavLink>
            </>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
