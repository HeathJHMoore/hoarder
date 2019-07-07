import React from 'react'

class MyStuff extends React.Component {
  render() {
    const singleId = this.props.match.params.id;
    return (
      <h1>Single Stuff {singleId}</h1>
    )
  }
}

export default MyStuff;