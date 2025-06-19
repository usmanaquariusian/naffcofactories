/**************************************
    File Name: custom.js
    Template Name: NAFFCO Newsletter
    Created By: NAFFCO Branding
**************************************/

(function($) {
  "use strict";
  $(document).ready(function() {
    $("#nav-expander").on("click", function(e) {
      e.preventDefault();
      $("body").toggleClass("nav-expanded");
    });
    $("#nav-close").on("click", function(e) {
      e.preventDefault();
      $("body").removeClass("nav-expanded");
    });

    if (!$().lightSlider) {
      return;
    } else {
      $(".image-gallery").lightSlider({
        gallery: true,
        item: 1,
        slideMargin: 0,
        speed: 1000,
        pause: 5000,
        auto: true,
        loop: true,
        onSliderLoad: function() {
          $(".image-gallery").removeClass("cS-hidden");
        }
      });
    }
  });

  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });

  $(".carousel").carousel({
    interval: 4000
  });

  $("#subscription-form").on("submit", function(e) {
    e.preventDefault();
    $('#subscribe-button').attr('disabled', true);
    $('#subscribe-button').html('<i class="fa fa-spinner fa-spin mr-2"></i> Processing... Please wait.');

    // using serialize function of jQuery to get all values of form
    var serializedData = $("#subscription-form").serialize();

    // Variable to hold request
    var request;
    // Fire off the request to process-subscription.php
    request = $.ajax({
        url: "process-subscription.php",
        type: "post",
        data: serializedData,
        dataType: 'JSON',
    });
 
    // Callback handler that will be called on success
    request.done(function(jqXHR, textStatus, response) {
        // you will get response from your php page (what you echo or print)
         // show successfully for submit message
        $("#alert-message").removeClass('alert-success alert-danger');

        if(response['responseJSON']['result']) {
          $("#alert-message").addClass('alert-success');
        } else {
          $("#alert-message").addClass('alert-danger');
        }

        $("#alert-message").html(response['responseJSON']['message']).show();

        $('#subscribe-button').removeAttr('disabled');
        $('#subscribe-button').html('<i class="fa fa-envelope-o mr-2"></i> Subscribe to Newsletter');
    });

    // Callback handler that will be called on failure
    request.fail(function(jqXHR, textStatus, errorThrown) {
        // Log the error to the console
        // show error
        $("#alert-message").removeClass('alert-success alert-danger').addClass('alert-danger')
        .html('<h4 class="alert-heading">Subscription failed!</h4><p>There is some error while submit.</p>').show();
        console.error(
            "The following error occurred: " +
            textStatus, errorThrown
        );

        $('#subscribe-button').removeAttr('disabled');
        $('#subscribe-button').html('<i class="fa fa-envelope-o mr-2"></i> Subscribe to Newsletter');
    });

    $('#subscription-name').val('');
    $('#subscription-email').val('');
  });

  // $(window).load(function() {
  //   $("#preloader")
  //     .on(500)
  //     .fadeOut();
  //   $(".preloader")
  //     .on(600)
  //     .fadeOut("slow");
  // });

  jQuery(window).scroll(function() {
    if (jQuery(this).scrollTop() > 1) {
      jQuery(".dmtop").css({ bottom: "25px" });
    } else {
      jQuery(".dmtop").css({ bottom: "-100px" });
    }
  });
  jQuery(".dmtop").click(function() {
    jQuery("html, body").animate({ scrollTop: "0px" }, 800);
    return false;
  });
  
})(jQuery);

function openCategory(evt, catName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(catName).style.display = "block";
  evt.currentTarget.className += " active";
}
