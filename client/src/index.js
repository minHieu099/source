import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'

import Layout from './components/layout/Layout'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/css/grid.css'
import './assets/css/theme.css'
import './assets/css/index.css'
import "react-toastify/dist/ReactToastify.css";
import store from './redux/store';
// Page test Data Redux
import Flowdata from './testdata/flowData';

//  test loading err
import Loading from './components/loadingError/Loading';
import Message from './components/loadingError/Error';
document.title = 'Reconnaissance Tool'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <React.StrictMode>
        <Layout />
        {/* <Flowdata /> */}
        {/* <Loading/>
        <Message  variant="alert-danger">{`Long`}</Message> */}
      </React.StrictMode>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
