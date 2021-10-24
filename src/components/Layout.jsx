import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen flex-nowrap">
      <main className="flex-1 w-screen bg-white">{children}</main>

      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
