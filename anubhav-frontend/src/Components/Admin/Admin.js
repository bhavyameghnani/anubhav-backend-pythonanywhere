import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ServiceCall from '../../Service/ServiceCall';
import Container from '@material-ui/core/Container';
import Footer from '../Footer';
import Header from '../Header';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Admin() {
  const classes = useStyles();

  const [tag, setTag] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [points, setPoints] = React.useState("");
  const [resource, setResources] = React.useState("");

  const tags = [
    { title: 'Mental Wellness' },
    { title: 'Green Earth'},
    { title: 'Community Collaboration' }
  ]
  


  function handleTag(event, value){
    setTag(value.title)
  }

  function handleTitle(event){
    setTitle(event.target.value)
  }

  function handleDescription(event){
    setDescription(event.target.value)
  }

  function handleDeadline(event){
    setDeadline(event.target.value)
  }

  function handlePoints(event){
    setPoints(event.target.value)
  }

  function handleResources(event){
    setResources(event.target.value)
  }

  function handleSubmit(){

        const admin_challenges = {
            "title": title,
            "deadline":deadline,
            "description": description,
            "points":points,
            "tag": tag,
            "resource":resource,
        }

    ServiceCall.adminAddChallenge(admin_challenges).then((response)=>{
        if(response.data === "False"){
          alert("Something went wrong, try again later")
        }
        else{
          alert("Challenge Added Successfully")
          window.open("/","_self")
        }

    })
      
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Header title="Anubhav" />
        <main>
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
            <Grid item xs={12} sm={8} md={12} elevation={6} square>
              <div className={classes.paper}>
                {/* <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar> */}
                <Typography component="h1" variant="h5">
                  Admin Add Challenges
                </Typography>
                <br/>

                <Grid item xs={12} sm={8} md={5} >
                <Autocomplete
                  id="tags"
                  options={tags}
                  getOptionLabel={(option) => option.title}
                  style={{ width: 480 }}
                  renderInput={(params) => <TextField {...params} label="Tags" variant="outlined" />}
                  onChange={(event, value) => handleTag(event,value)}
                />
                  {/* <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="Tag"
                    label="Tag"
                    name="tag"
                    autoFocus
                    onChange={handleTag}
                  /> */}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                    onChange={handleTitle}
                  />
                  <TextField
                    multiline
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    autoFocus
                    onChange={handleDescription}
                  />
                  <TextField
                      id="deadline"
                      label="Deadline"
                      type="date"
                      defaultValue="2021-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                      shrink: true,
                      }}
                      onChange={handleDeadline}
                  />
                  {/* <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="deadline"
                    label="Deadline"
                    name="deadline"
                    autoFocus
                    onChange={handleDeadline}
                  /> */}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="points"
                    label="Points"
                    name="points"
                    autoFocus
                    onChange={handlePoints}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="resource"
                    label="Resources"
                    name="Resources"
                    autoFocus
                    onChange={handleResources}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                  >
                    Add Challenges
                  </Button>

                </Grid>
                  
                  
                  <Box mt={5}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        Welcome to Anubhav 2021
                    </Typography>
                  </Box>
              </div>
            </Grid>
          </Grid>
          </main>
          </Container>
      <Footer title="" description="Something here to give world a purpose!" />
    </React.Fragment>
  );
}