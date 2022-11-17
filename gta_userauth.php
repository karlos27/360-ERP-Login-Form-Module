<?php
/*
 * Application Name: 360 ERP Login Form Module
 * Folder Path: /
 * File Name: gta_userauth.php
 * Resources: 
 * https://codeshack.io/secure-login-system-php-mysql/
 * https://stackoverflow.com/questions/34851064/how-to-create-a-remember-me-function-in-login-without-using-form-in-javascript-o
 * 
 * 
 */

// Initialize the session
session_start();
// Include connection
require_once 'gta_config.php';

if ( isset( $_POST['submit'] ) ) {
    // Statement
    $stmt = $conn->prepare( 'SELECT UserID, password FROM gta_users WHERE email = ?' );
    // Bind parameters (s = string, i = int, b = blob, etc)
    $stmt->bind_param( 's', $_POST['email'] );
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $password);
        $stmt->fetch();
        // Account exists, now we verify the password.
        // Note: remember to use password_hash in your registration file to store the hashed passwords.
        //if ( password_verify( $_POST['password'], $password ) ) {
        if ( $_POST['password'] === $password ) {
            // Verification success! User has logged-in!
            // Create sessions, so we know the user is logged in, they basically act like cookies but remember the data on the server.
            session_regenerate_id();
            $_SESSION['loggedin'] = TRUE;
            $_SESSION['email'] = $_POST['email'];
            $_SESSION['id'] = $userid;
            
            header( 'Location: gta_screendesk.php' );
        } else {
            // Incorrect password
            echo 'Incorrect username and/or password!';
        }
    } else {
        // Incorrect username
        echo 'Incorrect username and/or password!';
    }

    $stmt->close();
}


?>