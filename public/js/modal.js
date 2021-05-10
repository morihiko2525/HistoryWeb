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
   document.getElementById( "name" ).value = name;
   document.getElementById( "desc" ).value =desc;
   document.getElementById( "year" ).value = year;
   document.getElementById( "month" ).value = month;
   document.getElementById( "day" ).value = day;
   document.getElementById( "eid" ).value = id;
   
   //document.getElementById("destroy-btn").href = "action('events.destroy', id)";
   
 
}

