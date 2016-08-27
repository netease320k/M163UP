import React from 'react'
import Label from './Label'
import {convertDateTime} from '../constants'

const IssueHeader = ({title, labels})=>(
    <header className="issue-header">
        {title}
        <ul className="tag-list">
            {labels.map((label)=>
                <Label
                    key={label.name}
                    className="label"
                    color={label.color}
                    active={true}
                    onClick={()=>undefined}
                >{label.name}</Label>
            )}
        </ul>
    </header>
);



const IssueFooter = ({children})=>(
    <footer className="issue-footer">
        {children}
    </footer>
);

const Issue = ({issue})=>(
    <section className="issue">
        <IssueHeader title={issue.title} labels={issue.labels} />
        <div  className="issue-body" dangerouslySetInnerHTML={{__html: issue.body_html}}></div>
        <IssueFooter>
            <a href={issue.user.html_url}>{issue.user.login}</a>
            <span> 提交于 {convertDateTime(issue.created_at)} </span>
            {issue.closed_at?<span>处理于 {convertDateTime(issue.closed_at)}</span>:issue.created_at==issue.updated_at?null :<span> 更新于 {convertDateTime(issue.updated_at)} </span>}
            <a className="button" href={issue.html_url}>查看详细</a>
        </IssueFooter>
    </section>
);

export default Issue
