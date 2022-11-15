import React, { useState } from 'react'

function Togglable(props) {
  const [displayForm, setDisplayForm] = useState(false)

  const formDisplay = { display: displayForm ? '' : 'none' }
  const buttonDisplay = { display: displayForm ? 'none' : '' }

  const toggleDisplay = () => setDisplayForm(!displayForm)

  return (
    <div>
      <br />
      <div style={formDisplay}>
        {props.children}
        <button onClick={toggleDisplay}>cancel</button>
      </div>
      <div>
        <button style={buttonDisplay} onClick={toggleDisplay}>
          {props.buttonLabel}
        </button>
      </div>
    </div>
  )
}

export default Togglable
