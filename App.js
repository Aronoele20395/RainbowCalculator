import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { colors } from './redux/index';
import RootPage from './AppPage/rootPage';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={ createStore(colors) }>
                <RootPage />
            </Provider>
        );   
    }
}