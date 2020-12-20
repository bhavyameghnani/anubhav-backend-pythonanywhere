import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import ServiceCall from '../../Service/ServiceCall';
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ImageUpload from '../ImageUpload/ImageUpload';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    card: {
        display: 'flex',
        },
        cardDetails: {
        flex: 1,
        },
        cardMedia: {
        width: 160,
        },
  }));

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  const [open, setOpen] = React.useState(false);
  const [showSubmission, setShowSubmission] = React.useState(false);

  const handleClickOpen = (challenge_key) => {
    setOpen(true);
    console.log(challenge_key)

    const user_challenge = {
        "challenge_key": challenge_key,
        "user_key": localStorage.getItem('user_key'),
    }

    ServiceCall.checkUserChallengesEnrolled(user_challenge).then((response)=>{
        console.log(response.data)
        if(response.data === "True"){
            setShowSubmission(true);
        }
      })
  };

  const handleClose = () => {
    setOpen(false);
  };


  function handleSubmit(post_id, post_deadline, post_title){

    if(showSubmission){
        alert("Already Enrolled, Upload Submission below")
    }else{
        const challenges_enrolled = {
            "challenge_key": post_id,
            "user_key": localStorage.getItem('user_key'),
            "start_date": new Date().toLocaleString(),
            "deadline": post_deadline,
            "submission_status": "0",
            "challenge_title" : post_title
        }
    
        ServiceCall.userChallengesEnrolled(challenges_enrolled).then((response)=>{
            if(response.data === "False"){
            alert("Something went wrong, try again later")
            }
            else{
            alert("Challenge Added Successfully")
            window.open("/","_self")
            }
    
        })
    }
  }

  return (
    <>
    {(() => {
        if (post.tag === "Mental Wellness") {
            return (
                <Grid item xs={12} md={6}>
                    <CardActionArea >
                    <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                        <Typography component="h2" variant="h5">
                            {post.title}
                        </Typography>

                        <Typography variant="subtitle1" color="textSecondary">
                            <b>Deadline:</b>{post.deadline}  <b>Points:</b> {post.points}
                        </Typography>

                        <Typography variant="subtitle1" color="primary" onClick={() => {handleClickOpen(post._id.$oid)}}>
                            Apply Now
                        </Typography>
                        
                        </CardContent>
                    </div>
                    <Hidden xsDown>
                        <CardMedia className={classes.cardMedia} image="https://source.unsplash.com/random" title={"Mental Wellness"} />
                    </Hidden>
                    </Card>
                </CardActionArea>
                </Grid>
    )}

    })()}

        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Challenge - {post.title}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        Contact Administrator
                    </Button>
                </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    <br/>
                    <Typography variant="subtitle1" paragraph>
                        <b>Challenge Description: </b>{post.description}
                    </Typography>

                    <Typography variant="subtitle1" paragraph>
                        <b>Deadline: </b>{post.deadline}  
                    </Typography>

                    <Typography variant="subtitle1" paragraph>
                        <b>Points: </b> {post.points}
                    </Typography>

                    <Typography variant="subtitle1" paragraph>
                        <b>Resources: </b> {post.resource}
                    </Typography>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {handleSubmit(post._id.$oid, post.deadline, post.title)}}
                    >
                        Start Challenge Now - Positivite 2021
                    </Button>

                    


                {showSubmission && <>

                <ImageUpload user_key={localStorage.getItem('user_key')} challenge_key={post._id.$oid} title={post.title} points={post.points}/>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    // onClick={}
                >
                    Submit Challenge - Positivite 2021
                </Button>
                </>}


              </Container>
                
            </Dialog>
    </>
    
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};