import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, {useState} from 'react';
import type { ISelection } from '../components/Canvas';
import DropZone from '../components/DropZone';
import Header from '../components/Header';

const Canvas = dynamic(() => import('../components/Canvas'), { ssr: false });

function generateRoast(
  { x, y, width, height }: ISelection,
  image: HTMLImageElement,
  steps: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    const ctx = canvas && canvas.getContext('2d');
    const stepConfigs = [];
    if (!canvas) {
      return reject('No canvas');
    }
    if (!ctx) {
      return reject('No rendering context');
    }
    canvas.width = 620;
    const widthSlope = (image.width - width) / steps;
    const heightSlope = (image.height - height) / steps;
    const xSlope = -x / steps;
    const ySlope = -y / steps;
    for (let i = steps; i >= 0; i--) {
      const srcWidth = widthSlope * i + width;
      const srcHeight = heightSlope * i + height;
      stepConfigs.push({
        destHeight: 600 * (srcHeight / srcWidth),
        srcHeight,
        srcWidth,
        srcX: xSlope * i + x,
        srcY: ySlope * i + y,
      });
    }
    const totalYMargins = (10 * stepConfigs.length) + 10;
    canvas.height = stepConfigs.reduce((prev, curr) => prev + curr.destHeight, 0) + totalYMargins;
    let destY = 10;
    const destX = 10;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stepConfigs.forEach((config) => {
      const { srcX, srcY, srcWidth, srcHeight, destHeight } = config;
      ctx.drawImage(image, srcX, srcY, srcWidth, srcHeight, destX, destY, 600, destHeight);
      destY += destHeight + 10;
    });
    canvas.toBlob((blob) => {
      if (blob !== null) {
        resolve(URL.createObjectURL(blob));
      }
    });
  });
}

function Index() {
  const [image, setImage] = useState<HTMLImageElement|null>(null);
  const [selection, setSelection] = useState<ISelection>({ x: 0, y: 0, width: 0, height: 0 });
  const [roast, setRoast] = useState<string>('');
  const [steps, setSteps] = useState<number>(2);

  const onFile = (uploadedFile: File) => {
    const imageEl = new Image();
    imageEl.onload = () => {
      setImage(imageEl);
    };
    imageEl.src = URL.createObjectURL(uploadedFile);
  };
  return (
    <>
      <Head>
        <title>zoomroast</title>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico"/>
      </Head>
      <Header/>
      {image ? (
        <article style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center'}}>
          <section style={{padding: '10px', border: '2px dashed #ddd'}}>
            <div style={{marginBottom: '10px'}}>
              <Canvas image={image} onSelectionUpdate={setSelection} />
            </div>
            <label>Images</label>
            <select value={steps} onChange={(event: React.FormEvent<HTMLSelectElement>) => {
              setSteps(+event.currentTarget.value);
            }}>
              <option value="1">2</option>
              <option value="2">3</option>
              <option value="3">4</option>
              <option value="4">5</option>
              <option value="5">6</option>
              <option value="6">7</option>
              <option value="7">8</option>
              <option value="8">9</option>
              <option value="9">10</option>
            </select>
            <button onClick={async (event) => {
              event.preventDefault();
              const out = await generateRoast(selection, image, steps);
              setRoast(out);
            }}>Generate Roast</button>
            <canvas id="renderCanvas" style={{display: 'none'}} width={900} height={600}/>
          </section>
        </article>
      ) : <DropZone onFile={onFile} />}
      <div style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {!!roast && (
          <>
            <div style={{width: '100%'}}>
              <h3>Your Fresh Roast:</h3>
              <p>Right-click the image and choose &quot;Save As&quot; to download.</p>
            </div>
            <div style={{border: '2px dashed #ddd'}}>
              <img
                alt={`An image composed of a sequence of crops from your chosen image,
                      arranged vertically from most zoomed out at the top, to most zoomed 
                      in at the bottom.`} 
                src={roast}
                style={{ maxWidth: '100%' }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Index;
