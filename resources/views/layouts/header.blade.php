<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <title>Web年表サイト</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="{{ asset('css/style.css') }}">
        <script>
          (function(d) {
            var config = {
              kitId: 'dez3fvt',
              scriptTimeout: 3000,
              async: true
            },
            h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
          })(document);
        </script>
    </head>

    <body>
        <header class="mb-4">
            <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
                {{-- トップページへのリンク --}}
                <a class="navbar-brand" href="/">Webで年表</a>

                <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#nav-bar">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="nav-bar">
                    <ul class="navbar-nav mr-auto"></ul>
                    <ul class="navbar-nav">
                        {{-- メッセージ作成ページへのリンク --}}
                        <li class="nav-item"><a href = "{{ Route('login') }}">ログイン</a></li>
                        <li class="nav-item"><a href = "{{ Route('signup.get') }}">アカウント作成</a></li>

                        @if (Auth::check())
                            {{-- ユーザ一覧ページへのリンク --}}
                            <li class="nav-item dropdown">
                                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">{{ Auth::user()->name }}</a>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    {{-- ユーザ詳細ページへのリンク --}}
                                    <li class="dropdown-item"><a href="#">My profile</a></li>
                                    <li class="dropdown-divider"></li>
                                    {{-- ログアウトへのリンク --}}
                                    <li class="dropdown-item">{!! link_to_route('logout.get', 'Logout') !!}</li>
                                </ul>
                            </li>
                        @else
                        @endif
                    </ul>
                </div>
            </nav>
            
            
        </header>

        <div class="container">
            @yield('content')

        </div>

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"></script>
        <script defer src="https://use.fontawesome.com/releases/v5.7.2/js/all.js"></script>
    </body>
</html>