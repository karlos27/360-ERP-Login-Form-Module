<?php
/*
 * Application Name: 360 ERP Login Form Module
 * Folder Path: /
 * File Name: gta_screendesk.php
 * Resources: 
 * https://www.w3schools.com/php/php_cookies.asp
 * 
 */

// Initialize the session
session_start();
// If the user is not logged in redirect to the login page...
if ( !isset( $_SESSION['loggedin'] ) ) {
	header( 'Location: index.php' );
	setcookie('coo_In', null, -1, '/');
	exit;
}
echo 'Welcome ' . $_SESSION['email'] . '!';
echo "Language is: " . $_COOKIE['coo_Language'];
echo "Mode is: " . $_COOKIE['coo_Mode'];
if($_COOKIE['coo_In']){
	echo "iN is: " . $_COOKIE['coo_In'];
}


?>
<a href="gta_logout.php"><i class="fas fa-sign-out-alt"></i>Logout</a>