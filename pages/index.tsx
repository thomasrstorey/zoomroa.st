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
  crops: string[];
  steps: number;
}

class Index extends React.Component<{}, IState> {
  public state: IState = {
    crops: [],
    file: null,
    height: 0,
    image: null,
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
              <input type="number" value={this.state.steps + 1} step={1} onChange={
                (event: React.FormEvent<HTMLInputElement>) => {
                  this.setState({ steps: event.currentTarget.valueAsNumber - 1 });
                }
              }/>
              <button onClick={this.onClickGenerate}>Generate Images</button>
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
          {this.state.crops && this.state.crops.map((url) => <div><img src={url}/></div>)}
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
    const crops = [];
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    const ctx = canvas && canvas.getContext('2d');
    if (canvas && ctx && image) {
      canvas.width = 600;
      const widthSlope = (image.width - width) / steps;
      const heightSlope = (image.height - height) / steps;
      const xSlope = -x / steps;
      const ySlope = -y / steps;
      for (let i = steps; i >= 0; i--) {
        const stepWidth = widthSlope * i + width;
        const stepHeight = heightSlope * i + height;
        const stepX = xSlope * i + x;
        const stepY = ySlope * i + y;
        canvas.height = canvas.width * (stepHeight / stepWidth);
        ctx.drawImage(image, stepX, stepY, stepWidth, stepHeight, 0, 0, canvas.width, canvas.height);
        const croppedDataURL = canvas.toDataURL('image/png', 1.0);
        crops.push(croppedDataURL);
      }
      this.setState({ crops });
    }
  }
}

export default Index;
