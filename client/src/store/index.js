import { configureStore } from '@reduxjs/toolkit';
import login from '../components/loginPanel/LoginSlice';
import weather from '../components/weatherList/WeatherSlice'
import value from '../components/exchangeValue/ValueSlice'
import char from '../components/charList/CharSlice'

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

const store = configureStore({
    reducer: {login,weather,value,char},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;