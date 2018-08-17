import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import AppContainer from './container/App';
import AppReducer from './reducers';
import App from './example/example';

const store = createStore(AppReducer);

class App1 extends Component{
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}

ReactDOM.render(<App1 />, document.getElementById('root'));