import React from 'react';
import Navegador from './navbar.jsx';
import * as request from 'superagent';
import {item,producto, uni, carro, total, visible} from'./servicio.js'
import {Button, Input, Col, Form,Navbar, NavbarBrand, Nav,} from 'reactstrap'
import { Link} from 'react-router-dom'

const barra = {
    backgroundColor: "white",
    align: "center",
    justifyContent: "center"
}

const acciones = {
    borderRadius: 70,
    width:"90%",
    height:"90%",
}

const accionesbtn = {
    //borderRadius: 70,
    width:"90%",
    height:"90%",
}

const imgprods = {
    width:"70%",
    height:"70%",
    borderRadius: 70,
}

const horizontal ={
    backgroundColor: "white",
    opacity: 0.95,
    display: "flex",
    flexWrap:"wrap"
}

const botones= {
    display: "flex",
    flexWrap:"wrap"
}

 function Tarjeta(propiedades){
     
  let array = [];
  let imagen;


  function unid(event){
    uni.pop()
    uni.push(parseInt(event.target.value))
    console.log(uni)

    }

    function cambiar(event){
        event.target.value = 1
    }

  for(let i = 0; i < propiedades.items.length; i++) {

    if (propiedades.items[i].imagen != null){
        imagen = propiedades.items[i].imagen;
       
        array.push(
            <Col sm="4">
            <div border="white">
                <img style={imgprods} src={(imagen)}></img>
                <div>
                    <h4><b>{propiedades.items[i].nombre}</b></h4>
                    <div><b>Precio: </b>{propiedades.items[i].precio}</div>
                    <div><b>Cantidad: </b>{propiedades.items[i].cantidad}</div>
                    <div style={botones}>
                    <Link to="/articulo">
                    <Button  style={acciones} color="primary" size="sm" onClick={vermas.bind(this,imagen,propiedades.items[i].nombre,propiedades.items[i].precio,propiedades.items[i].cantidad,propiedades.items[i].prop)}><img  style={accionesbtn} src="../assets/ver.png" /></Button> 
                    </Link>
                    <div>
                    <Button style={acciones} color="warning" size="sm" onClick={propiedades.agregar.bind(this,imagen,propiedades.items[i].nombre,propiedades.items[i].precio, uni, propiedades.items[i].cantidad)} ><img style={accionesbtn}  src="../assets/add.png" /></Button>
                    </div>
                    <Input className="col-sm-4" type="number"  placeholder="1" min="1" max={propiedades.items[i].cantidad} onChange={unid} onBlur={cambiar}/>
                    </div>
                </div>
            </div>
            </Col>
          );
    }
    
  }
  
  return (
    <div className="justify-content-start">
    <div style={horizontal}>
        
        {array}
       
    </div>
    </div>
  );
 
}



function vermas(imagen,nombre,precio,cantidad, propiedades){
    item.push(imagen,nombre,precio,cantidad, propiedades);
    console.log("ijfoijoi" + item);
}




class Principal extends React.Component{

    constructor(){
        super()
        this.state = {
            data: [],
            valido: false,
            verse: true
        };

        this.buscador = this.buscador.bind(this)
        this.agregar = this.agregar.bind(this)
        this.focus = this.focus.bind(this)
    }


    componentWillMount(){
        let j=producto.length
        for(let i=0; i < j; i++){
            producto.pop()
            
        }  
   
    }
    componentDidMount(){
     
        this.timer = setInterval(() => { this.cargardatos();}, 5000);
    }

    cargardatos(){
       
        if (producto.length == 0){
            
            request
            .get('https://ecommerce-nu-odvh.firebaseio.com/productos.json')
            .accept('json')
            .end((err, res)=>{
                if(err || !res.ok){
                    console.log("Se encontro un error")
                }else{
                    
                    
                    Object.values(res.body).map((valor)=>{
                        if(valor!=null){
                        producto.push(valor)
                        }
                    })
                    this.setState({data: producto} )
                   
                }
            })
            }else{
                this.setState({data: producto} )
            }
    
    
            if( carro.length != 0){
                visible.pop();
                visible.push(true);
            }else{
                visible.pop();
                visible.push(false);
            }
    }
    agregar(imagen, nombre, precio, cantidad, cantTotal){

        let subtotal = precio * cantidad;
        let unitario = cantidad[0];
        let val = true; 
        let  pre, sub, num, tot, id;
        let adicionar = []
    
        for(var i=0; i<producto.length; i++){
      
    
          if(producto[i].nombre == nombre){
            id=producto.indexOf(producto[i])
            producto[i].unidades = producto[i].cantidad - cantidad ;
          }
        }

        this.setState({data: producto})
        
        if (carro.length == 0){
            adicionar = {imagen, nombre, subtotal, unitario, id, cantTotal}
            total.push(subtotal) 
            carro.push(adicionar)
        }else{
            for(var x=0; x < carro.length; x++){
                if(carro[x].nombre == nombre){
                  pre = parseInt( carro[x].unitario) + parseInt(unitario) 
                  carro[x].unitario = pre;
                  num =  carro[x].subtotal;
                  sub =   num  + subtotal;
                  carro[x].subtotal = sub ;
                    tot = parseInt(total[0]);
                    total.pop()
                    total.push(tot + subtotal);
                  val = false;
                }
              }

             if(val==true){
                adicionar = {imagen, nombre, subtotal, unitario, id, cantTotal}
                tot = parseInt(total[0]);
                total.pop()
                total.push(tot + subtotal);
                console.log(total);
                carro.push(adicionar)
             } 
        }


        console.log(carro )
        uni.pop();
        uni.push(1);
        visible.pop();
        visible.push(true)
    }

    buscador(event){
        let subproducto = []

        for(var i=0; i<producto.length; i++){
            var cadena;
            cadena = producto[i].nombre;
      
            if(cadena.indexOf(event.target.value)!=-1){
              producto[i].vista = true
              subproducto.push(producto[i])
            }else{
              producto[i].vista = false
            }
          }

        this.setState({data: subproducto})
        console.log(subproducto);
    }

    focus(event){
        event.target.value =""
    }

    render(){ 
      
        return(
            <div>
            <Navegador/>
            <div className="container" >
                <Navbar style={barra}>
                    <NavbarBrand>
                        <h1>Catálogo de productos</h1>
                    </NavbarBrand>
                    <Nav className="ml-auto">
                        <Form>
                            <Input type="search" placeholder="Buscar.."  onChange={this.buscador} onBlur={this.focus} />
                        </Form>
                    </Nav>
                </Navbar>
                { producto.length==0 ?  <Navbar style={barra}><img src="../assets/load.gif"></img></Navbar>: 
                    <Tarjeta items={this.state.data} funcion={this.vermas} agregar={this.agregar}/>
                }
            </div>
            </div>
        )}
}

export default Principal;