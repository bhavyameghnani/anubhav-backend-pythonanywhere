import React, { useState, useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from '../Header';
import MainFeaturedPost from '../MainFeaturedPost';
import MentalWellness_FeaturedPost from './MentalWellness_FeaturedPost';
import Footer from '../Footer';
import ServiceCall from '../../Service/ServiceCall';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainFeaturedPost = {
  title: 'Mental Wellness',
  description:
    "Discover what being mentally well means, and how it can help you lead a fulfilling life",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};



export default function MentalWellness_Home() {
  const classes = useStyles();


  const [challenges, setChallenges] = React.useState();
  const [showChallenges, setShowChallenges] = React.useState(false);


  useEffect(() => {
    ServiceCall.fetchChallenges().then((response)=>{
        setChallenges(response.data);
        setShowChallenges(true);
      })
  }, []);


 

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Anubhav" />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          {showChallenges && <Grid container spacing={4}>
            {challenges.map((post) => (
              <MentalWellness_FeaturedPost key={post._id.$oid} post={post} />
            ))}
          </Grid>}
         
        </main>
      </Container>
      <Footer title="" description="Something here to give world a purpose!" />
    </React.Fragment>
  );
}