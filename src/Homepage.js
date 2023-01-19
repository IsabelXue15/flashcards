import React from 'react';

import { Link, withRouter } from "react-router-dom";
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        // if (!isLoaded(this.props.idList)) {
        //     return<div>Loading...</div>;
        // }
        console.log("my props", this.props);
        const idList = this.props.idList.map((idList, listLength) => {
            return (
                <tr key={listLength-1}>
                    <td><Link to={`/viewer/${idList}`}>{ idList }</Link></td>
                </tr>
            );
        });
    
        return (
            <div>
                <Link to="/editor">Go to Card Editor</Link>
                <br></br>
                <Link to="/viewer">Go to Card Viewer</Link>
                <br></br>
                <table>
                    <tbody>{ idList }</tbody>
                </table>
            </div>
        ); 
    }
}

const mapStateToProps = (state, props) => {
    console.log(state);
    const idList = Object.keys(state.firebase.data.flashcards.homepage);
    console.log('idList', idList);
    const listLength = idList.length;
    const nameList = [];
    for (const element of idList)
    {
        console.log("this state", state)
        // const myName = Object.keys(state.firebase.data.flashcards.homepage[props.match.params.element]);
        // console.log(myName);
        // nameList.push(myName);
    }    
    return { idList: idList, listLength: listLength, nameList: nameList };
}

export default compose(
    withRouter,
    firebaseConnect(props => {
        console.log('props', props)
        const homepage = props.match.params.homepage;
        return [{ path: `/flashcards/homepage`, storeAs: homepage }];
    }),
    connect(mapStateToProps),
)(Homepage);
