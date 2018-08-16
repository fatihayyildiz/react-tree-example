/**
 * Created by fatihayyildiz on 16.08.2018.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PlusImage from './assets/images/plus.svg';

class PlusButton extends Component {

    constructor(props) {
        super(props)
        this.handlePlusClick = this.handlePlusClick.bind(this);
    }

    handlePlusClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.type || 'root');
        }
    }

    // TODO: Fill svg button color as custom
    render() {
        return (
            <img src={PlusImage} style={{color: 'red', fill: '#F0F0F0'}} alt="Plus button" width={this.props.width}
                 height={this.props.height}
                 onClick={this.handlePlusClick}/>
        )
    }
}

PlusButton.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.string.isRequired,
    width:PropTypes.number,
    height:PropTypes.number
};

PlusButton.defaultProps = {
    width:24,
    height:24
}

export default PlusButton