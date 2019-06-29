import React from 'react';
import Navegador from './navbar.jsx';
import * as request from 'superagent';
import {carro, total, visible, producto} from './servicio.js'
import { Button, Navbar} from 'reactstrap';
import {Link}from 'react-router-dom'


const barra = {
    backgroundColor: "white",
}
const nuevo ={
    width:"20%",
    border: "1px"
}
const horizontal ={
    backgroundColor: "white",
    opacity: 0.95,
    display: "flex",
    flexWrap:"wrap"
}

function TarjetaCarro() {
        let items = []
        for(let i=0; i < carro.length; i++){
            items.push(   

                            <div style={nuevo}>
                                 <h2>{carro[i].nombre}</h2>
                                 <image width="20%" src={carro[i].imagen}/>
                                <div>Subtotal. {carro[i].subtotal} </div>
                                <p>Unidades: {carro[i].unitario} </p>
                            </div>
                       
                      )  
        }

    return(
        <div style={horizontal}>{items}</div>

    )
}

function pagar(){
    let cantidadfinal=0
    for(let i=0; i < carro.length; i++){
        console.log("en el for " + carro[i].id )
        console.log(carro)
        cantidadfinal=carro[i].cantTotal - carro[i].unitario;
        request
        .patch('https://ecommerce-nu-odvh.firebaseio.com/productos/'+ carro[i].id+'.json')
        .send('{"cantidad":'+cantidadfinal+'}')
        .end((err, res)=>{
            
            })

            carro.pop()
        }
    total.pop();

   
}

class Carrito extends React.Component{

    componentWillMount(){
        visible.pop();
        visible.push(false)
    }
   
    render(){
                
        return(
            
            <div>
            <Navegador/>
            <div className="container" >
                <Navbar style={barra}>
                        <h1><b>Total: </b> S/ {total}</h1>
                        <div>
                            <Link to="/principal">
                                <Button color="danger">Cancelar</Button>
                            </Link>
                            <Link to="/principal">
                                <Button color="success" onClick={pagar.bind(this)}> Pagar </Button>
                            </Link>
                        </div>
                    </Navbar>
            </div>
            <div className="container" >
                <TarjetaCarro/>
            </div>
            </div>
        )}
}

export default Carrito;