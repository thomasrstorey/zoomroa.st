import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { link, title } from './Header.module.css';

const Header = () => (
  <>
  <Head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-131308605-1" key="gtag"></script>
    <script dangerouslySetInnerHTML={{__html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-131308605-1');
    `}} key="gtag-config"></script>
  </Head>
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
  </>
);

export default Header;
