import React, { useState, useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from '../Header';
import MainFeaturedPost from '../MainFeaturedPost';
import GreenEarth_FeaturedPost from './GreenEarth_FeaturedPost';
import Footer from '../Footer';
import ServiceCall from '../../Service/ServiceCall';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainFeaturedPost = {
  title: 'Green Earth',
  description:
    "Earth is our home and we should ALWAYS keep it clean and tidy :)",
    image: 'https://source.unsplash.com/720x600/?green,earth',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};



export default function GreenEarth_Home() {
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
              <GreenEarth_FeaturedPost key={post._id.$oid} post={post} />
            ))}
          </Grid>}
         
        </main>
      </Container>
      <Footer title="" description="Something here to give world a purpose!" />
    </React.Fragment>
  );
}