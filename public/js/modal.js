$(function () {
  $('#openModal').click(function(){
      $('#modalArea').fadeIn();
  });
  $('#closeModal , #modalBg').click(function(){
    $('#modalArea').fadeOut();
  });
});

_id = 0;

function OnEditClick(id, name, desc, year, month, day){
   $('#modalArea').fadeIn();
   document.getElementById( "name" ).value = name;
   document.getElementById( "desc" ).value =desc;
   document.getElementById( "year" ).value = year;
   document.getElementById( "month" ).value = month;
   document.getElementById( "day" ).value = day;
   _id = id;
}

