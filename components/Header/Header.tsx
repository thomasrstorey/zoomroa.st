import Link from 'next/link';
import React from 'react';
import { link, title } from './Header.css';

const Header = () => (
  <div style={{display: 'flex', marginBottom: '10px'}}>
    <div style={{flex: 1}}>
      <Link href="/">
        <span className={title}>zoomroa.st</span>
      </Link>
    </div>
    <Link href="/help">
      <a className={link}>Help</a>
    </Link>
  </div>
);

export default Header;
