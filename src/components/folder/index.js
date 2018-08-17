/**
 * Created by fatihayyildiz on 16.08.2018.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DownImage from './assets/images/down.svg';
import RightImage from './assets/images/right.svg';
import './assets/styles/style.css';
import PlusButton from '../plusbutton';

import {bindActionCreators} from 'redux';
import {SubPlusButtonClick} from '../../actions/folderAction';
import {connect} from 'react-redux';

class Folder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            folded: false,
            subFolders: [],
            privateFolderIndex: this.props.number,
            privateSubFolderIndex: this.props.number
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

        if(this.props.SubPlusButtonClick){
            this.props.SubPlusButtonClick(
                {
                    currentItemId: this.props.number,
                    globalIndex: this.props.globalIndex,
                    items: this.props.items
                })
        }
    }

    render() {
        const {SubPlusButtonClick,items,...cleanedProps} = this.props;
        return (
            <React.Fragment>
                <div className="folder-container">


                    <img className="folder-image" src={(this.state.folded) ? DownImage : RightImage} width={24}
                         height={24}
                         alt="Right Icon"
                         onClick={this.foldingButtonClick}/>
                    <div className="folder-number">{this.props.number}</div>


                </div>
                {
                    this.state.folded ?
                        <div>
                            <div className="folder-structure-container">
                                {

                                    this.props.childrens ?

                                        this.props.childrens.map((file, index) => {

                                            return (<Folder key={'folder' + index}
                                                            {...file}
                                                            {...this.props}
                                                            number={file.id}/> );
                                        })
                                        : null
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
    number: PropTypes.any
};


const mapStateToProps = (state) => {
    return {globalIndex: state.FolderReducer.globalIndex || 0, items: state.FolderReducer.items}
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({SubPlusButtonClick}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Folder);