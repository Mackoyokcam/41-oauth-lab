import './profile.scss'

import React from 'react'
import {connect} from 'react-redux'
import ProfileForm from '../profile-form'
import PhotoForm from '../photo-form'
import Favorite from '../favorite'
import * as favorite from '../../action/favorite.js'
import * as util from '../../lib/util.js'
import * as clientProfile from '../../action/client-profile.js'

class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editing: false,
    }

    this.handleCreate = this.handleCreate.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleUnfavorite = this.handleUnfavorite.bind(this)
  }

  handleUnfavorite(favorite) {
    this.props.favoriteRemove(this.props.favorites.data.find(item => item._id === favorite._id))
      .then(() => this.forceUpdate())
  }

  handleCreate(profile){
    this.props.profileCreate(profile)
      .then(() => {
        this.props.history.push('/dashboard')
      })
  }

  handleUpdate(profile){
    this.props.profileUpdate(profile)
    this.setState({editing: false})
  }

  handleUpload(photo) {
    this.props.profileUploadPhoto(photo)
  }

  render(){
    let {
      profile,
      profileCreate,
      favorites,
    } = this.props

    return (
      <div className='profile'>
        <h2> Profile </h2>
        { profile ?
          <div>
            <img style={{width: '300px'}} src={profile.photo} alt='<profile image>' className='profile-image' />
            { this.state.editing ? <PhotoForm profile={profile} onComplete={this.handleUpload}/> : <p> Edit bio to change photo </p> }
            <h2> {profile.firstName} {profile.lastName} </h2>
            <h4> {profile.city}, {profile.state} </h4>
            <h4> Goal: ${profile.donationGoal} </h4>
            <h4> Current: ${profile.moneySpent === null ? 0 : profile.moneySpent} </h4>
            <h4> About me: </h4>
            { this.state.editing ?
              <div>
                <ProfileForm profile={profile} onComplete={this.handleUpdate} />
                <button onClick={() => this.setState({editing: false})}>
                  Cancel
                </button>
              </div>
              :
              <div>
                <p> {profile.bio} </p>
                <button onClick={() => this.setState({editing: true})}>
                  Edit Bio
                </button>
              </div>
            }
            <h2> Favorite Charities </h2>
            {favorites.data.map((favorite, i) =>
              <Favorite
                favorite={favorite}
                key={i}
                removeFavorite={this.handleUnfavorite}
              />
            )}
          </div>
          :
          <ProfileForm onComplete={this.handleCreate} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.clientProfile,
  favorites: state.favorites,
})

const mapDispatchToProps = (dispatch) => ({
  profileCreate: (profile) => dispatch(clientProfile.create(profile)),
  profileUpdate: (profile) => dispatch(clientProfile.update(profile)),
  profileUploadPhoto: (photo) => dispatch(clientProfile.upload(photo)),
  favoriteRemove: (charity) => dispatch(favorite.unfavorite(charity)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
