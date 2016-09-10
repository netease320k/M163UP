import React, {PropTypes} from "react";
import Label from "./Label";

const Nav = ({labels, onLabelClick, issueLabel}) => (
    <nav className="label-list">
        <header className="label">标签:</header>
        <select className="label" value={issueLabel} onChange={(event) => onLabelClick(event.target.value)}>
            <option value=":all">全部</option>
            <option value="has:label">有标签</option>
            <option value="no:label">无标签</option>
            {
                labels.toSeq().map(label =>
                    <option
                        key={label.name}
                        value={label.name}>{label.name}</option>
                )}

        </select>
        <Label active={':all' == issueLabel} onClick={() => onLabelClick(':all')}>全部</Label>
        <Label active={'has:label' == issueLabel}
               onClick={() => onLabelClick('has:label')}>有标签</Label>
        <Label active={'no:label' == issueLabel} onClick={() => onLabelClick('no:label')}>无标签</Label>
        {
            labels.toSeq().map(label =>
                <Label
                    key={label.name}
                    onClick={() => onLabelClick(label.name)}
                    active={label.name == issueLabel}>{label.name}</Label>
            )}

    </nav>
);


export default Nav
