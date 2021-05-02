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

<button id="openModal">Open modal</button>

<!-- モーダルエリアここから -->
<section id="modalArea" class="modalArea">
  <div id="modalBg" class="modalBg"></div>
  <div class="modalWrapper">
    <div class="modalContents">
      <h1>Here are modal contents!</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
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
