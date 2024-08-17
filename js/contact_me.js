$(document).ready(function() {
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // Additional error messages or events can be added here
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // Prevent default submit behaviour
            
            // Get values from FORM
            var name = $("input#name").val().trim();
            var email = $("input#email").val().trim();
            var phone = $("input#phone").val().trim();
            var message = $("textarea#message").val().trim();
            var firstName = name.split(' ')[0]; // For Success/Failure Message
            
            // Perform the AJAX request to send the form data
            $.ajax({
                url: "./mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                    $('#success > .alert-success').append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success').append('</div>');

                    // Clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!</strong>");
                    $('#success > .alert-danger').append('</div>');

                    // Clear all fields
                    $('#contactForm').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on input field, hide the success/failure message
$('#name').focus(function() {
    $('#success').html('');
});
