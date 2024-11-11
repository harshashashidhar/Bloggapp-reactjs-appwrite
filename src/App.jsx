// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'; 
// import { useSelector } from 'react-redux';
// import Home from './pages/Home';
// import AllPosts from './pages/AllPosts';
// import Post from './pages/Post';
// import AddPost from './pages/AddPost';
// import EditPost from './pages/EditPost';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Container from './components/container/Container';
// import PrivateRoute from './components/PrivateRoute';

// const App = () => {
//   const userData = useSelector(state => state.auth.userData); // Access user data from Redux store

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100">
//         {/* Navbar with NavLink */}
//         <header className="bg-blue-600 text-white py-4">
//           <Container>
//             <h1 className="text-3xl font-bold">My Blog</h1>
//             <nav>
//               <NavLink 
//                 to="/" 
//                 className="mr-4 text-white hover:text-yellow-300" 
//                 activeClassName="text-yellow-500"
//               >
//                 Home
//               </NavLink>
//               <NavLink 
//                 to="/all-posts" 
//                 className="mr-4 text-white hover:text-yellow-300" 
//                 activeClassName="text-yellow-500"
//               >
//                 All Posts
//               </NavLink>

//               {/* Conditional navigation for authenticated users */}
//               {userData && (
//                 <>
//                   <NavLink 
//                     to="/add-post" 
//                     className="mr-4 text-white hover:text-yellow-300" 
//                     activeClassName="text-yellow-500"
//                   >
//                     Add Post
//                   </NavLink>
//                   <NavLink 
//                     to="/login" 
//                     className="mr-4 text-white hover:text-yellow-300" 
//                     activeClassName="text-yellow-500"
//                   >
//                     Logout
//                   </NavLink>
//                 </>
//               )}

//               {/* Navigation for unauthenticated users */}
//               {!userData && (
//                 <>
//                   <NavLink 
//                     to="/login" 
//                     className="mr-4 text-white hover:text-yellow-300" 
//                     activeClassName="text-yellow-500"
//                   >
//                     Login
//                   </NavLink>
//                   <NavLink 
//                     to="/signup" 
//                     className="mr-4 text-white hover:text-yellow-300" 
//                     activeClassName="text-yellow-500"
//                   >
//                     Signup
//                   </NavLink>
//                 </>
//               )}
//             </nav>
//           </Container>
//         </header>

//         {/* Main content area */}
//         <main className="py-8">
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/all-posts" element={<AllPosts />} />
//             <Route path="/post/:slug" element={<Post />} />

//             {/* Protected Routes (only accessible if the user is logged in) */}
//             <Route
//               path="/add-post"
//               element={<PrivateRoute element={<AddPost />} />}
//             />
//             <Route
//               path="/edit-post/:slug"
//               element={<PrivateRoute element={<EditPost />} />}
//             />

//             {/* Authentication Routes */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// };

// export default App;
//src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import AllPosts from './pages/AllPosts';
import Post from './pages/Post';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Container from './components/container/Container';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar'; 
import Logout from './components/Logout'; 

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar is now a separate component */}
        <Navbar />

        {/* Main content area */}
        <main className="py-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/all-posts" element={<AllPosts />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/logout" element={<Logout />} />
            
            
            {/* Protected Routes */}
            <Route
              path="/add-post"
              element={<PrivateRoute element={<AddPost />} />}
            />
            <Route
              path="/edit-post/:slug"
              element={<PrivateRoute element={<EditPost />} />}
            />
             {/* <Route
              path="/logout"
              element={<PrivateRoute element={<Logout />} />}
            /> */}

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
