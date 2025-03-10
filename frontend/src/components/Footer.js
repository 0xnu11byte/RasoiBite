import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="text-center py-3 fixed-bottom" style={{ background: '#222', color: '#fff' }}>
      <Container>
        <p>© {new Date().getFullYear()} Rasoi Bite. All Rights Reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
