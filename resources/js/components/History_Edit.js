import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Modal_CreateEvent from './Modal_CreateEvent';
import Modal_EditEvent from './Modal_EditEvent';
import Modal_AddImg from './Modal_AddImg';
import EditModal from './Modal_CreateEvent';
import { Modal } from 'react-bootstrap';
import { GetEventsData } from './api/Api';

class History_Edit extends React.Component {

    constructor(props,context){
        super(props,context)
        this.state = {
            events : [],
            _events: [],
            previous_year: "",
            historydata:[],
            showEditModal: false,
            showImgModal: false,
            isOnceChanged: false,
            selectEvent: [],
            showTitleEdit: false,
            history_name: "",
            u_history_name: "",
            history_desc: "",
            u_history_desc: ""
        }
        //this.setShowEditModal = this.setShowEditModal.bind(this);
        this.getEventsData = this.getEventsData.bind(this); //これがないとsetStateがundefinedになる
        this.getSelectEventData = this.getSelectEventData(this);
        this.ChildRef = React.createRef();
    }

    
    componentDidMount() {
        let id = this.props.historydata.id;
        //console.log(id);
        axios
        .get('/api/event/'+ id)
        .then(response => {
            console.log("通信に成功しました")
            this.setState({events: response.data.events});
            console.log(response.data.events);
            //console.log(events)
        })
        .catch(err => {
            console.log(err);
            console.log('通信に失敗しました');
        });
        this.setState({history_name: this.props.historydata.name});
    }

    doEditModalInit(){
        this.ChildRef.current.initEditModal();
    }

    //OnClickでは関数しか呼べないため、stateを変更するための関数を作成した
    setShowEditModal(b){
        this.setState({showEditModal: b});
        console.log("state is :" + this.state.showEditModal);
        console.log(this.state.selectEvent);
    }

    setShowImgModal(b){
        this.setState({showImgModal: b});
        console.log("state is :" + this.state.showImgModal);
    }

    //イベントを再取得する処理
    getEventsData(){
        let id = this.props.historydata.id;
        //console.log(id);
        axios
        .get('/api/event/'+ id)
        .then(response => {
            console.log("通信に成功しました")
            this.setState({_events: response.data.events});
            console.log(response.data.events);
            //console.log(events)
            console.log("再取得完了");
            this.setState({isOnceChanged: true});
            })
            .catch(err => {
                console.log(err);
                console.log('通信に失敗しました');
            });
    }

    //年表タイトル変更処理
    changeHistoryName(){
        this.setState({history_name: this.state.u_history_name});
        axios.post('/api/history/update/name', { 
            'id': this.props.historydata.id,
            'name': this.state.u_history_name,       
        })
            .then(res => {
                console.log(res);
        })
    }

    //年表説明変更処理
    changeHistoryDesc(){
        this.setState({history_desc: this.state.u_history_desc});
        axios.post('/api/history/update/desc', { 
            'id': this.props.historydata.id,
            'desc': this.state.u_history_desc,       
        })
            .then(res => {
                console.log(res);
        })
    }

    getSelectEventData(){
        //returnは成功している。受信もできる。
        console.log("kansuuuu");
        console.log(this.state.selectEvent); //ここがからっぽ！！！！！！
        return this.state.selectEvent;
    }

    renderDateColumn(month, day){
        if(day == 0){
            if(month == 0){
                //monthもdayも空 = 何も描画しない
                return <p className = "event-date">　</p>                                    
            }else{
                //monthは入っていてdayは空 = monthのみ描画
                return <p className = "event-date">{month}月</p>
            }
        }else{
            if(month == 0){
                //エラー
            }else{
                //monthもdayも入っている = monthもdayも両方描画
                return <p className = "event-date">{month}月{day}日</p>

            }
        }
    }

    render(){
        return(          
            <div className="container">
                
                {/* 年表のタイトル*/}
                {/* タイトル編集画面かどうか(bool)*/}
                {this.state.showTitleEdit?
                (
                    //タイトルの編集中
                    <div className =  "mx-auto">
                        <div className="input-group input-group-lg col-md-8">
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={this.state.history_name} 
                                onChange={e=>this.setState({u_history_name: e.target.value})}         
                            ></input>

                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    id="button-addon2"
                                    onClick={()=>{
                                        this.setState({showTitleEdit:false})
                                        this.changeHistoryName();
                                    }}
                                    >決定</button>
                            </div>
                        </div>
                    </div>
                ):
                (
                    //通常時
                    <div>
                    <a href = "#" onClick={()=>{
                            //クリックすると、showTitleEdit=trueにする
                            this.setState({showTitleEdit:true})
                            }}>
                            
                            <h1>「{this.state.history_name}」</h1></a>                    
                    </div>
                )}


                {/*年表説明欄表示処理*/}
                {this.state.showDescEdit?
                (
                    //編集中
                    <div>
                        <div className="input-group input-group-lg col-md-8">
                        <input
                                type="text"
                                className="form-control"
                                defaultValue={this.props.historydata.description} 
                                onChange={e=>this.setState({u_history_desc: e.target.value})}         
                            ></input>
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    id="button-addon2"
                                    onClick={()=>{
                                        this.setState({showDescEdit:false})
                                        this.changeHistoryDesc();
                                    }}
                                    >決定</button>
                            </div>
                            </div>
                    </div>
                ):
                (
                    //通常時
                    <div>
                        <a href = "#" onClick={()=>{
                            this.setState({showDescEdit:true})
                        }}>

                        <p>{this.props.historydata.description}</p></a>
                    </div>
                )}


                {/* 作成用モーダル*/}
                <Modal_CreateEvent
                    history_id={this.props.historydata.id}
                    getEventsData={this.getEventsData}
                />


                {/* 編集用モーダル*/}
                <Modal_EditEvent 
                    showEditModal = {this.state.showEditModal}
                    setFalse={() => this.setShowEditModal(false)}
                    getEventsData={this.getEventsData}
                    selectEventID={this.state.selectEvent.id}
                    eventName={this.state.selectEvent.name}
                    eventDesc={this.state.selectEvent.description}
                    eventYear={this.state.selectEvent.year}
                    eventMonth={this.state.selectEvent.month}
                    eventDay={this.state.selectEvent.day}
                    getSelectEventData={this.getSelectEventData}
                    ref={this.ChildRef}
                />


                {/* 画像追加用モーダル*/}
                <Modal_AddImg
                    setFalse={() => this.setShowImgModal(false)}
                    showImgModal = {this.state.showImgModal}
                />
                

                <React.Fragment>
                    
                    {this.state.isOnceChanged ?
                    (                  
                        //一度getEventsDataで取得した後の処理
                        //state._eventsを使用する
                        this.state._events.map(event =>
                            <React.Fragment>
                            <div className = "year-column">{event.year}年</div>
    
                            <div className = "event clearfix">

                                {/*月日の出力処理*/}
                                {this.renderDateColumn(event.month, event.day)}
            
                                <div className = "event-image" onClick={()=>{
                                    console.log("img clicked!");
                                }}></div>
            
                                <div className = "event-content">
                                    <a href = "#" onClick = { ()=>{
                                        this.state.selectEvent = event;
                                        //this.doEditModalInit();
                                        this.setShowEditModal(true);
                                    }
                                        
                                        }><h3 className = "event-title">「{event.name}」</h3></a>
                                    <p className = "event-desc">{event.description}</p>
                                </div>
                            </div>
                            </React.Fragment>                        
                        )
                    
                        ):(
                            //一度も変更していないとき(一覧画面から遷移したとき)の処理
                            //App.jsから流れてくるprops.eventsを使用する。
                            //memo: App.jsで再取得すればよい？ロード画面の有り無しを指定できれば問題なくそれでできるかも。そっちのほうがスマート。
                            this.props.events.map(event =>
                                <React.Fragment>
                                
                                <div className = "year-column">{event.year}年</div>
        
                                <div className = "event clearfix">   

                                    {/*月日の出力処理*/}
                                    {this.renderDateColumn(event.month, event.day)}

                                    <div className = "event-image" onClick={()=>{
                                        console.log("img clicked!");
                                        this.setState({selectEvent:event})
                                        this.setShowImgModal(true);
                                        }}></div>
                
                                    <div className = "event-content">
                                        <a href = "#" onClick = { ()=>{
                                            this.state.selectEvent = event;
                                            console.log(this.state.selectEvent);
                                            //this.doEditModalInit();
                                            this.setShowEditModal(true);
                                        }
                                            
                                            }><h3 className = "event-title">「{event.name}」</h3></a>
                                        <p className = "event-desc">{event.description}</p>
                                    </div>
                                </div>
                                </React.Fragment>                        
                            ))         
                    }

                </React.Fragment>
            </div>
        )
    }

}

export default History_Edit;