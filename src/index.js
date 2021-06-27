import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App.js";
import {applyMiddleware, createStore} from "redux";
import {counterReducer} from './reducer'
import {Provider} from "react-redux";
import {logger} from 'redux-logger';

// the simple way to create the middleware function
const myLogger = (store) => (next) => (action) => {
  return next(action)
}
// the complex way to create the middleware function
// const myLogger = (store) => {
//   return (next) => {
//     return (action) => {
//       console.log('middleware ran')
//       return next(action)
//     }
//   }
// }

const capAtTen = (store) => (next) => (action) => {
  if (store.getState() >= 10) {
    return next({type: 'DECREMENT'})
  }
  next(action)
}


const store = createStore(counterReducer, applyMiddleware(myLogger, capAtTen, logger))

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('root'))