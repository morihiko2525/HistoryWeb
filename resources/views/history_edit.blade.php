@extends('layouts.header')
@inject('historiesController','App\Http\Controllers\HistoryController')
@section('content')

<h1>{{$historiesController->getHistoryName($his_id)}}</h1>
<p>{{$historiesController->getHistoryDescription($his_id)}}</p>

<button id="openModal">イベントを追加</button>
@if($historiesController->getHistoryUserID($his_id) === Auth::user()->id)
<p>編集モード中</p>
@endif


<?php $pre_y = 0 ?>
@foreach ($events as $events)

@if($events->year !== $pre_y)
  <div class = year-column>{{$events->year}}年</div>
@endif

<?php $pre_y = $events->year ?>
<?php $naa = $events->name ?>
<div class = event>
  <p>{{ $events->month }}月{{ $events->day }}日</p>
  <h3><a href="javascript:void(0);" onclick="OnEditClick('{{$events->id}}', '{{$events->name}}', '{{$events->description}}', '{{$events->year}}', '{{$events->month}}', '{{$events->day}}');"> {{ $events->name }}</a></h3>
  <p class = event-desc>{{ $events->description }}</p>
</div>
@endforeach

            
            
            
<!-- モーダルエリアここから -->

<section id="modalArea" class="modalArea">
  <div id="modalBg" class="modalBg"></div>
  <div class="modalWrapper">
    <div class="modalContents">
      <h1>イベントを編集</h1>
      
        {!! Form::model($events, ['route' => 'events.update']) !!}
          <div class="form-group">
            {!! Form::label('name', 'イベント名') !!}
            {!! Form::text('name', null, ['class' => 'form-control', 'id' => 'name']) !!}

          <small id="emailHelp" class="form-text text-muted">出来事を入力</small>
          </div>
          <div class="form-group">
            {!! Form::label('description', '説明') !!}
            {!! Form::text('description', null, ['class' => 'form-control', 'id' => 'desc']) !!}

          </div>
          <div class="form-group">
            {!! Form::label('year', '年') !!}
            {!! Form::text('year', null, ['class' => 'form-control', 'id' => 'year']) !!}

          </div>
          <div class="form-group">
            {!! Form::label('month', '月') !!}
            {!! Form::text('month', null, ['class' => 'form-control', 'id' => 'month']) !!}

          </div>
          <div class="form-group">
            {!! Form::label('day', '日') !!}
            {!! Form::text('day', null, ['class' => 'form-control', 'id' => 'day']) !!}

          </div>
          {!! Form::hidden('id', null, ['id' => 'eid']) !!}
          {!! Form::hidden('his_id', $his_id)!!}

          <button type="submit" class="btn btn-primary">Submit</button>
        {!! Form::close() !!}
            </div>
    <div id="closeModal" class="closeModal">
      ×
    </div>
  </div>
</section>
<!-- モーダルエリアここまで -->


<div id = footer>
  
<div class="wrapper">
        <a href= "{{ url('/history_view') }}" class="button">完成！</a>
    </div>
</div>
@endsection