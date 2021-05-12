@extends('layouts.header')

@section('content')
    <div class="text-center">
        <h1>アカウント作成</h1>
    </div>

    <div class="row">
        <div class="col-sm-6 offset-sm-3">

            {!! Form::open(['route' => 'signup.post']) !!}
                <div class="form-group">
                    {!! Form::label('name', '名前') !!}
                    {!! Form::text('name', old('name'), ['class' => 'form-control']) !!}
                </div>

                <div class="form-group">
                    {!! Form::label('email', 'メールアドレス') !!}
                    {!! Form::email('email', old('email'), ['class' => 'form-control']) !!}
                </div>

                <div class="form-group">
                    {!! Form::label('password', 'パスワード') !!}
                    {!! Form::password('password', ['class' => 'form-control']) !!}
                </div>

                <div class="form-group">
                    {!! Form::label('password_confirmation', 'パスワードの再確認') !!}
                    {!! Form::password('password_confirmation', ['class' => 'form-control']) !!}
                </div>
                {{--<div class="g-recaptcha" data-callback="clearcall" data-sitekey="1073811079122-mbaqoe9cnjp5ilpe6gma1db18s75rdi4.apps.googleusercontent.com"></div>--}}
                {!! Form::submit('Sign up', ['class' => 'btn btn-primary btn-block']) !!}
            {!! Form::close() !!}

          
            

        </div>
    </div>
    <script src="https://www.google.com/recaptcha/api.js"></script>
@endsection