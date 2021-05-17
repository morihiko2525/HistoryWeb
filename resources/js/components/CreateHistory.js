import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class CreateHistory extends React.Component {

    render(){
        return(
            <div className="container">
                <div className="dialog-window">
                    <h1>年表を作成しましょう！</h1>
                    <form>
                        <div className="form-group">
                            <label>年表タイトル</label>
                            <input type = "text" id = "name" className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>説明</label>
                            <textarea type = "text" id = "description" className="form-control"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">作成する</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default CreateHistory;