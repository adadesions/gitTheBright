$('#datetimepicker1').datetimepicker({
              format: "DD/MM/YYYY",
              viewMode: 'years'
            });
          $('#datetimepicker2').datetimepicker();

          $('.fa-calendar').click(function(){              
              $('#datetimepicker1').trigger("focus");
              $('#datetimepicker2').trigger("focus");
            });                   
