@extends('layouts.header')

@section('content')
    
    <div class = top-img>
        <p class = title>Webで年表作成</p>
        <p class = subtitle>年表を作ってみませんか</p>
    <div class="button-wrapper">
        <a href= "{{ route('histories.create') }}" class="button">作成する！</a>
    </div>
    </div>
      @if (Auth::check())
        {{ Auth::user()->name }}
      @endif
    <div class = "history-table-feature">
    <h1>人気の年表</h1>
        <div class = history-table-content>
            <div class = linkBox>
                <div class = ht-sumnail>
                    <img src = "https://riverwalk.co.jp/app/wp-content/uploads/2019/03/20190318-saizeriya_logo.jpg" width = 200px height = 200px>
                </div>
            <a href="https://www.google.co.jp"></a>
            <p class = ht-title>サイゼリヤ年表</p>
            <p>ここは年表説明欄です。サイゼリヤの年表を作りたいと思っています。</p>
                </div>
        </div>
            
        <div class = history-table-content>
            <div class = linkBox>
                <div class = ht-sumnail>
                    <img src = "https://pbs.twimg.com/profile_images/2579542348/l2b371d8r57tu6m4wu7i_400x400.jpeg" width = 200px height = 200px>
                </div>
            <a href="https://www.google.co.jp"></a>
            <p class = ht-title>孫正義の人生</p>
            <p>ここは年表説明欄です。サイゼリヤの年表を作りたいと思っています。</p>
                </div>
        </div>
        
        <div class = history-table-content>
            <div class = linkBox>
                <div class = ht-sumnail>
                    <img src = "https://pbs.twimg.com/profile_images/904746258052423680/WTxEMdkZ_400x400.jpg" width = 200px height = 200px>
                </div>
            <a href="https://www.google.co.jp"></a>
            <p class = ht-title>ダイエーの大躍進と破産まで</p>
            <p>ここは年表説明欄です。サイゼリヤの年表を作りたいと思っています。</p>
                </div>
        </div>
    </div>
    
    <div class = site-feature>
    <h1>特徴</h1> 
    <p>aiueo</p>
    </div>
@endsection
