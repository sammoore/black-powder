<?php

/*
|--------------------------------------------------------------------------
| Settings 
|--------------------------------------------------------------------------
*/

define("EMAIL" , "sam@hashtack.com");
define("SUBJECT" , "BPW Website Contact Form Submission");

define("NAME_MSG" , "Please insert your name");
define("EMAIL_MSG" , "Please insert an email");
define("EMAIL_WRONG" , "Please insert a valid email");
define("PHONE_MSG" , "Please insert a phonenumber");
define("MESSAGE_MSG" , "Please insert a message");

/*
|--------------------------------------------------------------------------
| Simple Sender Script
|--------------------------------------------------------------------------
*/

if( $_POST ) {
    
	/* check mandatory fields */
	if( empty( $_POST['name'] ) ) {
		exit( NAME_MSG );
	}
	
	if( empty( $_POST['email'] ) ) {
		exit( EMAIL_MSG );
	}
	
	if( empty( $_POST['message'] ) ) {
		exit( MESSAGE_MSG );
	}
	
	/* validate email */
	if ( !empty( $_POST['email']) && !preg_match('/^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/', $_POST['email'])) {
		
		exit( EMAIL_WRONG );
		
	}
	
	/* create body message */
    $message = '';
    
	// Name 
	$message.= 'Name : ' . $_POST['name'] . '';

	$message.= 'Email : ' . $_POST['email'] . '';
	    
    // Message
    $message.= 'Message : ' . $_POST['message'] . '';
	
     
/* send email */
$email = mail( EMAIL , SUBJECT , $message , "From: ".$_POST['name']." <".$_POST['email'].">\r\n" ."Reply-To: ".$_POST['email']."\r\n" );

/* callback for ajax */
if( $email ) {
    echo 'OK';
} else { 
    echo 'ERROR';	}
}
	
?>