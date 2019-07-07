import React from 'react'

class MyStuff extends React.Component {
  render() {
    const editId = this.props.match.params.id;
    return (
      <h1>Editing My Stuff {editId}</h1>
    )
  }
}

export default MyStuff;