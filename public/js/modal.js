$(function () {
  $('#opencreateModal').click(function(){
      $('#create-modalArea').fadeIn(250);
  });
  $('#closeModal , #modalBg').click(function(){
    $('#create-modalArea').fadeOut(200);
    $('#edit-modalArea').fadeOut(200);
  });
});




function OnEditClick(id, name, desc, year, month, day){
   $('#edit-modalArea').fadeIn(250);
   document.getElementById( "e_name" ).value = name;
   document.getElementById( "e_desc" ).value =desc;
   document.getElementById( "e_year" ).value = year;
   document.getElementById( "e_month" ).value = month;
   document.getElementById( "e_day" ).value = day;
   document.getElementById( "eid" ).value = id;
   document.getElementById( "d_eid" ).value = id;
}

