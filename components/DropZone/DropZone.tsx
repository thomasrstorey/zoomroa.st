import React from 'react';
import { dropZone, link } from './DropZone.css';

interface IProps {
  onFile: (file: File) => void;
}

const onDrop = (onFile: (file: File) => void) => (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  const files = Array.from(event.dataTransfer.files);
  if (files.length) {
    onFile(files[0]);
  }
};

const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
};

const onChange = (onFile: (file: File) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files ? Array.from(event.target.files) : [];
  if (files.length) {
    onFile(files[0]);
  }
};

const DropZone = (props: IProps) => {
  let fileInput: HTMLInputElement|null = null;
  const onClick = () => {
    if (fileInput) {
      fileInput.click();
    }
  };
  return (
    <div onDrop={onDrop(props.onFile)} onDragOver={onDragOver} className={dropZone}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <p>Drag and drop an image file in this box to start zoomroasting.</p>
        <p>Or, <a href="#" className={link} onClick={onClick}>click here</a> to choose a file.</p>
        <p>Supported file types: <code>.jpg</code>, <code>.png</code></p>
      </div>
      <input
        type="file"
        style={{display: 'none'}}
        ref={
          (input: HTMLInputElement) => {
            fileInput = input;
          }
        }
        onChange={onChange(props.onFile)}
      />
    </div>
  );
};

export default DropZone;
