import Cookies from 'js-cookie';
import axios from 'axios';
import React from 'react';
import { Redirect } from "react-router-dom";

 

let ongoing1 = false
export function Api_Logout(setGuest){
    if(ongoing1 === false){
        ongoing1 = true;
        axios.get('api/logout') //apiだからapi/
                    .then(res => {
                        setGuest(); //setState
                        console.log("logout")
                        ongoing1 = false
                    })
                    .catch(e => {
                        //なるべくこっちには流れないようにLaravel側で調整をするべき
                        console.log(e.response)
                        ongoing1=false;
                    });
    }
    
}

 

let ongoing2 = false
export function Api_Login(email, password, setIsGuest){
     if(ongoing2 === false){
        ongoing2 = true;
        axios.post('api/login',{'email': email,'password': password})
                    .then(res => {
                        const data = res.data.user_data;
                        setIsGuest(data);
                        console.log("login")
                        ongoing2 = false
                    })
                    .catch(e => {
                        ongoing2 = false
                        console.log(e.response);
                        setIsGuest(-1);
                    });
     }
}

 

let ongoing3 = false
export function Api_LoginWithToken(setIsGuest){
    if(ongoing3 === false){
        ongoing3 = true
        axios.get('/api/login_init')
                    .then(res => {
                        const data = res.data.user_data;
                        setIsGuest(data);
                        console.log("initial_login")
                        console.log(res);
                        ongoing3 = false
                    })
                    .catch(e => {
                        console.log(e.response);
                        ongoing3 = false
                        setIsGuest(-1);
                    });
    }
}

 

let ongoing4 = false
export function Api_Signup(email, name, password, setIsGuest){
     if(ongoing4 === false){
        ongoing4 = true
        axios.post('api/signup',{'name': name, 'email': email,'password': password})
                    .then(res => {
                        const data = res.data.user_data;
                        setIsGuest(data);
                        ongoing4 = false;
                    })
                    .catch(e => {
                        console.log(e.response)
                        ongoing4 = false;
                    });
     }
}
