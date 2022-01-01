import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { link, title } from './Header.module.css';

function Header() {
  const router = useRouter();
  return (
    <>
      <Head>
      </Head>
      <div style={{display: 'flex', marginBottom: '10px'}}>
        <div style={{flex: 1}}>
          <Link passHref href="/">
            <span className={title}>zoomroa.st</span>
          </Link>
        </div>
        {router.pathname.includes('help') ? (
          <Link href={'/'}>
            <a className={link}>Back</a>
          </Link>
        ) : (
          <Link href={'/help'}>
            <a className={link}>Help</a>
          </Link>
        )}
      </div>
    </>
  );
}

export default Header;
