$(document).ready(
  function(){
    // NOTE: visualizzare lista
    $.ajax(
      {
        url:'http://157.230.17.132:3004/todos/',
        method: 'GET',

        success:function(data){

          for (var i = 0; i < data.length; i++) {
            var source = document.getElementById("entry-template").innerHTML;
            var template = Handlebars.compile(source);
            var context = {
              testo:data[i].text,
              id:data[i].id
            };
            var html = template(context);
            $('ul#todo-list').append(html)
          }
        },
        error: function(){
          alert('errore durante il caricamento')
        }
      }
    );


    // NOTE: aggiungere cose alla lista
    $('#button-todo').click(
      function(){
        var cosaDaFare = $('#todo').val();
        $.ajax(
          {
            url:'http://157.230.17.132:3004/todos/',
            method: 'POST',
            data:{
              text:cosaDaFare
            },
            success:function(data){
            },
            error: function(){
              alert('errore durante la l\'aggiunta')
            }
          }
        );
        var source = document.getElementById("entry-template").innerHTML;
        var template = Handlebars.compile(source);
        var context = {
          testo:cosaDaFare
        };
        var html = template(context);
        $('ul#todo-list').append(html)
        // NOTE: resetto val input
        $('#todo').val('');
      }
    );

    // NOTE: per eliminare
    $(document).on('click', '#button-delete',
      function(){
        var id = $(this).parents('li').attr('data-id');

        $.ajax(
          {
            url:'http://157.230.17.132:3004/todos/' + id,
            method: 'DELETE',

            success:function(data){
            },
            error: function(){
              alert('errore durante la cancellazione')
            }
          }
        );

        $(this).parents('li').remove();

      }
    );


  }
);
