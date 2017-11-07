import './search.scss'

import React from 'react'
import {connect} from 'react-redux'
import Charity from '../charity'
import SearchForm from '../search-form'
import * as charity from '../../action/charity.js'

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.handleSearch = this.handleSearch.bind(this)
    this.handlChangePage = this.handleChangePage.bind(this)
  }

  handleSearch(query) {
    this.props.search(query)
  }

  handleChangePage(url) {
    this.props.changePage(url)
  }

  render(){

    let {charities} = this.props
    let count = Math.floor(charities.count / 10)
    return (
      <div className='search'>
        <h2> Search for Charities </h2>
        <SearchForm onComplete={this.handleSearch} />
        {charities.data.map((charity, i) =>
          <Charity
            charity={charity}
            key={i}
          />
        )}
        {charities.data.length ?
          <p> <button onClick={() => {this.handleChangePage(charities.links.prev)}}>Previous</button>
            <button onClick={() => {this.handleChangePage(charities.links.next)}}>Next</button>
            <button onClick={() => {this.handleChangePage(charities.links.last)}}>Last</button> </p>
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
