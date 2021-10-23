import React, { useState } from 'react';
import { Header } from '../../components/Header'

import './style.css'

interface Iblob {
  type: string,
  size: number,
  arrayBuffer?: any, 
  slice?: any, 
  stream?: any, 
  text?: any
}

export const Recording = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [recordStop, setRecordStop] = useState<boolean>(false);
  const [recordLink, setRecordLink] = useState<string>('')
  let chunks:any = null;
  
  const handleStopRecord = () => {
    console.log(chunks)
    const blob = new Blob(chunks, {
      type: chunks[0]?.type
    })

    setRecordStop(false)

    const url = URL.createObjectURL(blob);
    setVideoUrl(url)
    setRecordLink(url)
  }
  const handleInitRecord = async() => {
    const stream = await window.navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    });

    setRecordStop(true)

    const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9") 
      ? 'video/webm; codecs=vp9' : 'video/webm'
    
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: mime
    })

    mediaRecorder.addEventListener('dataavailable', (e) => {
      const listChunks:any = [];
      listChunks.push(e.data);
      chunks = listChunks;
    })

    mediaRecorder.addEventListener('stop', () => {
      setTimeout(handleStopRecord, 3000)
    })

    mediaRecorder.start();
  }
  return (
    <section>
      <Header />
      <div className="content-text">
        <h2>You can record your screen and make donwload of video</h2>
      </div>
      <div className="container-record">
        {videoUrl && (
          <video src={videoUrl} controls width="600" height="400"></video>
        )}
        <div className="btns-list">
          <button className="action-rec" title="rec" aria-label="rec" onClick={handleInitRecord}>
            <div className="icon-around">
            <div className="icon-rec"></div>
          </div>
          </button>
          {/* {!!recordStop &&(
            <button 
              className="action-rec-second" 
              title="stop" 
              aria-label="stop" 
              onClick={() => {
                setTimeout(handleStopRecord, 3000)
              }}>
              <div className="icon-around">
                <div className="icon-rec-stop"></div>
              </div>
            </button>
          )} */}
        </div>
        {recordLink && (
          <a href={recordLink} download="video-screen-record.webm">Download of video</a>
        )}
      </div>
    </section>
  )
}