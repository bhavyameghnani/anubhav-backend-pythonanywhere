import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ServiceCall from '../Service/ServiceCall';


const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const sections = [
  { title: 'Wall', url: '#' },
  { title: 'Health Wellness', url: '#/yoga' },
  { title: 'Green Earth', url: '#/greenearth' },
  { title: 'Mental Wellness', url: '#/mentalwellness' },
  { title: 'Arts & Culture', url: '#/diy' },
  { title: 'Community Collaboration', url: '#/communitycollaboration' },
  { title: 'Analytics Dashboard', url: '#/chart' },
  
];

export default function Header(props) {
  const classes = useStyles();
  const { title } = props;

  const [username, setUserName] = React.useState();
  const [showUserName, setShowUserName] = React.useState(false);

  useEffect(() => {

    const validation = localStorage.getItem('user_key')

    if(validation){
      const userId = {
        'user_key': localStorage.getItem('user_key')
      }
      
      ServiceCall.fetchUserName(userId).then((response)=>{
        console.log(response.data)
          setUserName(response.data.FullName + "LogOut")
          setShowUserName(true)
        })
    
    }else{
      setUserName("Log in")
      setShowUserName(true)
    }

    }, []);

    

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {showUserName && 
          <Button variant="outlined" size="small" onClick={()=> {window.open("/#login","_self")}}>
            {username}
          </Button>
        }
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};