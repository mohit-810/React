import React, {Component} from  'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import {Provider} from 'react-redux'
import {Configure, ConfigureStore} from './redux/ConfigureStore'

const store=ConfigureStore();
class App extends Component {


  render() {
    return (
      <Provider store={store}>

      <div className="App">
        <BrowserRouter>
      <Main />
      </BrowserRouter>
    </div>
    </Provider>
    );
  }
}


export default App;
