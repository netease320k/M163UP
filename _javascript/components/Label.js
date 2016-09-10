import React, {PropTypes} from "react";

const Label = ({active, children, onClick, ...others}) =>
    active ?
        <span className="active label" {...others}>{children}</span> :
        <button
            className="label"
            onClick={e => {
                e.preventDefault();
                onClick()
            }}
            {...others}>
            {children}
        </button>;


Label.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
};

export default Label
