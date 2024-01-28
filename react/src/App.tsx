import React from 'react';
import { Layout } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {

  return (
    <Layout>
      <Header />
      <Outlet />
      <Footer />
    </Layout>
  );
};

export default App;