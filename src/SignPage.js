import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

class SignPage extends React.Component{
    state = {
        username:"",
        password:"",
        repeatPassword:"",
        email:"",
        success:false
    }
    valueChanged =(key, e)=>{
        this.setState({[key]:e.target.value,success:false })
    }
    signUp =()=>{
        axios.post("http://localhost:8080/create-account",null,{
                params:{
                    username:this.state.username,
                    password:this.state.password,
                    password1:this.state.repeatPassword,
                    email:this.state.email
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
    render() {
        return(<div>
            <h3>Sign Page</h3>
            <div>User name: <input value={this.state.username} onChange={(e)=>this.valueChanged("username",e)}/></div>
            <div>Password: <input type={"password"} value={this.state.password} onChange={(e)=>this.valueChanged("password",e)}/></div>
            <div>repeatPassword: <input type={"password"} value={this.state.repeatPassword} onChange={(e)=>this.valueChanged("repeatPassword",e)}/></div>
            <div>Email: <input value={this.state.email} onChange={(e)=>this.valueChanged("email",e)}/></div>
            <div><button onClick={this.signUp}>Sign Up</button></div>
            {this.state.success&& "user is created"}
        </div>)
    }

}export default SignPage;