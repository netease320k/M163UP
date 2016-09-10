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
        {appState.get('loading') ?
            <div className="progress-bar">
                <span className="meter"/>
            </div> : null }

        <div className="wrapper">
            {
                appState.get('err') ?
                    <div className="flash-error">
                        <span>{appState.get('err')}</span>
                    </div> : null
            }

            <header className="app-header">
                <Nav labels={labels}
                     issueLabel={appState.get('issueLabel')}
                     onLabelClick={(issueLabel)=>changeAppState({
                         issueLabel
                     })}/>
                <IssueStateSettings issueState={appState.get('issueState')}
                                    onButtonClick={(issueState)=>changeAppState({
                                        issueState
                                    })}/>

                <section className="breadcrumb">
                    <Button active={appState.get('issueLabel') == 'no:label' && appState.get('issueState') == 'open'}
                            onClick={()=>changeAppState({
                                issueLabel: 'no:label',
                                issueState: 'open'
                            })}>已提交</Button>
                    <Button active={appState.get('issueLabel') == 'has:label' && appState.get('issueState') == 'open'}
                            onClick={()=>changeAppState({
                                issueLabel: 'has:label',
                                issueState: 'open'
                            })}>排队中</Button>
                    <Button active={appState.get('issueLabel') == 'has:label' && appState.get('issueState') == 'closed'}
                            onClick={()=>changeAppState({
                                issueLabel: 'has:label',
                                issueState: 'closed'
                            })}>已处理</Button>
                </section>

                <section className="switch">
                    <label htmlFor="showDetail">显示详细</label>
                    <label className="label-switch">
                        <input type="checkbox" checked={appState.get('showDetail')} id="showDetail"
                               onChange={()=>
                                   changeAppState({
                                       showDetail: !appState.get('showDetail')
                                   })
                               }/>
                        <div className="checkbox"></div>
                    </label>
                </section>


            </header>

            <IssueList issues={issues} showDetail={appState.get('showDetail')}/>
        </div>
    </div>

);

const mapStateToProps = state => {
    const {appState, labels}=state;
    return ({
        labels,
        issues: getSelectIssues(state),
        appState
    });
};

const mapDispatchToProps = dispatch => ({actions: bindActionCreators(Actions, dispatch)});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
