import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import Help from '../components/Help';

function HelpPage() {
  return (
    <>
      <Head>
        <title>zoomroast - help</title>
      </Head>
      <Header/>
      <Help />
    </>
  );
}

export default HelpPage;
