import React, {PropTypes} from 'react'

const Label = ({active, color, children, onClick}) => {
    if (active) {
        return <span disabled="disabled" className="active label" style={{borderColor: `#${color}`}}>{children}</span>
    }

    return (
        <a href="#"
           className="label"
           onClick={e => {
               e.preventDefault();
               onClick()
           }}
        >
            {children}
        </a>
    )
};

Label.propTypes = {
    active: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Label
