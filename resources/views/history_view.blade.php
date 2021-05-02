@extends('layouts.header')

@section('content')
<h1>只今絶賛開発中。</h1>
<h1>ここに年表画面を作成します</h1>
<h1>フィードバックをお待ちしております。</h1>

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
      <p>イベント名 </p>
      <p>イベント名 </p>
      <p>イベント名 </p><p>イベント名 </p><p>イベント名 </p><p>イベント名 </p><p>イベント名 </p>
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
