import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios'
import '../assets/style.css';
import {MODEL_URL} from '../config.js';

export class WebcamCapture extends React.Component {

  constructor(props) {
    super(props);

    this.state = { result:'',imgSrc: '' ,working:false};
    this.capture = this.capture.bind(this);
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    var self = this;
    this.setState({working:true})
    axios.post(MODEL_URL, 
        {headers: {'Content-Type': 'application/json'}},
        {data:this.webcam.getScreenshot()})
        .then(function (response){
            console.log(response);
            self.setState({working:false})
        })
        .catch(function (error){
            console.log(error);
        });
    };

  render() {
    var result = '';
    var button = <button className="button" onClick={this.capture}>CAPTURE</button>;
    if(this.state.working === true)
    {
      button = <button disabled className="button" onClick={this.capture}>WAIT</button>;
    }

    console.log(result)
    return (
      <div>
      <div>
        <Webcam
          audio={false}
          height={600}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={800}
        />
      </div>
      <div>
        {button}
      </div>
      <div>
      {this.state.imgSrc}
      </div>
    </div>
    );
  }
}
