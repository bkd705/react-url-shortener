import React from 'react'
import axios from 'axios'

export default class ShortenerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseUrl: '',
      shortUrl: '',
      show: false,
      errMsg: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    this.setState({ show: false, errMsg: '' })
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    const regex = new RegExp(expression)

    if(this.state.baseUrl.match(regex)) {
      axios.post('http://localhost:8080/url/new', this.state).then(res => {
        if(res.data.type === 'success') {
          this.setState({ show: true })
        }
      }).catch(err => {
        const message = err.response.data.message
        console.log(message)
        this.setState({ errMsg: message })
      })
    } else {
      this.setState({ errMsg: 'Not a valid link!' })
    }
  }

  render() {

    const showUrl = (
      <p>URL is Available At - <a href={`http://localhost:8080/url/${this.state.shortUrl}`}>http://localhost:8080/url/{this.state.shortUrl}</a></p>
    )

    const empty = (
      <p> </p>
    )

    const showErr = (
      <p style={{color: 'red'}}>{this.state.errMsg}</p>
    )

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder='Original URL' name='baseUrl' value={this.state.baseUrl} onChange={this.onChange} />
          <input type="text" placeholder='Desired Short Url' name='shortUrl' value={this.state.shortUrl} onChange={this.onChange} />
          <button type="submit">Shorten</button>
        </form>
        { this.state.show ? showUrl : empty }
        { this.state.errMsg !== '' ? showErr : empty }
      </div>
    )
  }
}
