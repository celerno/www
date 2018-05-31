$(document).ready(function(){
$('#days').blur(function() {
  var dateText = $('#date').val();
  var date = Date.parse(dateText);
  var days = parseInt($('#days').val());
  drawCal(days, date);
});

function drawCal(days, date) {
  var i = 1;
 	var month=document.createElement('div');
  month.id='month';
  month.attr('class', 'row');
  for (i = 1; i < days; i++) {
    if (i > 28) {
      i = 1;
      days -= 28;
      //reset add new month
    }
    if(i%7===0){
    //add row
    month = $('<div class="row"></div>');
    }
   $(month).append('<div class="col-6">' + i + '</div>');
   $('#calendar').append(month);
  }
}

});
