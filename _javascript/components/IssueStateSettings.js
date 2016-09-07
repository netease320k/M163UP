import React from "react";
import Button from "./Button";

const IssueSateSettings = ({onButtonClick, issueState})=>(
    <div className="issue-state-settings">
        {
            [['all', '全部'], ['open', '排队中'], ['closed', '已处理']]
                .map(
                    ([code,name])=>(
                            <Button active={code == issueState} key={code} onClick={()=>onButtonClick(code)}>{name}</Button>
                    )
                )
        }
    </div>
);

export default IssueSateSettings