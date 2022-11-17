<?php
/*
 * Application Name: 360 ERP Login Form Module
 * Folder Path: /
 * File Name: gta_logout.php
 * Resources: 
 * https://codeshack.io/secure-login-system-php-mysql/
 * 
 * 
 */
session_start();
session_destroy();
unset($_COOKIE['coo_In']); 
setcookie('coo_In', null, -1, '/');

// Redirect to the login page:
header('Location: index.php');


?>