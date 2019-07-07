
$( document ).ready(function() {
    
    $(".submitbtn").on("click", function() {
        // Save the selected element
        var selected = $(this);
        // Make an AJAX POST request
        // This uses the data-id of the update button,
        // which is linked to the specific note title
        // that the user clicked before
        $.ajax({
          type: "POST",
          url: "/articles/" + selected.attr("dataid"),
          dataType: "json",
          data: {
            title: $("#title").val(),
            note: $("#note").val()
          }
        })
    })
       });