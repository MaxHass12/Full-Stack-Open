import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [loginVisible, setLoginVisible] = useState(false)

  const hideWhenLoginFormVisible = { display: loginVisible ? 'none' : '' }
  const showWhenLoginFormVisible = { display: loginVisible ? '' : 'none' }

  const toggleVisibility = () => {setLoginVisible(!loginVisible)}

  useImperativeHandle(ref, () => { return { toggleVisibility }})

  return (
    <div>
      <div style={hideWhenLoginFormVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenLoginFormVisible}                className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable