import React from 'react'
import * as util from '../../lib/util.js'

class Favorite extends React.Component {
  constructor(props) {
    super(props)

    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove() {
    this.props.removeFavorite(this.props.favorite)
  }

  render(){
    let {
      favorite,
    } = this.props

    return (
      <div className='favorite'>
        <p><strong>Organization:</strong> {favorite.charity.name} </p>
        <button onClick={this.handleRemove}>Remove</button>
      </div>
    )
  }
}

export default Favorite
