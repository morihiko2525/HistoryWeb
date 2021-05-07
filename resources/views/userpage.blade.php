@extends('layouts.header')

@section('content')

<h1>ユーザーページ</h1>
<p>{{Auth::user()->name}}</p>

<h2></h2>

<h2>自分の年表一覧</h2>


@endsection
