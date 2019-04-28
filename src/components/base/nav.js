import React, { Component } from 'react'
import classNames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import Popover from '@material-ui/core/Popover'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/MenuRounded'
import ChevronRightIcon from '@material-ui/icons/ChevronRightRounded'
import HomeIcon from '@material-ui/icons/HomeRounded'
import EditIcon from '@material-ui/icons/EditOutlined'
import AccountIcon from '@material-ui/icons/AccountCircleOutlined'
import Link from 'next/link'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
    paddingLeft: 36,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButtonHidden: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  drawerMenu: {
    /*backgroundColor: Colors.menu,
    '& *': {
      color: Colors.menuItem,
    },*/
    height: '100%',
  },
  theDrawer: {
    height: '100%',
  },
  drawerMenuItemIcon: {
    paddingLeft: theme.spacing.unit,
  },
  profileContainer: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    minWidth: 300,
  },
  profileAvatar: {
    height: 70,
    width: 70,
  },
  clickableText: {
    cursor: 'pointer',
  },
  textIcon: {
    marginLeft: theme.spacing.unit,
  },
  profileDivider: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
})

const menuItems = [
  {
    title: 'خانه',
    icon: <HomeIcon />,
    route: '/',
    prefetch: false,
  },
]

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expandMenu: false,
      routeIndex: 0,
      profileAnchor: null,
    }
  }

  handleOpenDrawer = () => {
    this.setState({
      expandMenu: true,
    })
  }

  handleCloseDrawer = () => {
    this.setState({
      expandMenu: false,
    })
  }

  handleOpenProfile = event => {
    this.setState({
      profileAnchor: event.currentTarget,
    })
  }

  handleCloseProfile = () => {
    this.setState({
      profileAnchor: null,
    })
  }

  render() {
    const { classes, route, profile, title } = this.props
    const { profileAnchor } = this.state
    const openProfile = Boolean(profileAnchor)

    const menu = menuItems.map((item, index) => {
      const isSelected = item.route === route
      if (isSelected === true && this.state.routeIndex !== index) {
        this.setState({
          routeIndex: index,
        })
      }
      return (
        <Link prefetch={item.prefetch} href={item.route} key={item.title}>
          <ListItem selected={isSelected} button>
            <ListItemIcon className={classes.drawerMenuItemIcon}>
              <Tooltip title={item.title}>{item.icon}</Tooltip>
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        </Link>
      )
    })

    return (
      <div>
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.expandMenu && classes.appBarShift
          )}
          color="inherit"
        >
          <Toolbar
            disableGutters={!this.state.expandMenu}
            className={classes.toolbar}
          >
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={40}
                >
                  <Grid item>
                    <img alt="Trade Roon" src="/static/images/logo.png" />
                  </Grid>
                  <Grid item>
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <Tooltip title="باز کردن منو">
                          <IconButton
                            color="inherit"
                            aria-label="Expand Menu"
                            onClick={this.handleOpenDrawer}
                            className={classNames({
                              [classes.menuButtonHidden]: this.state.expandMenu,
                            })}
                          >
                            <MenuIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Typography
                          component="h1"
                          variant="h6"
                          color="inherit"
                          noWrap
                        >
                          {title}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Tooltip title="پروفایل">
                  <IconButton
                    color="inherit"
                    className={classes.avatar}
                    aria-owns={openProfile ? 'profile-popover' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleOpenProfile}
                  >
                    <AccountIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Popover
          id="profile-popover"
          open={openProfile}
          anchorEl={profileAnchor}
          onClose={this.handleCloseProfile}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <div className={classes.qaContainer}>
            <Grid container direction="row" spacing={32} alignItems="center">
              <Grid item>
                <Avatar
                  alt="Emily Roberts"
                  src="/static/images/avatar.jpg"
                  className={classes.qaAvatar}
                />
              </Grid>
              <Grid item xs>
                <Typography noWrap align="center" variant="h6" gutterBottom>
                  Emily Johnson
                </Typography>
                <Grid
                  container
                  justify="space-around"
                  direction="row"
                  alignItems="center"
                >
                  <Grid item>
                    <Link href="/profile">
                      <Typography
                        noWrap
                        align="center"
                        variant="body1"
                        color="primary"
                        className={classes.clickableText}
                      >
                        My Account
                      </Typography>
                    </Link>
                  </Grid>
                  <EditIcon color="primary" />
                  <Grid item />
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.qaDivider} />
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Link href="/profile/settings">
                  <Button>Settings</Button>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/logout">
                  <Button color="inherit">Log Out</Button>
                </Link>
              </Grid>
            </Grid>
          </div>
        </Popover>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperClose]: !this.state.expandMenu,
            }),
          }}
          className={classes.theDrawer}
          open={this.state.expandMenu}
        >
          <div className={classes.toolbarIcon}>
            <Tooltip title="بستن منو">
              <IconButton onClick={this.handleCloseDrawer}>
                <ChevronRightIcon />
              </IconButton>
            </Tooltip>
          </div>
          <Divider />
          <List className={classes.drawerMenu}>{menu}</List>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Nav)
