import React, {Component} from 'react';
import './App.css';
import PlusButton from './components/plusbutton';
import Folder from './components/folder';

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
        if (buttonType === 'root') {
            this.setState((prevState) => {
                prevState.rootFolders.push({file: 1});
                return {rootFolders: prevState.rootFolders,folderIndex: prevState.folderIndex + 1}
            });
        }
    }

    subFolderPlusButtonClick(){
        this.setState((prevState) => {
            return {folderIndex: prevState.folderIndex + 1}
        });
    }

    render() {
        return (
            <div className="app-container">
                <div className="folder-structure-container">
                    {
                        this.state.rootFolders.map((file, index) => {
                            return (<Folder key={'folder' + index} onSubPlusButtonClick={this.subFolderPlusButtonClick} number={this.state.folderIndex}/> );
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

export default App;
