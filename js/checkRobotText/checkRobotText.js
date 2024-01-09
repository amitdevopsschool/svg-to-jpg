$('#SubmitForm').on('submit', function (e) {
   e.preventDefault();
   $("#showContent").empty();
   $("#showAllows").empty();
   $("#showDisAllows").empty();
   let name = $('#inputURL').val();
   console.log(name);

   $.ajax({
      url: "checkRobotTextPost",
      type: "POST",
      data: {
         'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
         'url': name,

      },
      success: function (response) {
         if (response) {
            console.log(response);
            $(".black").addClass("bg-dark text-white");
           
            $.each(response, function (i, item) {
               $("#showContent").append('<ul>'
                  + '<li>User Agent: <span class="font-weight-bold">' + item.userAgent + '</span></li>'
                  + '</ul>');
               $.each(item.allow, function (i, value) {
                  console.log(value);
                  $("#showAllows").append('<ul>'
                     + '<li>Allow: ' + value + '</li>'
                     + '</ul>');
               });
               $.each(item.disAllow, function (i, value) {
                  $("#showDisAllows").append('<ul>'
                     + '<li>Disallow: ' + value + '</li>'
                     + '</ul>');
               });

            });
         }
      },
      error: function (response) {
         $("#showContent").append('<h4>robot.text file not found</h4>')
      },
   });
});