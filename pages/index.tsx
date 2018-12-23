import React from 'react';
import Canvas from '../components/Canvas';
import DropZone from '../components/DropZone';
import Header from '../components/Header';

interface IDisplayProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

function Display(props: IDisplayProps) {
  return <p>x: {Math.ceil(props.x)} y: {Math.ceil(props.y)} w: {Math.ceil(props.width)} h: {Math.ceil(props.height)}</p>;
}

interface IState {
  file: File|null;
  x: number;
  y: number;
  width: number;
  height: number;
}

class Index extends React.Component<{}, IState> {
  public state: IState = {
    file: null,
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  };

  public render() {
    return (
      <>
        <Header/>
        <p>Welcome to zoomroa.st</p>
        <DropZone onFile={this.onFile} />
        <p>{this.state.file ? `Selected file: ${this.state.file.name}` : 'Please select a file.'}</p>
        {this.state.file && (
          <>
            <Canvas imageFile={this.state.file} onSelectionUpdate={this.onSelectionUpdate}/>
            <Display x={this.state.x} y={this.state.y} width={this.state.width} height={this.state.height}/>
          </>
        )}
      </>
    );
  }

  public onFile = (file: File) => {
    this.setState({ file });
  }

  public onSelectionUpdate = (x: number, y: number, width: number, height: number) => {
    this.setState({ x, y, width, height });
  }
}

export default Index;
