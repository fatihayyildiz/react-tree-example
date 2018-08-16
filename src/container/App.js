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
    }


    rootPlusButtonClicked() {
        this.props.RootPlusButtonClick(this.props.storeFolderIndex + 1);
    }


    componentWillReceiveProps(nextProps){
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
    return {storeFolderIndex: state.FolderReducer.storeFolderIndex || 0}
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({RootPlusButtonClick}, dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
