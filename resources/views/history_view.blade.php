@extends('layouts.header')
@inject('historiesController','App\Http\Controllers\HistoryController')
@section('content')

<h1>{{$historiesController->getHistoryName($his_id)}}</h1>
<p>{{$historiesController->getHistoryDescription($his_id)}}</p>

@if(Auth::check())
  @if($historiesController->getHistoryUserID($his_id) === Auth::user()->id)
    <a href = {{ action('EventController@edit', $his_id)}}>編集する</a>
  @endif
@endif


<?php $pre_y = 0 ?>
@foreach ($events as $events)

@if($events->year !== $pre_y)
  <div class = year-column>{{$events->year}}年</div>
@endif

<?php $pre_y = $events->year ?>

<div class = event>
  <p class = event-date>{{ $events->month }}月{{ $events->day }}日</p>
  <h3 class = event-title>「{{ $events->name }}」</h3>
  <p class = event-desc>{{ $events->description }}</p>
</div>
@endforeach
            
            
            
@endsection