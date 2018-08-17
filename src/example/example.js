/**
 * Created by fatihayyildiz on 17.08.2018.
 */
import React, {Component} from 'react';
import './example.css';

const data = [
    {
        label: 'Header title',
        id: 1,
        children: [
            {
                label: 'Sub-header title',
                id: 2,
                children: [
                    {label: '3rd level #1', id: 3},
                    {
                        label: '3rd level #2',
                        id: 4,
                        children: [
                            {label: 'Level 4', id: 5}
                        ]
                    }
                ]
            },
        ]
    },
    {
        label: 'Header #2',
        id: 6,
        children: [
            {label: '2nd level #1', id: 7,},
            {
                label: '2nd level #2',
                id: 8,
                children: [
                    {label: 'Level 3', id: 9}
                ]
            }
        ]
    }
]

class Item extends Component {

    toggleOpen = e => {
        e.preventDefault();
        e.stopPropagation();
        const {onClick, id} = this.props;
        onClick(id);
    };

    render() {
        const {label, children, isOpen, onClick} = this.props;
        return (
            <div className="item">
                <div
                    className={(children) ? "clickable":null}
                    onClick={children && this.toggleOpen}
                >
                    <div
                        className={'title-icon' + ((isOpen) ? ' open' : null) + ((children) ?  " has-children" : null)}

                    />
                    <div className="title">{label}</div>
                </div>
                <div className="children">
                    {
                        children &&
                        isOpen &&
                        children.map((item, index) => <Item key={index} {...item} onClick={onClick}/>)
                    }
                </div>
            </div>
        );
    }
}

class App extends Component {
    state = {
        items: data
    };

    toggleItem = (items, id) => {
        const nextState = items.map(item => {
            debugger;
            if (item.id !== id) {
                if (item.children) {
                    return {
                        ...item,
                        children: this.toggleItem(item.children, id)
                    };
                }
                return item;
            }
            return {
                ...item,
                isOpen: !item.isOpen
            };
        });
        return nextState;
    };

    onItemClick = id => {
        this.setState(prev => {
            const nextState = this.toggleItem(prev.items, id);
            return {
                items: nextState
            };
        });
    };

    render() {
        const {items} = this.state;
        return (
            <div>
                {items.map((item, index) => (
                    <Item key={index} {...item} onClick={this.onItemClick}/>
                ))}
            </div>
        );
    }
}


export default App;
