@extends('layouts.header')

@section('content')
<h1>新規年表を作成</h1>

<a href = "">イベントを追加</a>

<div class = year-column>2015年</div>
<p>あいうえお</p>
<div class = year-column>2015年</div>
<div class = year-column>2015年</div>
<div class = year-column>2015年</div>
<div class = year-column>2015年</div>
<div class = year-column>2015年</div>
<div class = year-column>2015年</div>
<div class = year-column>2015年</div>
<div class = year-column>2015年</div>

<button id="openModal">イベントを追加</button>

<!-- モーダルエリアここから -->
<section id="modalArea" class="modalArea">
  <div id="modalBg" class="modalBg"></div>
  <div class="modalWrapper">
    <div class="modalContents">
      <h1>イベントを追加</h1>
      
      <form>
          <div class="form-group">
            <label for="exampleInputEmail1">イベント名</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="">
            <small id="emailHelp" class="form-text text-muted">出来事を入力</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">内容</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="">
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
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
