import axios from 'axios'; 
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import React,{Component} from 'react'; 
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import Footer from './Footer';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/styles";
import { Fab, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DIYElements from "./DIYElements";

const stylesFn = () => ({
    input: {
      color: "white"
    },
    focused: {
      background: "red"
    }
  });

  const mainFeaturedPost = {
    title: 'Do-It-Yourself!',
    description:
      "Learn new skills, complete challenges, and build a portfolio of fun projects. ",
    image: 'https://images.unsplash.com/photo-1522065893269-6fd20f6d7438?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    imgText: 'main image description',
  };
 
class DIY extends Component { 

	state = { 

    selectedFile: null,
    value : "",
    pinterest : [],
    youtube : [],
    posts : []
    
	}; 
	
	onFileChange = event => { 
	
	this.setState({ selectedFile: event.target.files[0] }); 
	
    }; 
    
    handleChange = event => {
        this.setState({value: event.target.value});
      }
  
  
	// On file upload (click the upload button) 
	onInputGiven = () => { 

    const fetchData = () => {
      axios.get('https://anubhavbackend.herokuapp.com/youtube/'+this.state.value)
      .then(response=>{
          console.log(response.data.results)
          axios.get('https://anubhavbackend.herokuapp.com/pinterest/'+this.state.value)
  
          .then(response2=>{
              console.log( response2.data.results)
              this.setState({posts:response2.data.results.concat(response.data.results) });
              console.log(this.state.posts)
              
          })
          .catch(error=>{
              console.log(error)
          })
         
      })
      .catch(error=>{
          console.log(error)
     })
    }

    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
   
    var smtng = this;
        if(this.state.selectedFile)
         {  
            const formData = new FormData(); 
            
            formData.append( 
                "myFile", 
                this.state.selectedFile, 
                this.state.selectedFile.name 
            ); 
            
            console.log(this.state.selectedFile); 

            console.log(toBase64(this.state.selectedFile).then(function(result)
            {
             // console.log(result);
              var img_url = result.replace(/^data:image\/[a-z]+;base64,/, "");
              
              const data = JSON.stringify({
                "image_base64": img_url
              });
              
              const xhr = new XMLHttpRequest();
             // xhr.withCredentials = true;
              
              xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                  var op = JSON.parse(this.responseText);
                  console.log(op['Object 1'][0].split(':')[0]);
                  smtng.setState({value:op['Object 1'][0].split(':')[0]});
                  fetchData();
                }
              });
              
              xhr.open("POST", "https://apis.sentient.io/microservices/cv/objectdetection/v0.1/getpredictions");
              xhr.setRequestHeader("content-type", "application/json");
              xhr.setRequestHeader("x-api-key", "C41274B65AB947C6901F");
              
              xhr.send(data);

            }));
            

         
        }
        else
        {
           console.log(this.state.value);
           fetchData();
        }    
	}; 

	render() { 

	return ( 
        
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="Anubhav" />
          <main>
            <MainFeaturedPost post={mainFeaturedPost} />
            <h2> EXPLORE </h2>
            <p style={{color: "black"}}> <i>Enter an object name or upload an image to explore DIY ideas around it. </i></p>
            
                <TextField
                id="keyword"
                label="Item Name" 
                variant="filled" 
                value={this.state.value}
                onChange={this.handleChange}
                InputProps={{
                    className: this.props.classes.input, // usually you dont need this and you only need classes, but just wanted to show that you can use
                    classes: {
                    focused: this.props.classes.focused
                    }
                }}
                />
                <p>OR</p>


                <label htmlFor="upload-photo">
                    <input
                        onChange={this.onFileChange}
                        style={{ display: "none" }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        />
                        <Fab
                        color="primary"
                        size="small"
                        component="span"
                        aria-label="add"
                        variant="extended"
                    >
                        <AddIcon /> Upload photo
                    </Fab>
                
                </label>
        <br />
        <br />
        <Button variant="contained" color="secondary" onClick={this.onInputGiven}>
            EXPLORE
        </Button>

        <br />
        <br />
        

        <Grid container spacing={4}>
            {this.state.posts.map((post) => (
              <DIYElements key={post.title} post={post} />
            ))}
          </Grid>

  
          </main>
        </Container>
        <Footer title="" description="Something here to give world a purpose!" />
      </React.Fragment>
	); 
	} 
} 


export default withStyles(stylesFn)(DIY); 
