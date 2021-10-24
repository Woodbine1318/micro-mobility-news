import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <main className="w-screen min-h-screen bg-white">{children}</main>

      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
