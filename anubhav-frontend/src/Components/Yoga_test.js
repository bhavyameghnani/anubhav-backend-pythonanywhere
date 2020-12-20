import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Script from "react-inline-script";
import allow from './allow.png'; 
import Button from "@material-ui/core/Button";


import Paper from "@material-ui/core/Paper";




const useStyles = makeStyles((theme) => ({
    mainGrid: {
      marginTop: theme.spacing(3),
    },
  }));

const sections = [
    { title: 'Home', url: '#' },
    { title: 'Wall', url: '#' },
    { title: 'Challenges', url: '#' },
    { title: 'DIY', url: '#' },
    { title: 'Tracks', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Entertainment', url: '#' },
    { title: 'My Dashboard', url: '#' },
  ];

export default function Home() {
    const classes = useStyles();
  
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="Anubhav" sections={sections} />
          <main>
            <h1>Test Instructions </h1>
            <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}> <img  src={allow}/> <br /> Accept camera access and wait for the webcam to load.</Paper>
          
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}> <img height="157" width="150" src="https://miro.medium.com/max/8064/1*DdfPz57gL00a-lW1E8AGkw.jpeg" /> <br /> Perform the instructed pose (make sure you've practiced in the Learn section :))</Paper>
          
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}> <img height="120" width="150" src="https://exploreembedded.com/wiki/images/2/22/00_Lpc1768_Timer.jpg" /> <br /> Hold for 30 seconds. The timer will restart if you make a mistake. Earn points on each successful pose. Enjoy!</Paper>
          
        </Grid>
      </Grid>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      < br />
      <Button variant="contained" color="primary" href="https://storage.googleapis.com/anubhav-yoga/YOGA%20module/test.html">
        START
      </Button>

      
    </div>
            
          </main>
        </Container>
        <Footer title="" description="Something here to give world a purpose!" />
      </React.Fragment>
    );
  }