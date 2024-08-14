<?php
// Check for empty fields and validate email
if(empty($_POST['name']) ||
   empty($_POST['email']) ||
   empty($_POST['phone']) ||
   empty($_POST['message']) ||
   !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) 
{
    echo "No arguments Provided!";
    return false;
}

// Sanitize input data to prevent XSS (Cross-Site Scripting)
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));

// Create the email and send the message
$to = 'paulmcneill1989@hotmail.co.uk'; // This is where the form will send a message to.
$email_subject = "Website Contact Form: $name";
$email_body = "You have received a new message from your website contact form.\n\n".
              "Here are the details:\n\nName: $name\n\nEmail: $email_address\n\n".
              "Phone: $phone\n\nMessage:\n$message";
$headers = "From: noreply@paulmartinmcneill.com\n"; // This is the email address the generated message will be from.
$headers .= "Reply-To: $email_address";   

// Send the email
if(mail($to, $email_subject, $email_body, $headers)) {
    return true;
} else {
    return false;
}
?>
