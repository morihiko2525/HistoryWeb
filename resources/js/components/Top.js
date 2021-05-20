import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Header extends React.Component {

    onClickButton = () => {
        alert("click");
    }
    render(){
        
        return(
            <div>
            <div className = "top-img">
                <p className = "title">Webで年表作成</p>
                <p className = "subtitle">年表を作ってみませんか</p>
                <p className = "subtitle">絶賛開発中！(Version : alpha 1.0)</p>

                <div className ="button-wrapper">
                  <Link to = "/create"><a href= "#" className="button">作成する！</a></Link>
                </div>
            </div>

            <div className = "history-table-feature">
                <h1>人気の年表</h1>
                    <div className = "history-table-content">
                        <div className = "linkBox">
                            <div className = "ht-sumnail">
                                <img src = "https://riverwalk.co.jp/app/wp-content/uploads/2019/03/20190318-saizeriya_logo.jpg" width = "200px" height = "200px"></img>
                            </div>
                            <a href="/history_view/4"></a>
                            <p className = "ht-title">サイゼリヤ年表</p>
                            <p>ここは年表説明欄です。サイゼリヤの年表を作りたいと思っています。</p>
                        </div>
                    </div>
                        
                    <div className = "history-table-content">
                        <div className = "linkBox">
                            <div className = "ht-sumnail">
                                <img src = "https://pbs.twimg.com/profile_images/2579542348/l2b371d8r57tu6m4wu7i_400x400.jpeg" width = "200px" height = "200px"></img>
                            </div>
                            <a href="https://www.google.co.jp"></a>
                            <p className = "ht-title">孫正義の人生</p>
                            <p>ここは年表説明欄です。サイゼリヤの年表を作りたいと思っています。</p>
                        </div>
                    </div>
                    
                    <div className = "history-table-content">
                        <div className = "linkBox">
                            <div className = "ht-sumnail">
                                <img src = "https://pbs.twimg.com/profile_images/904746258052423680/WTxEMdkZ_400x400.jpg" width = "200px" height = "200px"></img>
                            </div>
                            <a href="https://www.google.co.jp"></a>
                            <p className = "ht-title">ダイエーの大躍進と破産まで</p>
                            <p>ここは年表説明欄です。サイゼリヤの年表を作りたいと思っています。</p>
                        </div>
                    </div>
                </div>
            </div>
        
        )
    }
}

export default Header;