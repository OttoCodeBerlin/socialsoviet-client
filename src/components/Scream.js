import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

//MUI stuff
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

const styles = {
  card: {
    display: 'flex'
  }
}

class Scream extends Component {
  render() {
    const { classes, scream: {body, createdAt, userImage, userHandle, screamId, likeCount, commentCount} } = this.props
    
    return <Card>
      <CardMedia image={userImage} title='Profile Image'/>
      <CardContent>
        <Typography></Typography>
      </CardContent>
      </Card>
  }
}

export default withStyles(styles)(Scream)
