import React, {Component} from 'react';
import './App.css';
import PlusButton from '../components/plusbutton';
import Folder from '../components/folder';
import {bindActionCreators} from 'redux';
import {RootPlusButtonClick} from '../actions/folderAction';
import {connect} from 'react-redux';

class App extends Component {

    /*
    * {id: 1, childrens: []},
     {
     id: 2,
     childrens: [
     {id: 4, childrens: [
     {id: 7, childrens: []}
     ]},
     {id: 6, childrens: []}
     ]
     },
     {id: 3, childrens: []},
     {id: 5, childrens: []}*/
    constructor(props) {
        super(props);
        this.state = {
            rootFolders: [

            ],
            folderIndex: 0
        };
        this.rootPlusButtonClicked = this.rootPlusButtonClicked.bind(this);
    }


    rootPlusButtonClicked(buttonType) {
        this.props.RootPlusButtonClick(
            {
                globalIndex:this.props.globalIndex + 1,
                items: this.state.rootFolders
            });
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.globalIndex !== nextProps.globalIndex) {
            this.setState((prevState)=>{
                return {rootFolders:nextProps.items}
            });
        }
    }


    render() {
        return (
            <div className="app-container">
                <div className="folder-structure-container">
                    {
                        this.state.rootFolders.map((file, index) => {
                            return (<Folder key={'folder' + index} {...file} number={file.id} /> );
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
    return {globalIndex: state.FolderReducer.globalIndex || 0,items:state.FolderReducer.items}
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({RootPlusButtonClick}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
