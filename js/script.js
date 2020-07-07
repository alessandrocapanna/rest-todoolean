$(document).ready(
  function(){
    // NOTE: visualizzare contenuti iniziali
    printTodo();

    // NOTE: aggiungere cose alla lista
    $('#button-todo').click(
      function(){
        var cosaDaFare = $('#todo').val();
        // NOTE: aggiungo al db
        $.ajax(
          {
            url:'http://157.230.17.132:3004/todos/',
            method: 'POST',
            data:{
              text:cosaDaFare
            },
            success:function(data){

              printTodo();

              // resetto il val
              $('#todo').val('');
            },
            error: function(){
              alert('errore durante la l\'aggiunta')
            }
          }
        );
      }
    );//fine ggiungi

    // NOTE: per eliminare
    $(document).on('click', '#button-delete',
      function(){
        var id = $(this).parents('li').attr('data-id');

        // NOTE: elimino dal db
        $.ajax(
          {
            url:'http://157.230.17.132:3004/todos/' + id,
            method: 'DELETE',

            success:function(data){
              printTodo();
              $(this).parents('li').remove();
            },
            error: function(){
              alert('errore durante la cancellazione');
            }
          }
        );
      }
    );//fine delete

    // NOTE: funzione per stampare
    function printTodo(){
      $('ul#todo-list *').remove();
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
    }//fine printTodo

  }
);//fine ready
