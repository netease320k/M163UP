import React, {PropTypes} from "react";

const Label = ({active, color, children, onClick}) =>
    active ?
        <span disabled="disabled" className="active label" style={{borderColor: `#${color}`}}>{children}</span> : (
        <a href="#"
           className="label"
           onClick={e => {
               e.preventDefault();
               onClick()
           }}>
            {children}
        </a>
    );


Label.propTypes = {
    active: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
};

export default Label
