$(document).ready(function() {
    // Initialize EmailJS with your public key
    emailjs.init("XYhin_65Pmjh4JBLh"); // Your public key

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // Additional error messages or events can be added here
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // Prevent default submit behaviour
            
            // Send the form data using EmailJS
            emailjs.sendForm('service_oji1zfq', 'template_nyq923q', '#contactForm')
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                    $('#success > .alert-success').append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success').append('</div>');

                    // Clear all fields
                    $('#contactForm').trigger("reset");
                }, function(error) {
                    console.log('FAILED...', error);
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                    $('#success > .alert-danger').append("<strong>Sorry, it seems that my mail server is not responding. Please try again later!</strong>");
                    $('#success > .alert-danger').append('</div>');

                    // Clear all fields
                    $('#contactForm').trigger("reset");
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
