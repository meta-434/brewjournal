import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import LoginLogout from './LoginLogout';

const items = [
    { 
      key: '1',
      label: (<Link to={'/'}>Home</Link>) 
    },
    {
      key: '2',
      label: (<Link to={'/recipes'}>Explore</Link>),
    },
    {
      key: '3',
      label: (<Link to={'/create'}>Create</Link>)
    },
    { key: '4', label: 'About', path: '/about' },
    { key: '5', label: 'Register', path: '/register' },
    { 
      key: '6',
      label: (<Link to={'/login'}>Login</Link>)
    },
    { 
      key: '7',
      label: (<Link to={'/logout'}>Logout</Link>)
    },
    {
      key: '8',
      label: <Link to={'/profile'}>Profile</Link>,
    }
  ];

const Header: React.FC = () => {
    return (
        <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="logo" >
          <h1>☕📖</h1>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Layout.Header>
    );
};

export default Header;
