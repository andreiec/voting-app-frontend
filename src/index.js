import React from 'react';
import ReactDOM from 'react-dom';
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store/index';

const colors = {
    brand: {
        blue: '#2F77CC',
        bg: '#F4F6FD',
        text_unfocused: '#97bbe6',
    },
}

const theme = extendTheme({ colors })

ReactDOM.render(
    <Provider store={store}>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </Provider>,
    document.getElementById('root')
);
