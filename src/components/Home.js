import React from 'react';
import Feed from './Feed';
import '../App.css';

function Home({ setCurrentPage, currentUser }) {
  return (
    <Feed currentUser={currentUser} setCurrentPage={setCurrentPage} />
  );
}

export default Home;