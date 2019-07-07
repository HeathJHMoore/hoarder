import React from 'react'
import { Link } from 'react-router-dom'

class MyStuff extends React.Component {
  render() {
    const singleView = '/stuff/1234'
    const editView = '/edit/1234'
    return (
      <div>
        <h1>My Stuff</h1>
        <Link to={singleView}>View Single</Link>
        <Link to={editView}>Edit a stuff</Link>
      </div>
    )
  }
}

export default MyStuff;