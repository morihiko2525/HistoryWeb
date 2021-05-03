@extends('layouts.header')

@section('content')
<h1>新規年表を作成</h1>

<a href = "">イベントを追加</a>

<div class = year-column>2015年</div>
<p>あいうえお</p>
<div class = year-column>2015年</div>
<div class = year-column>2015年</div>


<button id="openModal">イベントを追加</button>

<div class = event>
  <p>5月4日</p>
  <h3>本八幡店創業</h3>
  <p>千葉県市川市本八幡にて、サイゼリヤ１号店創業。299円のミラノ風ドリアが人気だった。</p>
</div>
@foreach ($events as $events)
<div class = event>
  <p>5月4日</p>
  <h3>{{ $events->name }}</h3>
  <p>{{ $events->description }}</p>
</div>
@endforeach
<table class="table table-striped">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>イベント名</th>
                    </tr>
                </thead>
                <tbody>
                  {{--
                    @foreach ($events as $events)
                    <div class = year-column>{{$events->id}}</div>
                        <tr>
                            <td>{{$events->id}}</td>
                            <td>{{ $events->name }}</td>
                            <td>{{ $events->description }}</td>

                        </tr>
                    @endforeach--}}
                </tbody>
</table>
            
            
            
            
<!-- モーダルエリアここから -->

<section id="modalArea" class="modalArea">
  <div id="modalBg" class="modalBg"></div>
  <div class="modalWrapper">
    <div class="modalContents">
      <h1>イベントを追加</h1>
      
        {!! Form::model($events, ['route' => 'events.store']) !!}

          <div class="form-group">
            {!! Form::label('name', 'イベント名') !!}
            {!! Form::text('name', null, ['class' => 'form-control']) !!}

            <small id="emailHelp" class="form-text text-muted">出来事を入力</small>
          </div>
          <div class="form-group">
            {!! Form::label('description', '説明') !!}
            {!! Form::text('description', null, ['class' => 'form-control']) !!}

          </div>
          <div class="form-group">
            {!! Form::label('year', '年') !!}
            {!! Form::text('year', null, ['class' => 'form-control']) !!}

          </div>
          <div class="form-group">
            {!! Form::label('month', '月') !!}
            {!! Form::text('month', null, ['class' => 'form-control']) !!}

          </div>
          <div class="form-group">
            {!! Form::label('day', '日') !!}
            {!! Form::text('day', null, ['class' => 'form-control']) !!}

          </div>





          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        {!! Form::close() !!}
            </div>
    <div id="closeModal" class="closeModal">
      ×
    </div>
  </div>
</section>
<!-- モーダルエリアここまで -->

<script>$(function () {
  $('#openModal').click(function(){
      $('#modalArea').fadeIn();
  });
  $('#closeModal , #modalBg').click(function(){
    $('#modalArea').fadeOut();
  });
});</script>
<div id = footer>
<div class="wrapper">
        <a href= "{{ url('/history_view') }}" class="button">完成！</a>
    </div>
</div>
@endsection