@extends('layouts.header')

@section('content')
<div id="loading">
  <div class="spinner"></div>
</div>

<div class=dialog-window>
<h1>年表を作成しましょう！</h1>
 {!! Form::model($histories, ['route' => 'histories.create']) !!}

          <div class="form-group">
            
            {!! Form::label('name', '年表タイトル') !!}
            <small id="emailHelp" class="form-text text-muted">年表のタイトルを入力しましょう。例) 〇〇の人生</small>
            {!! Form::text('name', null, ['class' => 'form-control']) !!}
          </div>
          <div class="form-group">
            {!! Form::label('description', '説明') !!}
            <small id="emailHelp" class="form-text text-muted">年表の説明を入力しましょう。</small>

            {!! Form::text('description', null, ['class' => 'form-control']) !!}
          </div>
          {!! Form::hidden('user_id', Auth::user()->id )!!}
          <button type="submit" class="btn btn-primary">作成</button>
          
        {!! Form::close() !!}
</div>
@endsection