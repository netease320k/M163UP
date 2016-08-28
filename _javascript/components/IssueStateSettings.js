import React from 'react'

const IssueSateSettings = ({onButtonClick, issueState})=>(
    <div className="issue-state-settings">
        {
            [['all', '全部'], ['open', '排队中'], ['closed', '已处理']]
                .map(
                    ([code,name])=>(code == issueState ?
                            <span disabled="disabled" className="button active" key={code}>{name}</span> :
                            <button className="button" key={code} onClick={()=>onButtonClick(code)}>{name}</button>
                    )
                )
        }
        <label htmlFor="show-detail-checkbox" className="button" id="show-detail-label">显示详细</label>
    </div>
);

export default IssueSateSettings