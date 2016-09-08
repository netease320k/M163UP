import React from "react";
import {connect} from "react-redux";
import Nav from "./Nav";
import IssueStateSettings from "./IssueStateSettings";
import * as Actions from "../actions";
import {bindActionCreators} from "redux";
import IssueList from "./IssueList";
import {getSelectIssues} from "../selectors";
import Button from "./Button";

const App = ({
    labels,
    issues,
    appState,
    actions:{changeAppState}
}) => (
    <div>
        <Nav labels={labels}
             issueLabel={appState.get('issueLabel')}
             onLabelClick={(issueLabel)=>changeAppState({
                 issueLabel
             })}/>
        <IssueStateSettings issueState={appState.get('issueState')}
                            onButtonClick={(issueState)=>changeAppState({
                                issueState
                            })}/>
        <Button active={appState.get('showDetail')} onClick={()=>changeAppState({
            showDetail:!appState.get('showDetail')
        })}>显示详细</Button>
        <IssueList issues={issues} showDetail={appState.get('showDetail')}/>
    </div>
);

const mapStateToProps = state => {
    const {appState, labels, loading}=state;
    return ({
        labels,
        issues: getSelectIssues(state),
        appState,
        loading
    });
};

const mapDispatchToProps = dispatch => ({actions: bindActionCreators(Actions, dispatch)});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
