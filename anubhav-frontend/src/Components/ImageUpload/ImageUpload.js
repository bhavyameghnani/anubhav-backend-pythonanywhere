import React, { Component } from "react";
import storage from "../Firebase/index";
import ServiceCall from '../../Service/ServiceCall';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0,

      user_key: props.user_key,
      challenge_key: props.challenge_key,
      challenge_title: props.title,
      challenge_points: props.points

    };
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {

            const submission_details = {
              "Submission_URL": url,
              "user_key": this.state.user_key,
              "challenge_key":this.state.challenge_key,
              "challenge_title":this.state.challenge_title,
              "challenge_points":this.state.challenge_points,
              "admin_flag": "1"
          }
  
          ServiceCall.challenge_submission(submission_details).then((response)=>{
              if(response.data === "False"){
                alert("Something went wrong, please contact & report to admin ")
              }
              else{
                alert("Congratulations on making a submission")
                window.open("/","_self")
              }
      
          })
            this.setState({ url });
          });
      }
    );
  };
  render() {
    return (
      <div className="center">
          <br/>
          <h2 className="green-text">Upload a PDF Document</h2>
          <h3 className="green-text">Challenge Title: {this.state.challenge_title}</h3>
          <h3 className="green-text">You will earn Points: {this.state.challenge_points}</h3>
      
        <br />
        <div className="file-field input-field">
          <div className="btn">
            <span>File </span>
            <input type="file" onChange={this.handleChange} />
          </div>
          <br />
        
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        
        <br />
        <button
          onClick={this.handleUpload}
          className="waves-effect waves-light btn"
        >
          Upload
        </button>
        <br />
        <br />
        <div className="row">
          <progress value={this.state.progress} max="100" className="progress" />
        </div>
        <br />
        <br />
        <img
          src={this.state.url || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="300"
          width="400"
        />
      </div>
    );
  }
}

export default ImageUpload;