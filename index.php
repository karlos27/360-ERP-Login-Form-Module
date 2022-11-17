<?php
/*
 * Application Name: 360 ERP Login Form Module
 * Folder Path: /
 * File Name: index.php
 *
 * 
 */

 // Include authenticate user file
require_once "gta_userauth.php";

?>

<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <!-- SweetAlert2-->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">

    <title>Awesome LoginForm</title>
  </head>
  <body onload="erp_login_module_onload_content()">
    <div class="container">
        <div class="row screen-phone">
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div class="white-Box default-Box" id="parent-Box">
                    <img class="logo" 
                            id="logo" 
                            src="img/logo/logo.png"><hr>
                    <div class="form-Box">
                        <div class="row">
                            <div class="col">                                   
                                <button class="bttn-non-style" 
                                        id="bttn-dark-mode" 
                                        type="button" 
                                        onclick="erp_login_module_set_mode()">
                                        <img class="dark-mode-img"
                                                id="dl-mode-img" 
                                                src="img/darkmode/darkside-moon-dark.png"></button>
                                <span class="span-txt"
                                        id="txt-mode"></span>
                            </div>
                            <div class="col">
                                <h4 class="center" id="lgn-title"></h4></div>
                            <div class="col center">
                                <button class="bttn-non-style" 
                                        id="bttn-flags" 
                                        type="button"></button>
                                <span class="span-txt"
                                            id="txt-lang"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col"></div>
                            <div class="col"></div>
                            <div class="col lang-flags" id="box-flags">
                                <a class="link-flag"    
                                    role="button"
                                    data-value="lg_GB"
                                    onclick="erp_login_module_set_cookies('coo_Language', 'lg_GB', 365); erp_login_module_set_language(this)">
                                    <img class="flags" 
                                        src="img/flags/uk_flag.png"></a>
                                <a class="link-flag"    
                                    role="button"
                                    data-value="lg_CA"
                                    onclick="erp_login_module_set_cookies('coo_Language', 'lg_CA', 365); erp_login_module_set_language(this)">
                                    <img class="flags" 
                                        src="img/flags/cat_flag.png"></a>
                                <a class="link-flag"    
                                    role="button"
                                    data-value="lg_ES"
                                    onclick="erp_login_module_set_cookies('coo_Language', 'lg_ES', 365); erp_login_module_set_language(this)">
                                    <img class="flags" 
                                        src="img/flags/esp_flag.png"></a>
                            </div>
                        </div>
                        <form action="gta_userauth.php" method="POST">
                            <div class="mb-3">
                                <label for="InputEmail" 
                                        class="form-label"
                                        id="InputEmailLabel"></label>
                                <input type="email"
                                        name="email" 
                                        class="form-control" 
                                        id="InputEmail" 
                                        autocomplete="email"
                                        required>
                            </div>
                            <div class="mb-3">
                                <label for="InputPassword" 
                                        class="form-label"
                                        id="InputPasswordLabel"></label>
                                <input type="password"
                                        name="password" 
                                        class="form-control" 
                                        id="InputPassword"
                                        aria-describedby="passwordHelp"
                                        autocomplete="current-password"
                                        required>
                                <div class="form-text"
                                    id="passwordHelp"></div>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox"
                                        name="rememberme"
                                        class="form-check-input" 
                                        id="CheckMeIn"
                                        onclick="erp_login_module_cookies_checkbox_value(this);">
                                <label for="CheckMeIn" 
                                        class="form-check-label" 
                                        id="CheckMeInLabel"></label>
                            </div>
                            <button type="submit"
                                    name="submit"
                                    value="Submit" 
                                    class="btn btn-dark bttn-full"
                                    id="PhoenixLFSubmit">&nbsp;</button>
                        </form>
                    </div><hr>
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <a class="frgt-Pass link-primary"
                                    id="frgt-Pass" 
                                    href="#"></a></div>
                            <div class="col">
                                <a class="crt-Acc link-primary"
                                    id="crt-Acc" 
                                    href="#"></a></div>
                        </div>
                    </div><hr>
                    <div class="container">
                        <div class="row">
                        <div class="row copyright">
                            <div class="col" 
                                 id="copyright"></div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-8 col-lg-8 col-md-6 col-sm-12"></div>
        </div>
    </div>
    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <!-- Custom JavaScript -->    
    <script src="js/scripts.js"></script>
    

  </body>
</html>