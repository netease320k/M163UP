import React from "react";
import Button from "./Button";

const IssueSateSettings = ({onButtonClick, issueState})=>(
    <section className="issue-state-settings">
        <input id="accordion-trigger" type="checkbox" defaultChecked/>
        <label htmlFor="accordion-trigger" className="state-setting-trigger">状态:</label>
            <div className="menu">
            {
            [['all', '全部'], ['open', '打开'], ['closed', '关闭']]
                .map(
                    ([code,name])=>(
                            <Button active={code == issueState} key={code} onClick={()=>onButtonClick(code)}>{name}</Button>
                    )
                )
            }
        </div>
    </section>
);

export default IssueSateSettings