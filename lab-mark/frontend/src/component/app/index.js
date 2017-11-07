import './app.scss'

import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'

import Search from '../search'
import Header from '../header'
import Landing from '../landing'
import Profile from '../profile'
import Dashboard from '../dashboard'
import AuthRedirect from '../auth-redirect'
import * as favorite from '../../action/favorite.js'
import * as clientProfile from '../../action/client-profile.js'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.getProfile = this.getProfile.bind(this)
  }

  getProfile() {
    this.props.fetchClientProfile()
      .catch(console.error)
  }

  getFavorites() {
    this.props.fetchFavorites()
      .catch(console.error)
  }

  componentDidMount(){
    if(this.props.loggedIn){
      this.getProfile()
      this.getFavorites()
    }
  }

  render(){
    return (
      <div className='app'>
        <BrowserRouter>
          <div className='container'>
            <Header />
            <main>
              <Route path='*' component={AuthRedirect} />
              <Route exact path='/' component={Landing} />
              <Route exact path='/signup' component={Landing} />
              <Route exact path='/login' render={(props) => <Landing getProfile={this.getProfile} {...props}/>} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/search' component={Search} />
            </main>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: !!state.token,
})

const mapDispatchToProps = (dispatch) => ({
  fetchClientProfile: () => dispatch(clientProfile.fetch()),
  fetchFavorites: () => dispatch(favorite.fetch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
