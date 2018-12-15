import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Button } from '../Button'

function ButtonLink({ to, match, location, history, staticContext, onClick, children, ...rest }) {
  return (
    <Button
      {...rest}
      onClick={(e) => {
        onClick(e)
        history.push(to)
      }}
    >
      {children}
    </Button>
  )
}

ButtonLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  staticContext: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
}

ButtonLink.defaultProps = {
  onClick: () => {},
}

export default withRouter(ButtonLink)
