import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import * as styles from './help.module.css';

const Help = () => (
  <>
    <Head>
      <title>zoomroast - help</title>
    </Head>
    <Header/>
      <h2>What's a zoomroast?</h2>
      <p className={styles.paragraph}>
        A zoomroast is a meme format that typically is used to heap ridicule upon an individual
        in a group photo, or other photo with many subjects or details. The individual may be making
        a funny face, doing something stupid or reacting to something else happening in the image.
        Whatever the case, the image has a lot of details and this interesting aspect needs to be highlighted
        so that everyone can enjoy it.
      </p>
      <p className={styles.paragraph}>
        The zoomroast is a vertical arrangement of images, where each successive image is a cropped-in
        version of the previous image. With each image, the intended subject is made more and more the
        primary subject of the image until, typically, the individual is the only subject and is divorced
        from the context of the larger image.
      </p>
      <h2>Ok thanks for explaining the joke, now how do I make one of these?</h2>
      <ol className={styles.paragraph}>
        <li>
          Upload a .jpg or .png image file by dragging and dropping over the area in the dotted lines
          or by clicking the link.
        </li>
        <li>
          Drag the box by clicking inside the yellow lines or by dragging the yellow squares at the corners.
          You can zoom in and out of the image using the mousewheel and pan the image by dragging outside
          of the yellow box.
        </li>
        <li>
          The size and position of the yellow box determines the bounds last frame of your zoomroast.
          Position and size it tightly around your subject of ridicule for maximum effect.
        </li>
        <li>
          Once you're happy with your last frame, use the select below the image to pick the number of frames.
          Some zoomroasts work best with more, some work better with less. Experiment to find the ideal
          number of frames for your roast.
        </li>
        <li>
          Click the "Generate" button to create your zoomroast. Right click on the image and choose
          "Save Image As" to download your image to share in your social platform of choice.
        </li>
      </ol>
  </>
);

export default Help;
