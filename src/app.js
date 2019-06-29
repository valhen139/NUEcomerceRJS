import React from 'react';
import { render } from 'react-dom';
import Login from './login.jsx';
import Principal from './principal.jsx'
import Carrito from './carrito.jsx'
import Articulo from './verarticulo.jsx'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
library.add(faIgloo)


render( <
    BrowserRouter >

    <
    Switch >
    <
    Route path = "/"
    component = { Login }
    exact / >
    <
    Route path = "/principal"
    component = { Principal }
    exact / >
    <
    Route path = "/articulo"
    component = { Articulo }
    exact / >
    <
    Route path = "/carrito"
    component = { Carrito }
    exact / >
    <
    /Switch>

    <
    /BrowserRouter>, document.getElementById('app'))