import React from 'react';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import * as request from 'superagent'

const formulario = {
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '640px',
    height: '120px',
    marginLeft: '-320px',
    marginTop: '-120px'
  };

  const imagen = {
    backgroundImage: "url('../assets/login-fondo.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
    position: 'absolute',
  }
  const boton = {
    borderRadius: 80,
}

  const Section = (props) => {
    return <section><FormText color="danger" width="100%"><h2 width="100%" >Fallo Login!</h2></FormText></section>
  }

  
class Login extends React.Component{
  constructor(props){
      super(props)
      this.state = {
          email: '',
          password: '',
          data: [],
          valido: false
      };

    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.validar = this.validar.bind(this);
      
  }

componentWillMount(){
    request
    .get('https://ecommerce-nu-odvh.firebaseio.com/usuarios.json')
    .accept('json')
    .end((err, res)=>{
        if(err || !res.ok){
            console.log("Se encontro un error")
        }else{
            
            this.setState({data: Object.values(res.body)} )
            
        }
    })   
}
  
changeEmail(event){
    this.setState({email: event.target.value})
}

changePassword(event){
    this.setState({password: event.target.value})
}

validar(){

    this.setState({valido: true});

    for(var x=0; x < this.state.data.length; x++){
        if(this.state.mail == this.state.data[x].email && this.state.password == this.state.data[x].password){
            this.setState({valido: false});
            this.props.history.push("/principal");
        }
    }

    
}
        
    render(){
        return(
    <div>
        <div style={imagen}></div>
        <Form style={formulario} onSubmit={this.validar.bind(this)} target="principal">
            <div className="text-center">
            { this.state.valido ? <Section/> : null }
                <Label><h3>Ingresa</h3></Label>
            </div>
            
            <FormGroup>
                <Input type="email" name="email" id="exampleEmail" value={this.state.email} onChange={this.changeEmail} required placeholder="Email"/>
            </FormGroup>
            <FormGroup>
                <Input type="password" name="password" id="examplePassword" value={this.state.password} onChange={this.changePassword} required placeholder="Password"/>
            </FormGroup>
            
            <div className="text-center">
                <Button style={boton}><img src="../assets/login.png" /></Button>
            </div>
        </Form>
        <iframe name="principal" ></iframe>
    </div>
      
     
    )}

    
}



export default Login;