@extends('layouts.header')

@section('content')
<div id="loading">
  <div class="spinner"></div>
</div>

<div class=dialog-window>
<h1>年表を作成しましょう！</h1>
 {!! Form::model($histories, ['route' => 'histories.create']) !!}

          <div class="form-group">
            
            {!! Form::label('name', '年表名') !!}
            {!! Form::text('name', null, ['class' => 'form-control']) !!}
          </div>
          <div class="form-group">
            {!! Form::label('description', '説明') !!}
            {!! Form::text('description', null, ['class' => 'form-control']) !!}
          <button type="submit" class="btn btn-primary">作成</button>
        {!! Form::close() !!}
        <a href= "{{ action('EventController@index', 1) }}" type = submit class="button">作成する！</a>
</div>
@endsection