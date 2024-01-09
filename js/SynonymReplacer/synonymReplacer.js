function checkSynonyms() {
   var value = $("#textAreaValue").val();
   try {
      $.ajax({
         /* the route pointing to the post function */
         "async": true,
         "crossDomain": true,
         "url": "https://english-synonyms.p.rapidapi.com/" + value,
         "method": "GET",
         "headers": {
            "x-rapidapi-host": "english-synonyms.p.rapidapi.com",
            "x-rapidapi-key": "ce8a642f12mshbc7e132a0915dc7p15b097jsn75feb3902713"
         },
         beforeSend: function () {
            $("#showSynonym").text('Checking...').removeClass('text-danger').addClass('text-success');
         },
         /* remind that 'data' is the response of the AjaxController */
         success: function (response) {
            $("#showSynonym").empty();
            if (response) {
               $.each(response.synonyms, function (i, syn) {
                  $("#showSynonym").append(syn + ', ').removeClass('text-danger').addClass('text-success');
               });
            } else {
               $("#showSynonym").text('Sorry No Synonym Available').removeClass('text-success').addClass('text-danger');
            }

         },
         error: function () {
            $("#showSynonym").text('Sorry No Synonym Available').removeClass('text-success').addClass('text-danger');
         }
      });
   } catch (e) {
      console.log(e.message);
   }
}
$("#synonymForm").submit(function(e) {
   e.preventDefault(); // prevent the form from submitting and refreshing the page
   checkSynonyms(); // call the function to check synonyms
});