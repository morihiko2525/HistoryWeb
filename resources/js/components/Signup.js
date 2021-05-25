import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import { Redirect } from "react-router-dom";
import { Api_Signup } from './api/Api';

export default class Signup extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'name':'',
            'password':'',
            'email':'',
        };
        this.trySignup = this.trySignup.bind(this);
    }
    
    trySignup = async e => {
        e.preventDefault();
        await Api_Signup(this.state.email, this.state.name, this.state.password, this.props.setIsGuest);
        console.log(this.props.isGuest);
        console.log(6);
    };
    
    render(){
        const is_guest = this.props.isGuest;
        
        if(!is_guest){
            return(<Redirect push to="/" />);
        }
        
        return (
          <div className="container">
          <div className="dialog-window">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">アカウントを新規作成</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={this.trySignup}>
            <div className="form-group">
                <div>
                  <label htmlFor="email-address">
                    メールアドレス
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    className="form-control"
                    placeholder="Email address"
                    onChange={e => this.setState({'email':e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="name">
                    名前
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="form-control"
                    placeholder="Name"
                    onChange={e => this.setState({'name':e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="password">
                    パスワード
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="form-control"
                    placeholder="Password"
                    onChange={e => this.setState({'password':e.target.value})}
                  />
                </div>
              </div>
    
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  登録
                </button>
              </div>
            </form>
          </div>
        </div>
        )
    }
    
}