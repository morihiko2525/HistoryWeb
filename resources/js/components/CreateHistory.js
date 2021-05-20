import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class CreateHistory extends React.Component {

    constructor(props){
        super(props);
        this.state={
            userdata: [],
            name : "",
            description: "",
        };
        this.postForm = this.postForm.bind(this);
    }

    render(){
        return(
            <div className="container">
                <div className="dialog-window">
                    <h1>年表を作成しましょう！</h1>

                    <form onSubmit={this.postForm}>
                        <div className="form-group">
                            <label>年表タイトル</label>
                            <input 
                                type = "text"
                                id = "name"
                                className="form-control"
                                value={this.state.name}
                                onChange={e => this.setState({name :e.target.value})}>
                                
                            </input>
                        </div>
                        {this.state.name}
                        <div className="form-group">
                            <label>説明</label>
                            <textarea
                                type = "text"
                                id = "description"
                                className="form-control"
                                value={this.state.description}
                                onChange={e => this.setState({description :e.target.value})}>
                            </textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">作成する</button>

                    </form>

                </div>
            </div>
        )
    }

    postForm(){
        
        axios.post('/api/history/create', { 'name': this.state.name, 'description': this.state.description, 'user_id': this.props.userdata.id})
            .then(res => {
                console.log(res);
      })
    }

}

export default CreateHistory;