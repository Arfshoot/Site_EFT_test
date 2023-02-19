import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";


// dev tools
import { composeWithDevTools } from "redux-devtools-extension";



// scss et js
import './styles/index.scss';
import App from './App';
import rootReducer from "./reducers";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
</Provider>
  
);


