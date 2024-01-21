import React from 'react';
import { Layout } from 'antd'

const Footer: React.FC = () => {
    return (
        <Layout.Footer style={{ textAlign: 'center' }}>
        BrewJournal ©{new Date().getFullYear()} Created by Alex Hapgood
      </Layout.Footer>
    );
};

export default Footer;
