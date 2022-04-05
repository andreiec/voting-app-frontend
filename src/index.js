import React from 'react';
import ReactDOM from 'react-dom';
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store/index';

const colors = {
    brand: {
        main_blue: '#2F77CC',
        bg: '#F4F6FD',

        white: '#FFFFFF',
        green: '#46B652',
        green_light: '#58bd63',
        red: '#F26464',
        red_light: '#f47c7c',
        red_dark: '#f04c4c',
        orange: '#FFB648',
        blue_light: '#4384d1',

        text_title: '#161616',
        text_body: '#767676',
        text_unfocused: '#97bbe6',
        
        input_bg: '#EFF0F6',
        input_ph: '#D6D7E3', // placeholder
        label: '#B9B9B9',
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
