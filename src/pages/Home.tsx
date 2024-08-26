
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Real-Time Whiteboard</h1>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
