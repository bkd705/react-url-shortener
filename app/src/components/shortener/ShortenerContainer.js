import React from 'react'
import ShortenerForm from './ShortenerForm'
import './shortener.css'

export default function ShortenerContainer() {

  return (
    <div className="container">
      <h2>Shorten Your Url</h2>
      <ShortenerForm />
    </div>
  )
}
