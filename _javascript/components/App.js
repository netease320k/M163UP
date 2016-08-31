import React from "react";
import {connect} from "react-redux";
import Nav from "./Nav";
import IssueStateSettings from "./IssueStateSettings";
import * as Actions from "../actions";
import {bindActionCreators} from "redux";
import IssueList from "./IssueList";
import {concatIssueURL, labels_url, relLinktoPagenumber} from "../constants";
import Pagination from './Pagination'

const App = ({
    labels,
    issues,
    appState,
    actions:{changeAppState}
}) => {
    if (labels.length === 0 || issues === undefined) {
        return <p>加载中...</p>
    }

    return (
        <div>
            <Nav labels={labels}
                 issueLabel={appState.issueLabel}
                 onLabelClick={(issueLabel)=>changeAppState({
                     issueLabel
                 })}/>
            <input id="show-detail-checkbox" type="checkbox"/>
            <IssueStateSettings issueState={appState.issueState}
                                onButtonClick={(issueState)=>changeAppState({
                                    issueState
                                })}/>

            <IssueList issues={issues}/>
        </div>

    )
};

const mapStateToProps = (state) => {
    const {appState, issues, labels, loading}=state;
    return {
        labels,
        issues: Object.keys(issues)
            .map(i => issues[i])
            .sort((a, b) => b.id - a.id)
            .filter(i => {
                const {issueLabel, issueState} = appState;
                let a, b;
                switch (issueLabel) {
                    case '':
                        a = true;
                        break;
                    case 'no-label':
                        a = i.labels.length == 0;
                        break;
                    default:
                        a = i.labels.map( label => label.name).includes(issueLabel);
                }
                switch (issueState){
                    case 'all':
                        b=true;
                        break;
                    default:
                        b= i.state === issueState
                }
                return a&&b;
            })
        ,
        appState,
    }
};

const mapDispatchToProps = (dispatch)=> ({actions: bindActionCreators(Actions, dispatch)});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
