import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import PostDataPage from './components/pages/Postdata';
import GetDataPage from './components/pages/Getdata';
import HomePage from './components/pages/Homepage';
import { Box } from '@mui/material';

function App() {
  return (
    <Router>
      <Box display="flex">
        <Sidebar />
        <Box flex={1} p={3}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/postdata" element={<PostDataPage />} />
            <Route path="/getdata" element={<GetDataPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}


export default App;
