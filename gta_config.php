<?php
/*
 * Application Name: 360 ERP Login Form Module
 * Folder Path: /
 * File Name: gta_config.php
 * Resources: 
 * https://codeshack.io/secure-login-system-php-mysql/
 *
 * 
 */


// Database credentials
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'gridtechapp');
 
/* Attempt to connect to MySQL database */
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
// Check connection
if($conn === false) {
    die("ERROR: Could not connect. " . mysqli_connect_error());
} else {
    // echo "Application connection... done!";
}

//  If user is logged in and has checked remember me, go directly to homepage
if ( isset( $_SESSION['loggedin'] ) && $_COOKIE['coo_In'] == "in_TRUE" ) {
	header( 'Location: gta_screendesk.php' );
	exit;
}
?>