import './search-form.scss'

import React from 'react'
import * as util from '../../lib/util.js'

let emptyState = {
  name: '',
}

class SearchForm extends React.Component {
  constructor(props){
    super(props)
    this.state = emptyState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    let {name, value} = e.target
    this.setState({[name]: value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onComplete(this.state)
    this.setState(emptyState)
  }

  render(){

    return (
      <form
        className='search-form'
        onSubmit={this.handleSubmit} >

        <input
          name='name'
          placeholder='name'
          type='text'
          value={this.state.name}
          onChange={this.handleChange}
        />

        <button type='submit'>Search</button>
      </form>
    )
  }
}

export default SearchForm
