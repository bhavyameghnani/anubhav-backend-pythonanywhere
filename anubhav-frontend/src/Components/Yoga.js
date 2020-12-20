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
import { Button } from '@material-ui/core';



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

const mainFeaturedPost = {
  title: 'Welcome to the Yoga Track!',
  description:
    "Learn and practice yoga with our AI-enabled pose corrector and dive into a serene environment with our VR plug-in.",
  image: 'https://images.unsplash.com/photo-1491172700640-4f1a131a3670?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  imgText: 'main image description',
  linkText: 'Read more…',
};

const featuredPosts = [
    {
      title: 'Learn',
      date: 'Day : 1',
      description:
        'Let our AI enabled coach guide you through perfecting those poses! ',
      image: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=1200&h=628&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F35%2F2019%2F04%2F16045736%2Fbenefits-yoga-fb1.jpg',
      imageText: 'Image Text',
      url: '/#/yoga_learn'
    },
    {
      title: 'Test',
      date: 'Best Score : 0',
      description:
        'Test yourself to win points and an opportunity to become a yoga mentor :)',
      image: 'https://www.questionpro.com/blog/wp-content/uploads/2015/03/primary-test-it.png',
      imageText: 'Image Text',
      url: '/#/yoga_test'
    }
];


export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Anubhav" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <h2> Experience Our Disruptive Yoga Solutions </h2>
          <p style={{color: "black"}}> <i>VR assisted by Posenet AI Guidance System to enhance yoga experience.. </i></p>
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>

        </main>
      </Container>
      <Footer title="" description="Something here to give world a purpose!" />
    </React.Fragment>
  );
}