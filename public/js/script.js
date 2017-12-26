$(document).ready(() => {
    $('#cboMonth').dropdown();
    // $('#event_date').calendar();
    // $('#event_date').daterangepicker();

    $('#event_date').daterangepicker({
            singleDatePicker: true,
            timePicker: true,
            timePickerIncrement: 30,
            format: 'MMMM D, YYYY h:mm A'
        }, function(start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });

    // $('#event_date').daterangepicker(
    //   {
    //     format: 'YYYY-MM-DD',
    //     startDate: '2013-01-01',
    //     endDate: '2013-12-31'
    //   },
    //   function(start, end, label) {
    //     alert('A date range was chosen: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    //   }
    // );

    $('#btnNewEvent').click(() => {
      $('#frmEventAdd').trigger("reset");
      $('#frmEventEntry').modal('show')
    });
    $('#btnCancel').click(() => $('#frmEventEntry').modal('hide'));
     $('#btnCreateEvent').click(function(e){
        e.preventDefault();
        alert(ConvertFormToJSON( $('#frmEventAdd') ));
        $.ajax({
             url: '/api/events',
             type: 'POST',
             cache: false,
             dataType: 'json',
             contentType: "application/json",
             data: ConvertFormToJSON( $('#frmEventAdd') ),
             success: function(data){

                $('#frmEventEntry').modal('hide');
                $('#frmEventAdd').trigger("reset");

             },
             error: function(err){
                alert(JSON.stringify(err, undefined, 2));

                // $('#frmEventEntry').modal('hide');
                // $('#frmEventAdd').trigger("reset");
             }
        });

        return false;

     });

     function ConvertFormToJSON(form){
        var array = jQuery(form).serializeArray();
        var json = {};

        jQuery.each(array, function() {
            json[this.name] = this.value || '';
        });

        return  JSON.stringify(json);
    }
});
