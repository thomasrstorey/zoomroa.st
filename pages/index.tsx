import Head from 'next/head';
import React from 'react';
import Canvas from '../components/Canvas';
import DropZone from '../components/DropZone';
import Header from '../components/Header';

interface IState {
  file: File|null;
  image: HTMLImageElement|null;
  x: number;
  y: number;
  width: number;
  height: number;
  roast: string;
  steps: number;
}

class Index extends React.Component<{}, IState> {
  public state: IState = {
    file: null,
    height: 0,
    image: null,
    roast: '',
    steps: 2,
    width: 0,
    x: 0,
    y: 0,
  };

  public render() {
    return (
      <>
        <Head>
          <title>zoomroast</title>
        </Head>
        <Header/>
        {this.state.image ? (
          <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center'}}>
            <div style={{padding: '10px', border: '2px dashed #ddd'}}>
              <div style={{marginBottom: '10px'}}>
                <Canvas image={this.state.image} onSelectionUpdate={this.onSelectionUpdate} />
              </div>
              <label>Images</label>
              <select value={this.state.steps} onChange={(event: React.FormEvent<HTMLSelectElement>) => {
                this.setState({ steps: +event.currentTarget.value });
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
              <button onClick={this.onClickGenerate}>Generate Roast</button>
              <canvas id="renderCanvas" style={{display: 'none'}} width={900} height={600}/>
            </div>
          </div>
        ) : <DropZone onFile={this.onFile} />}
        <div style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          {this.state.roast && (
            <>
            <div style={{width: '620px'}}>
              <h3>Your Fresh Roast:</h3>
              <p>Right-click the image and choose "Save As" to download.</p>
            </div>
            <div style={{border: '2px dashed #ddd'}}><img src={this.state.roast}/></div>
            </>
          )}
        </div>
      </>
    );
  }

  public onFile = (file: File) => {
    const image = new Image();
    image.onload = () => {
      this.setState({ image });
    };
    image.src = URL.createObjectURL(file);
    this.setState({ file });
  }

  public onSelectionUpdate = (x: number, y: number, width: number, height: number) => {
    this.setState({ x, y, width, height });
  }

  public onClickGenerate = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { image, x, y, width, height, steps } = this.state;
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    const ctx = canvas && canvas.getContext('2d');
    const stepConfigs = [];
    if (canvas && ctx && image) {
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
      stepConfigs.forEach((config) => {
        const { srcX, srcY, srcWidth, srcHeight, destHeight } = config;
        ctx.drawImage(image, srcX, srcY, srcWidth, srcHeight, destX, destY, 600, destHeight);
        destY += destHeight + 10;
      });
      canvas.toBlob((blob) => this.setState({ roast: URL.createObjectURL(blob) }));
    }
  }
}

export default Index;
