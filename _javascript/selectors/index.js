import {Seq} from "immutable";
import {createSelector} from "reselect";

const getIssueLabel = state => state.appState.get('issueLabel');

const getIssueState = state => state.appState.get('issueState');

const getIssues = state => state.issues;

export const getSelectIssues = createSelector(
    [getIssueLabel, getIssueState, getIssues],
    (issueLabel, issueState, issues) =>
        Seq(issues).filter(i => {
            let a, b;
            switch (issueLabel) {
                case 'no:label':
                    a = i.labels.length == 0;
                    break;
                case 'has:label':
                    a = i.labels.length > 0;
                    break;
                case ':all':
                    a = true;
                    break;
                default:
                    a = i.labels.some(label => issueLabel === label.name)
            }
            switch (issueState) {
                case 'all':
                    b = true;
                    break;
                default:
                    b = issueState === i.state
            }
            return a && b;
        }).sortBy(i => -i.id)
);