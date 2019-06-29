import React from 'react';
import Navegador from './navbar.jsx'
import {Col, Row, Button} from 'reactstrap'
import {item} from './servicio.js'
import { Link} from 'react-router-dom'

const margen = {
    backgroundColor: "white"
}
const imagenst ={ 
    width: "80%",
    height: "80%",
}


function ArticuloC(){
     
    console.log("Arti" + item)
    let propiedades=item.pop();
    let cantidad=item.pop();
    let precio=item.pop();
    let nombre=item.pop();
    let imagen=item.pop();


    return(
        <div className="container" style={margen}>
        <div>
        <Row>
            <Col sm="3">
                <h1>{nombre}</h1> 
            </Col>
        </Row>
        <Row>
            <Col sm="6">
                <img style={imagenst} src={imagen} />
            </Col>
            <Col sm="6">
                <h2><b>Precio: S/ </b>{precio}</h2>
                <h2><b>Cantidad: </b>{cantidad}</h2>
                <h2><b>Popiedades: </b></h2>{propiedades}
            </Col>
        </Row>
        <Row>
            <Col sm="3">
                <Link to="/principal">
                <Button color="primary"> Atras </Button>
                </Link>
            </Col>
        </Row>
        </div>
        </div>
    )
}

class Articulo extends React.Component{
  
    render(){
                
        return(
            <div>
            <Navegador/>
            <div className="container">
                <ArticuloC />
            </div>
            </div>
        )}
}

export default Articulo;