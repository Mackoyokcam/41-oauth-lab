import React from 'react'
import {connect} from 'react-redux'
import * as util from '../../lib/util.js'
import * as favorite from '../../action/favorite.js'

class Charity extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      favorite: false,
    }

    this.handleFavorite = this.handleFavorite.bind(this)
    this.handleUnfavorite = this.handleUnfavorite.bind(this)
  }

  handleFavorite() {
    this.props.favoriteCreate(this.props.charity)
      .then(() => this.setState({favorite: true}))
  }

  handleUnfavorite() {
    this.props.favoriteRemove(this.props.favorites.data.find(item => item.charity._id === this.props.charity._id))
      .then(() => this.setState({favorite: false}))
  }

  componentWillMount() {
    if (this.props.favorites) {
      if(this.props.favorites.data.find(item => item.charity._id === this.props.charity._id))
        this.setState({favorite: true})
      else {
        this.setState({favorite: false})
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.favorites.data) {
      if(nextProps.favorites.data.find(item => item.charity._id === nextProps.charity._id))
        this.setState({favorite: true})
      else {
        this.setState({favorite: false})
      }
    }
  }

  render(){
    let {
      charity,
      favorites,
    } = this.props

    return (
      <div className='charity'>
        <p><strong>Organization:</strong> {charity.name} </p>
        <p><strong>Address:</strong> {charity.streetAdd}, {charity.city}, {charity.state}, {charity.zip} </p>
        <p><strong>Mission:</strong> {charity.mission} </p>
        <p><strong>Cause:</strong> {charity.cause} </p>
        {this.state.favorite ?
          <p style={{color: 'green'}} onClick={this.handleUnfavorite}>Favorite</p>
          : <p style={{color: 'red'}} onClick={this.handleFavorite}><strong>Not Favorite</strong></p>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  favorites: state.favorites,
})

const mapDispatchToProps = (dispatch) => ({
  favoriteCreate: (charity) => dispatch(favorite.create(charity)),
  favoriteRemove: (charity) => dispatch(favorite.unfavorite(charity)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Charity)
