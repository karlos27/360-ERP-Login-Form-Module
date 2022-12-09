<?php
/*
 * Application Name: 360 ERP Login Form Module
 * Version: 1.0
 * Folder Path: /
 * File Name: index.php
 * Resources:
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 * https://stackoverflow.com/questions/10753881/changing-the-language-of-error-message-in-required-field-in-html5-contact-form
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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
            rel="stylesheet" 
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
            crossorigin="anonymous">
    <!-- SweetAlert2-->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" 
            integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" 
            crossorigin="anonymous"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style_login.css">
    <link rel="stylesheet" href="css/style_register.css">
    <link rel="stylesheet" href="css/style_validation_form.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <!-- Font awesome -->
    <!-- <script src="https://kit.fontawesome.com/09f235b5ab.js" crossorigin="anonymous"></script> -->
    <!-- Project Title -->
    <title>360 ERP Login Form Module</title>
  </head>
  <body onload="erp_login_register_module_onload_content()">
    <div class="container">
        <div class="row screen-phone">
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div class="first-level-Box white-Box default-Box default-style-Box" id="first-parent-Box">
                    <img class="logo" 
                            id="logo" 
                            src="img/logo/logo.png"><hr>
                    <div class="form-Box">
                        <div class="row">
                            <div class="col">                                   
                                <button class="bttn-non-style" 
                                        id="bttn-dark-mode" 
                                        type="button" 
                                        onclick="erp_login_register_module_set_mode()">
                                        <img class="dark-mode-img"
                                                id="dl-mode-img" 
                                                src="img/darkmode/darkside-moon-dark.png"></button>
                                <span class="span-txt"
                                        id="txt-mode"></span>
                            </div>
                            <div class="col">
                                <h4 class="center title-form" id="title"></h4></div>
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
                                    onclick="erp_login_register_module_set_cookies('coo_Language', 'lg_GB', 365); erp_login_register_module_set_language(this); erp_login_register_module_set_language_validation(this);">
                                    <img class="flags" 
                                         src="img/flags/uk_flag.png"></a>
                                <a class="link-flag"    
                                    role="button"
                                    data-value="lg_CA"
                                    onclick="erp_login_register_module_set_cookies('coo_Language', 'lg_CA', 365); erp_login_register_module_set_language(this); erp_login_register_module_set_language_validation(this);">
                                    <img class="flags" 
                                         src="img/flags/cat_flag.png"></a>
                                <a class="link-flag"    
                                    role="button"
                                    data-value="lg_ES"
                                    onclick="erp_login_register_module_set_cookies('coo_Language', 'lg_ES', 365); erp_login_register_module_set_language(this); erp_login_register_module_set_language_validation(this);">
                                    <img class="flags" 
                                         src="img/flags/esp_flag.png"></a>
                            </div>
                        </div>
                        <!-- LOGIN FORM -->
                        <form action="gta_userauth.php" method="POST" id="erp-login-form" novalidate>
                            <div class="mb-3">
                                <label for="InputEmail" 
                                        class="form-label"
                                        id="InputEmailLabel"></label>
                                <input type="email"
                                        name="email" 
                                        class="form-control" 
                                        id="InputEmail" 
                                        autocomplete="email"
                                        aria-required="true" 
                                        required
                                        minlength="8">
                                <span class="error" 
                                        id="lg-email-span-error"
                                        aria-live="polite"></span>
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
                                        aria-required="true" 
                                        required>
                                <div class="form-text"
                                    id="passwordHelp"></div>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox"
                                        name="rememberme"
                                        class="form-check-input" 
                                        id="CheckMeIn"
                                        onclick="erp_login_register_module_cookies_checkbox_value(this);">
                                <label for="CheckMeIn" 
                                        class="form-check-label" 
                                        id="CheckMeInLabel"></label>
                            </div>
                            <button type="submit"
                                    name="submit" 
                                    class="btn btn-dark btn-full"
                                    id="PhoenixLFSubmit">&nbsp;</button>
                        </form>
                        <!-- REGISTER FORM -->
                        <form action="" method="POST" id="erp-register-form" novalidate>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="InputName" 
                                                class="form-label"
                                                id="InputNameLabel"></label>
                                        <input type="text"
                                                name="name"
                                                class="form-control" 
                                                id="InputName" 
                                                autocomplete="name"
                                                aria-required="true" 
                                                required>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="InputLastName" 
                                                class="form-label"
                                                id="InputLastNameLabel"></label>
                                        <input type="text"
                                                name="lastname" 
                                                class="form-control" 
                                                id="InputLastName" 
                                                autocomplete="lastname"
                                                aria-required="true" 
                                                required>
                                    </div>
                                </div>
                            </div>    
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="InputEmailRegister" 
                                                class="form-label"
                                                id="InputEmailRegisterLabel"></label>
                                        <input type="email"
                                                name="email" 
                                                class="form-control" 
                                                id="InputEmailRegister" 
                                                autocomplete="email"
                                                aria-required="true" 
                                                required>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="InputPhoneRegister" 
                                                class="form-label"
                                                id="InputPhoneRegisterLabel"></label>
                                        <input type="tel"
                                                name="phone"
                                                class="form-control" 
                                                id="InputPhoneRegister" 
                                                autocomplete="tel"
                                                aria-required="true"
                                                pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}" 
                                                required>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col"></div>
                                <div class="col">
                                    <button type="button"
                                            name="register_submit"
                                            class="btn btn-success btn-full btn-custom-next"
                                            id="PhoenixRFSubmitButton"
                                            onclick="erp_login_register_module_second_level_register_form();">
                                            <span id="PhoenixRFSubmitSpan"></span></button></div>
                            </div>
                        </form>
                    </div><hr>
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <button class="frgt-Pass link-primary bttn-non-style"
                                        id="frgt-Pass"></button></div>
                            <div class="col">
                                <button class="crt-Acc link-primary bttn-non-style"
                                    id="crt-Acc"
                                    onclick="erp_login_register_module_create_register_form()"></button></div>
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
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12" id="second-parent-Col">
                <div class="white-Boxes default-Box" id="second-parent-Box">
                    
                </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12"></div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="PwdModal" tabindex="-1" aria-labelledby="PwdModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="PwdModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    </div>
    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" 
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" 
            crossorigin="anonymous"></script>

    <!-- Custom JavaScript -->
    <script src="js/scripts_erp_login_register_module.js"></script>
  </body>
</html>