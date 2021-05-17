import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import GlobalNav from './GlobalNav';
import Top from './Top';
import About from './About';
import EventList from './EventList';
import CreateHistory from './CreateHistory';
import Header from './Header';

class App extends React.Component{
    render(){
        return(
            <BrowserRouter>
            <React.Fragment>
                <Header />
                <GlobalNav />
                <Switch>
                    <Route path="/" exact component={Top} /> 
                    <Route path="/about" component={About} />
                    <Route path="/eventlist" component={EventList} />
                    <Route path="/create" component={CreateHistory} />
                </Switch>
            </React.Fragment>
            </BrowserRouter>
    
        )
    }
}
/*
const App = () => {
    return(
        <BrowserRouter>
        <React.Fragment>
            <GlobalNav />
            <Switch>
　　　　　　　　　　
                <Route path="/" exact component={Top} /> 
                <Route path="/about" component={About} />
                <Route path="/eventlist" component={EventList} />
            </Switch>
        </React.Fragment>
        </BrowserRouter>
    )
}*/

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}