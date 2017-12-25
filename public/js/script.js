$(document).ready(() => {
    $('#cboMonth').dropdown();

    $('#btnNewEvent').click(() => {
      $('#frmEventAdd').trigger("reset");
      $('#frmEventEntry').modal('show')
    });
    $('#btnCancel').click(() => $('#frmEventEntry').modal('hide'));
     $('#btnCreateEvent').click(function(e){
         e.preventDefault();
        $.ajax({
             url: '/events',
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
