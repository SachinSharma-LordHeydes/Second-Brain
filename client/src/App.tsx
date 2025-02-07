import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddContentModal from './components/pages/AddContentModal';
import Dashboard from './components/pages/Dashboard';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Home from './components/pages/Home';
import PrivateRoute from './components/pages/urils/PrivateRoute';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <AddContentModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/share/:hash" element={<Dashboard />} />

        {/* Protected route for dashboard */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
