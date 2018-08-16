/**
 * Created by fatihayyildiz on 16.08.2018.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DownImage from './assets/images/down.svg';
import RightImage from './assets/images/right.svg';
import './assets/styles/style.css';
import PlusButton from '../plusbutton';

class Folder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            folded: false,
            subFolders: [],
            privateFolderIndex:this.props.number,
            privateSubFolderIndex:this.props.number
        };
        this.foldingButtonClick = this.foldingButtonClick.bind(this);
        this.subPlusButtonClicked = this.subPlusButtonClicked.bind(this);
    }

    foldingButtonClick() {
        this.setState((prevState) => {
            return {folded: !prevState.folded}
        });

    }

    subPlusButtonClicked() {

        if(this.props.onSubPlusButtonClick){
            this.props.onSubPlusButtonClick();
        }

        this.setState((prevState) => {
            prevState.subFolders.push({file: 1});
            return {subFolders: prevState.subFolders,privateSubFolderIndex:prevState.privateSubFolderIndex + 1}
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="folder-container">


                    <img className="folder-image" src={(this.state.folded) ? DownImage : RightImage} width={24}
                         height={24}
                         alt="Right Icon"
                         onClick={this.foldingButtonClick}/>
                    <div className="folder-number">{this.state.privateFolderIndex + 'th Folder'}</div>


                </div>
                {
                    this.state.folded ?
                        <div>
                            <div className="folder-structure-container">
                                {
                                    this.state.subFolders.map((file, index) => {
                                        return (<Folder key={'folder' + index} number={this.state.privateSubFolderIndex}/> );
                                    })
                                }
                            </div>
                            <div className="sub-folder-plus-button">
                                <PlusButton type={'sub'} width={14} height={14} onClick={this.subPlusButtonClicked}/>
                            </div>
                        </div>

                        : null
                }
            </React.Fragment>
        )
    }
}

Folder.propTypes = {
    onSubPlusButtonClick: PropTypes.func,
    number: PropTypes.number.isRequired
};

export default Folder