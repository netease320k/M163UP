import React from "react";
import Issue from "./Issue";

const IssueList = ({issues, onTagClick, issueLabel,showDetail}) => {
    if (issues.isEmpty()) {
        return <p>无数据</p>
    }
    return (<section className="issue-list-container">
            <ul className="issue-list">{
                issues.valueSeq().map( issue => <Issue key={issue.id} issue={issue} issueLabel={issueLabel} showDetail={showDetail}
                                            onTagClick={onTagClick}/>)
            }
            </ul>
        </section>

    );
};

export default IssueList