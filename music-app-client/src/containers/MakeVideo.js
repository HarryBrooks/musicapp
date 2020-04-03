import React, { Component } from 'react';
import MediaCapturer from 'react-multimedia-capture';
import { Button } from 'react-bootstrap';

class MakeVideo extends Component {
	constructor() {
		super();
		this.state = {
			granted: false,
			rejectedReason: '',
			recording: false,
            paused: false
		};

		this.handleRequest = this.handleRequest.bind(this);
		this.handleGranted = this.handleGranted.bind(this);
		this.handleDenied = this.handleDenied.bind(this);
		this.handleStart = this.handleStart.bind(this);
		this.handleStop = this.handleStop.bind(this);
		this.handlePause = this.handlePause.bind(this);
		this.handleResume = this.handleResume.bind(this);
		this.handleStreamClose = this.handleStreamClose.bind(this);
		this.setStreamToVideo = this.setStreamToVideo.bind(this);
		this.releaseStreamFromVideo = this.releaseStreamFromVideo.bind(this);
		this.downloadVideo = this.downloadVideo.bind(this);
	}
	handleRequest() {
		console.log('Request Recording...');
	}
	handleGranted() {
		this.setState({ granted: true });
		console.log('Permission Granted!');
	}
	handleDenied(err) {
		this.setState({ rejectedReason: err.name });
		console.log('Permission Denied!', err);
	}
	handleStart(stream) {
		this.setState({
			recording: true
		});

		this.setStreamToVideo(stream);
		console.log('Recording Started.');
	}
	handleStop(blob) {
		this.setState({
			recording: false
		});

		this.releaseStreamFromVideo();

		console.log('Recording Stopped.');
		this.downloadVideo(blob);
	}
	handlePause() {
		this.releaseStreamFromVideo();

		this.setState({
			paused: true
		});
	}
	handleResume(stream) {
		this.setStreamToVideo(stream);

		this.setState({
			paused: false
		});
	}
	handleError(err) {
		console.log(err);
	}
	handleStreamClose() {
		this.setState({
			granted: false
		});
	}
	setStreamToVideo(stream) {
		let video = this.refs.app.querySelector('video');
		
		video.src = stream;
	}
	releaseStreamFromVideo() {
		this.refs.app.querySelector('video').src = '';
	}
	downloadVideo(blob) {
		let url = URL.createObjectURL(blob);
		let a = document.createElement('a');
		a.style.display = 'none';
		a.href = url;
		a.target = '_blank';
		document.body.appendChild(a);

		a.click();
	}
	render() {
		const granted = this.state.granted;
		const recording = this.state.recording;

		return (
			<div ref="app">
				<h3>Video Recorder</h3>
                <p>Start are recording using the start button. When you are finished (i.e. the piece has concluded), the recording will automatically stop and will be downloaded. If you press the stop button, you cancel the recording but it will still be downloading so you can listen back to youself.</p>
				<MediaCapturer
					constraints={{ audio: true, video: true }}
					timeSlice={10}
					onRequestPermission={this.handleRequest}
					onGranted={this.handleGranted}
					onDenied={this.handleDenied}
					onStart={this.handleStart}
					onStop={this.handleStop}
					onPause={this.handlePause}
					onResume={this.handleResume}
					onError={this.handleError} 
					onStreamClosed={this.handleStreamClose}
					render={({ request, start, stop, pause, resume }) => 
					<div>
						<p>Recording: {recording.toString()}</p>

						{!granted && <Button onClick={request}>Get Permission</Button>}
						{!recording && <Button onClick={start}>Start</Button>}
						{recording && <Button onClick={stop}>Stop</Button>}
						
						<p>Streaming test</p>
						<video autoPlay></video>
					</div>
				} />
                <h3>Video Uploader</h3>
                <p>Once you have recorded yourself and are happy with the result, you can upload the recording here.</p>
			</div>
		);
	}
}

export default MakeVideo;