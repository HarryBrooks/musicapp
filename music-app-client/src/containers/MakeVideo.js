import React, { useEffect, useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';

const MakeVideo = (props) => {

    const [blobUrl, setBlobUrl] = useState("")

    useEffect(() => {
    },[])
    console.log(props);

    let chunks = [];

    if(blobUrl !== "") {
        return(
            <div className="makeVideo">
                <a href={blobUrl} download="video.mp4">
                    Download
                </a>
            </div>
        )
    }

    return (
        <div className="makeVideo">
            <h1>Time to play</h1>
            <ReactMediaRecorder
                video
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                    <p>{status}</p>
                    <button onClick={startRecording}>Start Recording</button>
                    <button onClick={stopRecording}>Stop Recording</button>
                    <video src={mediaBlobUrl} controls autoplay loop />
                    </div>
                )}
                onStop={(blobUrl) => {
                    setBlobUrl(blobUrl)
                }}
            />
        </div>
    )
}

export default MakeVideo;