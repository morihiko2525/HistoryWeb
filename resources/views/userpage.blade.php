@extends('layouts.header')
@inject('historiesController','App\Http\Controllers\HistoryController')
@section('content')

<h1>ユーザーページ</h1>
<p>{{Auth::user()->name}}</p>

<h2></h2>

<h2>自分の年表一覧</h2>

<?php $histories = $historiesController->showMyHistories(Auth::user()->id) ?>
@foreach ($histories as $histories)

<h1><a href = {{ action('EventController@index', $histories->id) }}>{{$histories->name}}</a></h1>

@endforeach
@endsection
