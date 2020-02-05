import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import EditDetails from './EditDetails.js'

//MUI stuff
// import Button from '@material-ui/core/Button'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import { logoutUser, uploadImage } from '../redux/actions/userActions'

const styles = theme => ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
})

class Profile extends Component {
  handleImageChange = e => {
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name) //image.name is blob
    this.props.uploadImage(formData)
  }

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }

  handleLogout = () => {
    this.props.logoutUser()
  }

  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      }
    } = this.props
    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="Profile" className="profile-image" />
              <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
              <Tooltip title="Edit profile picture" placement="top">
                <IconButton onClick={this.handleEditPicture} className="button">
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color="primary" /> <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {' '}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" /> <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
            </div>
            <Tooltip title="Log Out" placement="top">
              <IconButton onClick={this.handleLogout} className="button">
                <KeyboardReturn color="primary" />
              </IconButton>
            </Tooltip>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No Profile found, please log in again.
          </Typography>
        </Paper>
      )
    ) : (
      <p>Loading...</p>
    )

    return profileMarkup
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapActionsToProps = { logoutUser, uploadImage }

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
