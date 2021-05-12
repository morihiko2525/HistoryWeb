$(function () {
  $('#opencreateModal').click(function(){
      $('#create-modalArea').fadeIn();
  });
  $('#closeModal , #modalBg').click(function(){
    $('#create-modalArea').fadeOut();
    $('#edit-modalArea').fadeOut();
  });
});




function OnEditClick(id, name, desc, year, month, day){
   $('#edit-modalArea').fadeIn();
   document.getElementById( "e_name" ).value = name;
   document.getElementById( "e_desc" ).value =desc;
   document.getElementById( "e_year" ).value = year;
   document.getElementById( "e_month" ).value = month;
   document.getElementById( "e_day" ).value = day;
   document.getElementById( "eid" ).value = id;
   document.getElementById( "d_eid" ).value = id;
}

