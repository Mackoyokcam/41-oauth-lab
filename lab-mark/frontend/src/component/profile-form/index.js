import './profile-form.scss'

import React from 'react'

let emptyState = {
  firstName: '',
  firstNameDirty: false,
  firstNameError: 'First name is required.',
  lastName: '',
  lastNameDirty: false,
  lastNameError: 'Last name is required.',
  city: '',
  cityDirty: false,
  cityError: '',
  state: '',
  stateDirty: false,
  stateError: '',
  donationGoal: '',
  donationGoalDirty: false,
  donationGoalError: '',
  moneySpent: '',
  moneySpentDirty: false,
  moneySpentError: '',
  bio: '',
  bioDirty: false,
  bioError: '',
}

class ProfileForm extends React.Component {
  constructor(props){
    super(props)
    this.state = props.profile ? {...emptyState, ...props.profile} : emptyState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(props){
    if(props.profile)
      this.setState(props.profile)
  }

  handleChange(e){
    let {value, name, type} = e.target
    value = type === 'number' ? Number(value) : value
    value = value === 0 ? '' : value
    this.setState({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: value ? null : emptyState[`${name}Error`],
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onComplete(this.state)
    this.setState(emptyState)
  }


  render(){
    return (
      <form
        className='profile-form'
        onSubmit={this.handleSubmit}>

        <input
          type='text'
          name='firstName'
          placeholder='First Name'
          value={this.state.firstName}
          onChange={this.handleChange}
        />

        <input
          type='text'
          name='lastName'
          placeholder='Last Name'
          value={this.state.lastName}
          onChange={this.handleChange}
        />

        <input
          type='text'
          name='city'
          placeholder='City'
          value={this.state.city}
          onChange={this.handleChange}
        />

        <input
          type='text'
          name='state'
          placeholder='State'
          value={this.state.state}
          onChange={this.handleChange}
        />

        <input
          type='number'
          name='donationGoal'
          placeholder='Goal'
          value={this.state.donationGoal}
          onChange={this.handleChange}
        />

        <textarea
          name='bio'
          placeholder='Tell us about yourself...'
          value={this.state.bio}
          onChange={this.handleChange}
        />

        <button type='submit'> {this.props.profile ? 'Update' : 'Create'} profile </button>
      </form>
    )
  }
}

export default ProfileForm
