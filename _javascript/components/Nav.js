import React, {PropTypes} from 'react'
import Label from './Label'

const Nav = ({labels, onLabelClick, issueLabel}) => (
    <nav>
        <Label active={'' == issueLabel} color="" onClick={() => onLabelClick('')}>全部</Label>
        {labels.map(label =>
            <Label
                key={label.name}
                {...label}
                onClick={() => onLabelClick(label.name)}
                active={label.name == issueLabel}
            >{label.name}</Label>
        )}
    </nav>
);


Nav.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onLabelClick: PropTypes.func.isRequired
};

export default Nav
