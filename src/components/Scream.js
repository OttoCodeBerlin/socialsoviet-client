import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'

//MUI stuff
import Card from '@material-ui/core/Card'
// import CardActionArea from '@material-ui/core/CardActionArea'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    display: 'flex'
  }
}

class Scream extends Component {
  render() {
    const {
      // classes,
      scream: { body, createdAt, userImage, userHandle }
    } = this.props

    return (
      <Card>
        <CardMedia image={userImage} title="Profile Image" />
        <CardContent>
          <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {createdAt}
          </Typography>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Scream)
