$(document).ready(function($) {
   $('#uploadForm').on('submit', function(e) {
      event.preventDefault();
      let myForm = $('#uploadForm')[0];
      var fd = new FormData(myForm);
      $.ajax({
         type: $(this).attr('method'),
         url: $(this).attr('action'),
         data: fd,
         contentType: false,
         processData: false,
         headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
         },
         beforeSend: function() {
            $(".submitButton").text("Please wait..");
         },
         success: function(result) {
            console.log(result);
            if(result.Status == true){
               $("#downloadButton").attr('disabled', false);
               $("#downloadLink").attr('href',result.response);
               $("#showText").text("Image Cropped accordingly please download it");
            }else{
               $("#showText").text("File format is not supported");
            }
           
         },
         error: function(data) {
            console.log(data);
         }
      });

   });
});



function readURL(input) {
   if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
         $('#imageResult')
            .attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
   }
}
$(function() {
   $('#upload').on('change', function() {
      readURL(input);
   });
});
/*  ==========================================
    SHOW UPLOADED IMAGE NAME
* ========================================== */
var input = document.getElementById('upload');
var infoArea = document.getElementById('upload-label');

// input.addEventListener('change', showFileName);

function showFileName(event) {
   var input = event.srcElement;
   var fileName = input.files[0].name;
   infoArea.textContent = 'File name: ' + fileName;
}