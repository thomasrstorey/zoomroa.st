import React from 'react';
import Canvas from '../components/Canvas';
import DropZone from '../components/DropZone';
import Header from '../components/Header';

interface IState {
  file: File|null;
}

class Index extends React.Component<{}, IState> {
  public state: IState = {
    file: null,
  };

  public render() {
    return (
      <>
        <Header/>
        <p>Welcome to zoomroa.st</p>
        <DropZone onFile={this.onFile} />
        <p>{this.state.file ? `Selected file: ${this.state.file.name}` : 'Please select a file.'}</p>
        {this.state.file && (
          <Canvas imageFile={this.state.file}/>
        )}
      </>
    );
  }

  public onFile = (file: File) => {
    this.setState({ file });
  }
}

export default Index;
