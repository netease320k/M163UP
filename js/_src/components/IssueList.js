import React from 'react'
import Issue from "./Issue";

const IssueList = ({issues, onTagClick, issueLabel,pagination}) => {
    if (issues.length == 0) {
        return <p>无数据</p>
    }
    return (<section className="issue-list-container">
            {pagination}
            <ul className="issue-list">{
                issues.map((issue)=> <Issue key={issue.id} issue={issue} issueLabel={issueLabel}
                                            onTagClick={onTagClick}/>)
            }
            </ul>
            {pagination}
        </section>

    );
};

export default IssueList