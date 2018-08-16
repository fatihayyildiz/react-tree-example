import React, {Component} from 'react';
import './App.css';
import PlusButton from '../components/plusbutton';
import Folder from '../components/folder';
import {bindActionCreators} from 'redux';
import {RootPlusButtonClick} from '../actions/folderAction';
import {connect} from 'react-redux';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rootFolders: [],
            folderIndex:0
        };
        this.rootPlusButtonClicked = this.rootPlusButtonClicked.bind(this);
        this.subFolderPlusButtonClick = this.subFolderPlusButtonClick.bind(this);
    }


    rootPlusButtonClicked(buttonType) {
        this.props.RootPlusButtonClick(this.props.storeFolderIndex + 1);
        /*if (buttonType === 'root') {
            this.setState((prevState) => {
                prevState.rootFolders.push({file: 1});
                return {rootFolders: prevState.rootFolders,folderIndex: prevState.folderIndex + 1}
            });
        }*/
    }


    componentWillReceiveProps(nextProps,nextContext){
        if(this.props.storeFolderIndex !== nextProps.storeFolderIndex){
            console.log('store index incremented',nextProps.storeFolderIndex);
        }

    }

    render() {
        return (
            <div className="app-container">
                <div className="folder-structure-container">
                    {
                        this.state.rootFolders.map((file, index) => {
                            return (<Folder key={'folder' + index} number={this.state.folderIndex}/> );
                        })
                    }
                </div>
                <div className="plus-button-block">
                    <PlusButton type={'root'} height={36} width={36} onClick={this.rootPlusButtonClicked}/>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {storeFolderIndex: state.FolderReducer.storeFolderIndex || 1}
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({RootPlusButtonClick}, dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
