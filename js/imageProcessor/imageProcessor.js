   $(document).ready(function() {

      $("#previewDiv").hide();
      $(".submitButton").hide();
      $(".download").hide();
   });

   function PreviewImage() {
      $("#previewDiv").show();
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);
      const file = document.getElementById("uploadImage").files[0];
      const fileType = file['type'];
      const validImageTypes = ['image/jpeg', 'image/png'];
      if (!validImageTypes.includes(fileType)) {
         alert("Only .jpeg and .png images are supported");
         location.reload();
      }
      oFReader.onload = function(oFREvent) {
         document.getElementById("uploadPreview").src = oFREvent.target.result;
      };
      checkImage();
   };

   function resubmitForm() {
      checkImage();
   }

   function checkImage() {
      let myForm = $('#myform')[0];
      var fd = new FormData(myForm);

      $.ajax({
         url: 'checkImage',
         type: 'post',
         data: fd,
         contentType: false,
         processData: false,
         headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
         },
         beforeSend: function() {
            $(".submitButton").text("Please wait..");
         },
         success: function(response) {
            $(".submitButton").text("Apply Changes");
            if (response.status == 'checking') {
               console.log("checking pe aaya");
               $("#aboutImage").append('<li class="text-success">Your image height is : <b>' + response
                  .height + '</b></li>' +
                  '<li class="text-success">Your image width is : <b>' + response.width + '</b></li>' +
                  '<li class="text-success">Your image type is: <b>' + response.mimeType + '</b></li>');
               $("#inputHeight").val(response.height);
               $("#inputWidth").val(response.width);
               const myArray = response.mimeType.split("/");
               let type = myArray[1];
               $("#changeType").val(type);
               if (type == "jpeg") {
                  $("#typeLabel").html("Convert from " + type + " to png");
               } else {
                  $("#typeLabel").html("Convert from " + type + " to jpg");
               }
               $(".submitButton").show();
            } else if (response.status == 'newJpg') {
               console.log("only Jpg got");
               console.log(response);
               $('#proccessedImage').modal('show');
               $("#downloadPreview").attr('src', 'images/processedImages/' + response.NewImage);
               $("#downloadLink").attr('href', 'images/processedImages/' + response.NewImage);
               $("#proccessedimageInfo").append('<ul>' +
                  '<li>New width of image : ' + response.NewWidth + '</li>' +
                  '<li>New height of image : ' + response.NewHeight + '</li>' +
                  '<li>Type of image : ' + response.NewMimeType + '</li>' +
                  '</ul>');
            } else if (response.status == 'newPng') {
               console.log("only Png got");
               console.log(response);
               $('#proccessedImage').modal('show');
               $("#downloadPreview").attr('src', 'images/processedImages/' + response.NewImage);
               $("#downloadLink").attr('href', 'images/processedImages/' + response.NewImage);
               $("#proccessedimageInfo").append('<ul>' +
                  '<li>New width of image : ' + response.NewWidth + '</li>' +
                  '<li>New height of image : ' + response.NewHeight + '</li>' +
                  '<li>Type of image : ' + response.NewMimeType + '</li>' +
                  '</ul>');
            } else if (response.status == 'CRImgage') {
               console.log("Converted Resized Image got");
               console.log(response);
               $('#proccessedImage').modal('show');
               $("#downloadPreview").attr('src', 'images/convertedResizedImages/' + response.NewImagePath);
               $("#downloadLink").attr('href', 'images/convertedResizedImages/' + response.NewImagePath);
               $("#proccessedimageInfo").append('<ul>' +
                  '<li>New width of image : ' + response.NewWidth + '</li>' +
                  '<li>New height of image : ' + response.NewHeight + '</li>' +
                  '<li>Type of image : ' + response.NewMimeType + '</li>' +
                  '</ul>');
            } else if (response.status == 'FileFormatError') {
               alert("File Format not supported (Only *png and *jpg)");
            }
         },
      });
   }
   $("#downloadLink").on("click", function(e) {
      setTimeout(function() {
         location.reload();
      }, 2000)
   });