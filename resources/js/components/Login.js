import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Redirect } from "react-router-dom";

import { Api_Login } from './api/Api';

export default class Login extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'password':'',
            'email':'',
        };
        this.tryLogin = this.tryLogin.bind(this);
    }
    
    tryLogin = async e => {
        e.preventDefault();
        await Api_Login(this.state.email, this.state.password, this.props.setIsGuest);
    };
    
    render(){
        const is_guest = this.props.isGuest;
        
        if(!is_guest){
            return(<Redirect push to="/userpage" />);
        }
        
        return (
        <div className="container">
          <div className="dialog-window">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">アカウントにログイン</h2>
            </div>
            <form onSubmit={this.tryLogin}>
                <div className="form-group">
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
                    value={this.state.email}
                    onChange={e => this.setState({'email':e.target.value})}
                  />
                </div>
                <div className="form-group">
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
    
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  ログイン
                </button>
              </div>
            </form>
          </div>
        </div>
        )
    }
}