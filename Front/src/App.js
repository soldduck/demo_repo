import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SearchIcon from '@material-ui/icons/Search';

import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import UserBooksPage from './pages/UserBooksPage';
import Instruction from './components/Instruction';

import AlertMessage from './components/AlertMessage';

import { setDefaultState } from './store/actionCreators/stateActionCreator';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  App: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#000',
  }
}));

function App(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router basename={'/dcatalogue'}>
      <div className={classes.App}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Электронный каталог
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>

          { !props.token ? 
            (<Link to="/login" className={classes.link}>
              <ListItem button onClick={()=>{setOpen(false)}}  key="Вход">
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary="Вход"/>
              </ListItem>
            </Link>)
            : null
          }
          { props.token ? 
            (<Link to="/books" className={classes.link}>
              <ListItem button onClick={()=>{setOpen(false)}} key="Мои книги">
                <ListItemIcon><MenuBookIcon /></ListItemIcon>
                <ListItemText primary="Мои книги"/>
              </ListItem>
            </Link>)
            : null
          }

            <Link to="/search" className={classes.link}>
              <ListItem button onClick={()=>{setOpen(false)}} key="Поиск">
                <ListItemIcon><SearchIcon /></ListItemIcon>
                <ListItemText primary="Поиск"/>
              </ListItem>
            </Link>

            {props.token ? 
              <Link to="/login" className={classes.link}>
                <ListItem button onClick={() => {props.setDefaultState(); setOpen(false);}} key="Выход">
                  <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                  <ListItemText primary="Выход"/>
                </ListItem>
              </Link>
            :
              null
            }
            </List>
         
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Route exact path="/" component={Instruction} />
          <Route path="/login" component={LoginPage} />
          <Route path="/books" component={UserBooksPage} />
          <Route path="/search" component={SearchPage} />
        </main>
        <AlertMessage alert={{...props.alert}} />
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    alert: {
      showed: (state.user?.Status == 1 ? true : false),
      message: state.user?.Error,
    }
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDefaultState: () => {
      dispatch(setDefaultState());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
