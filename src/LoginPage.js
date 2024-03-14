import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import SignPage from "./SignPage";

class LoginPage extends React.Component{

    state={
        username:"",
        password:"",
        success:false,
        secret:"",
        hide:false

    }
    valueChanged =(key, e)=>{
        this.setState({[key]:e.target.value , success:false})
    }
    login =()=>{
        axios.post("http://localhost:8080/login",null,{
                params:{
                    username:this.state.username,
                    password:this.state.password,
                }
            }
        ).then(response=>{
            if(response.data.success){
                this.setState({success:true})
                const cookies = new Cookies(null, { path: '/' });
                cookies.set('id', response.data.id);
                cookies.set('secret', response.data.secret);
            }
        })
    }
    clicked = () =>{
        this.setState({hide:true})
    }

    render() {
        return(<div>{!this.state.hide ? <div><h3>Login Page</h3>
            <div>User name: <input value={this.state.username} onChange={(e)=>this.valueChanged("username",e)}/></div>
            <div>Password: <input type={"password"} value={this.state.password} onChange={(e)=>this.valueChanged("password",e)}/></div>
            <div><button onClick={this.login}>Login</button></div>
            {this.state.success&& "connection success"}
            You don't have an account? <div style={{color:"blue"}} onClick={this.clicked}>sign up</div>  </div>: <div><SignPage/></div>
       }

        </div>)
    }

}export default LoginPage;