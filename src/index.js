import React from 'react';
import ReactDOM from 'react-dom';
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store';

const colors = {
    brand: {
        900: '#1a365d',
        800: '#153e75',
        700: '#2a69ac',
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
