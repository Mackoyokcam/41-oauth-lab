import './search.scss'

import React from 'react'
import {connect} from 'react-redux'
import Charity from '../charity'
import SearchForm from '../search-form'
import * as charity from '../../action/charity.js'

class Search extends React.Component {

  componentWillMount() {
    this.props.search()
  }

  render(){

    let {charities, search, changePage} = this.props
    let count = Math.floor(charities.count / 10)
    return (
      <div className='search'>
        <h2> Search for Charities </h2>
        <SearchForm onComplete={search} />
        {charities.data.map((charity, i) =>
          <Charity
            charity={charity}
            key={i}
          />
        )}
        {charities.data.length ?
          <p> <button onClick={() => changePage(charities.links.prev)}>Previous</button>
            <button onClick={() => changePage(charities.links.prev)}>Next</button>
            <button onClick={() => changePage(charities.links.prev)}>Last</button> </p>
          : <p> No results </p>}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  charities: state.charities,
})

const mapDispatchToProps = (dispatch) => ({
  search: (query) => dispatch(charity.search(query)),
  changePage: (url) => dispatch(charity.changePage(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
