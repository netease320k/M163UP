import React, {PropTypes} from "react";
import Label from "./Label";

const Nav = ({labels, onLabelClick, issueLabel}) => (
    <nav>
        <Label active={':all' == issueLabel} color="000000" onClick={() => onLabelClick(':all')}>全部</Label>
        <Label active={'has:label' == issueLabel} color="000000" onClick={() => onLabelClick('has:label')}>有标签</Label>
        <Label active={'no:label' == issueLabel} color="000000" onClick={() => onLabelClick('no:label')}>无标签</Label>
        {
            labels.toSeq().map(label =>
                <Label
                    key={label.name}
                    {...label}
                    onClick={() => onLabelClick(label.name)}
                    active={label.name == issueLabel}>{label.name}</Label>
            )}
    </nav>
);


export default Nav
