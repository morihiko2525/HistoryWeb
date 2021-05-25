import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class YearColumn extends React.Component {

    constructor(props,context){
        super(props,context)
        this.state = {
            previous_year: "",
            current_year: "",
        }
    }

    render(){
        this.props.setPreviousYear(this.props.previous_year);
        return this.props.previous_year === this.props.current_year?(
            //前回の年と今回の年が一緒だったら->何も描画しない
                <div></div>
            ):(
                //前回と今回の年が違ったら->描画する
                <div className = "year-column">{this.props.current_year}年</div>

        )
    }

}

export default YearColumn;