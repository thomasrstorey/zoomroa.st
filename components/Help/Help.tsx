import React from 'react';

import * as styles from './Help.module.css';

function Help() {
  return (
    <article style={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <section style={{maxWidth: 600}}>
        <h2>What&apos;s a zoomroast?</h2>
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
        <h2>How do I make a zoomroast?</h2>
        <ol className={styles.paragraph}>
          <li>
            Upload a .jpg or .png image file by dragging and dropping over the area in the dotted lines
            or by clicking the link.
          </li>
          <li>
            Drag the box by clicking inside the bounding box (the big box) or by dragging the &quot;handles&quot;
            (the smaller boxes) at the corners of the bounding box.
            You can zoom in and out of the image using the mouse wheel and pan the image by dragging outside
            of the bounding box.
          </li>
          <li>
            The size and position of the bounding box determines the bounds last frame of your zoomroast.
            Position and size it tightly around your subject of ridicule for maximum effect.
          </li>
          <li>
            Once you&apos;re happy with your framing, use the select below the image to pick the number of frames.
            Some zoomroasts work best with more, some work better with less. Experiment to find the ideal
            number of frames for your roast.
          </li>
          <li>
            Click the &quot;Generate&quot; button to create your zoomroast. Right click on the image and choose
            &quot;Save Image As&quot; to download your image to share in your social platform of choice.
          </li>
        </ol>
        <h2>Change Log</h2>
        <ul className={styles.paragraph}>
          <li>
            <strong>1.3.1</strong> 01/01/2022
            <ul>
              <li>Improved mobile experience to some degree.</li>
            </ul>
          </li>
          <li>
            <strong>1.3.0</strong> 01/01/2022
            <ul>
              <li>Updated dependencies.</li>
              <li>Refactored bounding box and handle logic for maintainability.</li>
              <li>Improved look and feel of ui.</li>
              <li>Added rudimentary ui scaling.</li>
              <li>Removed Google Analytics.</li>
              <li>Clarified that images stay local.</li>
            </ul>
          </li>
          <li>
            <strong>1.2.0</strong> 05/31/2020
            <ul>
              <li>Updated dependencies.</li>
              <li>Added help page.</li>
              <li>Added Google Analytics.</li>
              <li>Fixed bug where roast would not generate because dataURL representation was too big.</li>
            </ul>
          </li>
          <li>
            <strong>1.1.0</strong> 12/24/2018
            <ul>
              <li>Export roast steps as one big image instead of multiple cropped images.</li>
              <li>Replace steps number input with select box.</li>
              <li>Add some help text.</li>
            </ul>
          </li>
          <li>
            <strong>1.0.0</strong> 12/23/2018
            <ul>
              <li>Initial release.</li>
            </ul>
          </li>
        </ul>
      </section>
    </article>
  );
}

export default Help;
