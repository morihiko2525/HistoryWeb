@extends('layouts.header')

@section('content')
<div id="loading">
  <div class="spinner"></div>
</div>

<div class="sk-folding-cube">
  <div class="sk-cube1 sk-cube"></div>
  <div class="sk-cube2 sk-cube"></div>
  <div class="sk-cube4 sk-cube"></div>
  <div class="sk-cube3 sk-cube"></div>
</div>
<h1>年表を作成しましょう！</h1>
 {!! Form::model($histories, ['route' => 'histories.store']) !!}

          <div class="form-group">
            {!! Form::label('name', '年表名') !!}
            {!! Form::text('name', null, ['class' => 'form-control']) !!}
          </div>
          <div class="form-group">
            {!! Form::label('description', '説明') !!}
            {!! Form::text('description', null, ['class' => 'form-control']) !!}
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        {!! Form::close() !!}
        <a href= "{{ route('events.index') }}" class="button">作成する！</a>

@endsection