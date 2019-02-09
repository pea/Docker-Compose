import React from 'react'
import axios from 'axios'

export class Index extends React.Component {
  static async getInitialProps ({ req }) {
    const wordpressRes = await axios({
      url: 'http://wordpress/wp-json'
    })
    const apiRes = await axios({
      url: 'http://api:3001'
    })
    return { wordpress: wordpressRes.data, api: apiRes.data }
  }
  render () {
    return (
      <>
        <h3>Response from Node API</h3>
        <div dangerouslySetInnerHTML={{
          __html: JSON.stringify(this.props.api)
        }} />

        <h3>Response from WordPress API</h3>
        <pre dangerouslySetInnerHTML={{
          __html: JSON.stringify(this.props.wordpress, null, 2)
        }} />
      </>
    )
  }
}

export default Index
