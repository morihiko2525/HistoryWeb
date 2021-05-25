import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import GlobalNav from './GlobalNav';
import Top from './Top';
import About from './About';
import EventList from './EventList';
import CreateHistory from './CreateHistory';
import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import UserPage from './UserPage';
import History_Edit from './History_Edit';

import { Api_LoginWithToken } from "./api/Api"

const GUESTDATA = {'id': 'guest',
                   'name': 'guest',
                   'icon': 'null',
                   'description': 'None'
                    }

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            'guest': true,
            'user_data': GUESTDATA,
            'comment_type':'timeline',
            'loading':false,
            'historydata':[],
            'historyID':"",
            'eventsdata':[],
            'isLoading': false,
            'isInPageAccess': false,
        };
        
        this.setIsGuest = this.setIsGuest.bind(this);
        this.setGuest = this.setGuest.bind(this);
        this.setUserData = this.setUserData.bind(this)
        this.setEventsData = this.setEventsData.bind(this);
        this.setIsLoading = this.setIsLoading.bind(this);
        this.setIsInPageAccess = this.setIsInPageAccess.bind(this);
    }

    setLoading(){
        this.setState((state)=>({loading: !this.state.loading}));
    }
    
    setGuest(){
        this.setState({guest: true,
            user_data:GUESTDATA
        })
    }
    
    setIsGuest(data){
        console.log(data);
        if(data !== -1){
            this.setState({guest: false,
                user_data: data
            });
        }
        
    }
    
    setHistory(value){
        this.setState({historydata: value});
        console.log(this.state.value);
    }

    setHistoryID(value){
        this.setState({historyID: value});
    }

    setUserData(data){
        this.setState((state)=>({user_data: data}));
    }
    
    setEventsData(data){
        this.setState({eventsdata: data});
        console.log("setEventsData:" );
        console.log(this.state.eventsdata);
    }
    
    setIsLoading(b){
        console.log("isLoading");
        this.setState({isLoading: b});
    }

    setIsInPageAccess(b){
        this.setState({isInPageAccess:b});
    }

    componentDidMount(){
        if(Cookies.get('loggedin') != null){
            Api_LoginWithToken(this.setIsGuest);
        }else{
            this.setState({guest: true});
        }
    }

    render(){
        return this.state.isLoading?
        (
            //ロード処理
            <div>
                <p>ロード中です</p>
            </div>
        ):(
            <BrowserRouter>
            <React.Fragment>
                <Header userdata={this.state.user_data} setGuest={this.setGuest} isGuest={this.state.guest}/>
                <Switch>
                    <Route path="/" exact component={Top} /> 

                    <Route path="/about" component={About} />

                    <Route path="/create"  render={(routeProps)=>
                    <CreateHistory userdata={this.state.user_data}
                    setHistory={this.setHistory.bind(this)}
                    setIsInPageAccess={this.setIsInPageAccess.bind(this)}
                    {...routeProps} />}  />

                    <Route path="/history_view" render={(routeProps)=>
                         <EventList historydata={this.state.historydata}
                         user_id={this.state.user_data.id}
                         events = {this.state.eventsdata}
                         isInPageAccess = {this.state.isInPageAccess}
                         {...routeProps} />} />

                    <Route path="/history_edit" render={(routeProps)=>
                        <History_Edit historydata={this.state.historydata}
                        user_id={this.state.user_data.id}
                        events = {this.state.eventsdata}
                        {...routeProps} />} />

                    <Route path="/userpage" render={(routeProps)=>
                        <UserPage userdata={this.state.user_data}
                        testvalue={this.state.value}
                        setHistory={this.setHistory.bind(this)}
                        setEventsData={this.setEventsData}
                        setIsLoading={this.setIsLoading.bind(this)}
                        setIsInPageAccess={this.setIsInPageAccess.bind(this)}
                        {...routeProps} />} />


                    <Route path="/login" render={(routeProps)=>
                        <Login setIsGuest={this.setIsGuest}
                        isGuest={this.state.guest}
                        {...routeProps} />} />

                    <Route path="/signup" render={(routeProps)=>
                        <Signup setIsGuest={this.setIsGuest}
                        isGuest={this.state.guest}
                        {...routeProps} />} />

                </Switch>
            </React.Fragment>
            </BrowserRouter>
    
        )
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}