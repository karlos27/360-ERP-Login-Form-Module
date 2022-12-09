/**
  * Application Name: 360 ERP Login Form Module
  * Folder Path: /js/
  * File Name: scripts_erp_login_register_module.js
  * Resources:
  * https://www.w3schools.com/js/js_cookies.asp
  * https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
  * 
  */

/** 
 * Setting VALUES 
 * 
 */
let loginForm       = document.getElementById( 'erp-login-form' );
let registerForm    = document.getElementById( 'erp-register-form' );
let secondLevelCol  = document.getElementById( 'second-parent-Col' );
let firstLevelRF    = document.getElementById( 'first-parent-Box' );
let secondLevelRF   = document.getElementById( 'second-parent-Box' );
let spanMode        = document.getElementById( 'txt-mode' );
let submitButtonLF  = document.getElementById( 'PhoenixLFSubmit' );
let forgotPassword  = document.getElementById( 'frgt-Pass' );
let createAccount   = document.getElementById( 'crt-Acc' );
let submitButtonRF  = document.getElementById( 'PhoenixRFSubmitButton' );
let mediaWindow     = window.matchMedia( '(max-width: 576px)' ).matches;

/**
  * Cookies Function(s)
  * Set Cookies
  * 
  *
  */
function erp_login_register_module_set_cookies( cname, cvalue, exdays ) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = 'expires='+ d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';

  }

/**
  * Cookies Function(s)
  * Get Cookies
  * 
  *
  */
function erp_login_register_module_get_cookies( cname ) {
  let name = cname + '=';
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf( name ) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';

  }

/**
  * Cookies Function(s)
  * Check Cookies
  * 
  *
  */
function erp_login_register_module_check_cookies() {
  var lang = erp_login_register_module_get_cookies( 'coo_Language' );
  var mode = erp_login_register_module_get_cookies( 'coo_Mode' );
  var remr = erp_login_register_module_get_cookies( 'coo_In' );
  //  Set default cookies
  if( !lang ) {
    erp_login_register_module_set_cookies( 'coo_Language', 'lg_GB', '365' );
  }
  if( !mode ) {
    erp_login_register_module_set_cookies( 'coo_Mode', 'md_LT', '365' );
  }
  if( !remr ) {
    erp_login_register_module_set_cookies( 'coo_In', 'in_FALSE', '365' );
  }
  }

/**
  * Cookies Function(s)
  * Delete Cookies
  * 
  *
  */
function erp_login_register_module_delete_cookies( cname ) {
  let expires = 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  document.cookie = cname + '=' + ';path=/'+ expires;
  }

/**
  * Cookies Function(s)
  * Checkbox value
  * 
  *
  */
function erp_login_register_module_cookies_checkbox_value( cookieValue ){
  var check = cookieValue.checked;
  if( check == true ) {
    erp_login_register_module_set_cookies( 'coo_In', 'in_TRUE', '365' );
  } else {
    erp_login_register_module_set_cookies( 'coo_In', 'in_FALSE', '365' );
  }
  }

/**
  * Cookies Function(s)
  * Activation Message
  * 
  *
  */
function erp_login_register_module_cookies_activation_message( lang, positionWindow ) {
  var message;
  
  if( lang != '' && lang == 'lg_CA' ) {
    message = 'Galetes activades';
  } else if( lang != '' && lang == 'lg_ES' ) {
    message = 'Galletas activadas';
  } else {
    message = 'Cookies enabled';
  }
  
  const Toast = Swal.mixin( {
    toast: true,
    position: positionWindow,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  } )
  
  Toast.fire( {
    icon: 'success',
    title: message
  } )
  }

/**
  * Cookies Function(s)
  * Activation Message (Position)
  * 
  *
  */
function erp_login_register_module_cookies_message_position( lang, mediaWindow ) {
  var positionWindow;
  if ( mediaWindow ) { 
    positionWindow = 'bottom';
  } else {
    positionWindow = 'top-end';
  }

  erp_login_register_module_cookies_activation_message( lang, positionWindow )
  }

/**
  * Content Function(s)
  * Onload full content depending on cookies
  * 
  *
  */
function erp_login_register_module_onload_content(){
  // OnLoad check if cookies are set. If not, set default values
  erp_login_register_module_check_cookies();
  var lang      = erp_login_register_module_get_cookies( 'coo_Language' );
  var mode      = erp_login_register_module_get_cookies( 'coo_Mode' );
  var img_langs = document.getElementById('bttn-flags');
  // Language and content
  if ( lang != '' && lang == 'lg_CA' ) {  // Catalan 
    erp_login_register_module_write_content( lang, mode );
  } else if( lang != '' && lang == 'lg_ES' ) {  // Spanish
    erp_login_register_module_write_content( lang, mode );
  } else {
    // Set English language as default
    erp_login_register_module_set_cookies( 'coo_Language', 'lg_GB', '365' );
    erp_login_register_module_write_content( lang, mode );
  }
  // Mode and content
  if( mode != '' && mode == 'md_DK' ) { // Dark
    erp_login_register_module_set_mode();
    img_langs.innerHTML = '<img class=\'bttn-lng\' id=\'bttn-lng\' src=\'img/lang/lng_min_bright.png\'>';
  } else {  // Light
    erp_login_register_module_set_cookies( 'coo_Mode', 'md_LT', '365' );
    img_langs.innerHTML = '<img class=\'bttn-lng\' id=\'bttn-lng\' src=\'img/lang/lng_min_dark.png\'>';
  }
  
  // Call for the message
  erp_login_register_module_cookies_message_position( lang, mediaWindow );
  // Load the content
  erp_login_register_module_write_content( lang, mode  );
  }

/**
  * Language Function(s)
  * Show Languages
  *  
  *
  */
var box = document.getElementById( 'box-flags' );
var btn = document.getElementById( 'bttn-flags' );

btn.addEventListener( 'click', function () {
  if (box.classList.contains( 'hidden' )) {
    box.classList.remove('hidden');
    setTimeout(function () {
      box.classList.remove('visuallyhidden');
    }, 20 );
  } else {
    box.classList.add( 'visuallyhidden' );    
    box.addEventListener( 'transitionend', function(e) {
      box.classList.add( 'hidden' );
    }, {
      capture: false,
      once: true,
      passive: false
    } );
  }
  
}, false );

/**
  * Language Function(s)
  * Select Language Action
  *  
  *
  */
function erp_login_register_module_set_language( language ) {
  var lang_set  = language.dataset.value;
  var mode      = erp_login_register_module_get_cookies( 'coo_Mode' );
    
  if( lang_set != '' && lang_set == 'lg_CA' ) { //  Catalan
    erp_login_register_module_write_content( lang_set, mode );
  } else if( lang_set != '' && lang_set == 'lg_ES' ) {  //  Spanish
      erp_login_register_module_write_content( lang_set, mode );
  } else {  //  English
      erp_login_register_module_write_content( lang_set, mode );
  }
  }

/**
  * Language Function(s)
  * Onload Write Content
  *  
  *
  */
function erp_login_register_module_write_content( lang, mode ) {
  //  Set Necessary Values
  var title         = document.getElementById( 'title');
  var spanLang      = document.getElementById( 'txt-lang' );
  var eLabel        = document.getElementById( 'InputEmailLabel' );
  var eInput        = document.getElementById( 'InputEmail' );
  var pLabel        = document.getElementById( 'InputPasswordLabel' );
  var pInput        = document.getElementById( 'InputPassword' );
  var pHelp         = document.getElementById( 'passwordHelp' );
  var cLabel        = document.getElementById( 'CheckMeInLabel' );
  var nrLabel       = document.getElementById( 'InputNameLabel' );
  var nrInput       = document.getElementById( 'InputName' );
  var lrLabel       = document.getElementById( 'InputLastNameLabel' );
  var lrInput       = document.getElementById( 'InputLastName' );
  var erLabel       = document.getElementById( 'InputEmailRegisterLabel' );
  var erInput       = document.getElementById( 'InputEmailRegister' );
  var prLabel       = document.getElementById( 'InputPhoneRegisterLabel' );
  var prInput       = document.getElementById( 'InputPhoneRegister' );
  var bttnRF        = document.getElementById( 'PhoenixRFSubmitSpan' );
  var Phoenx        = document.getElementById( 'copyright' );
  //  Catalan Content
  if( lang != '' && lang == 'lg_CA' ) { 
    if ( loginForm.style.display !== 'none' ) {
      title.innerHTML                 = 'Inici sessió';
      createAccount.innerHTML         = 'Crear compte';
      forgotPassword.style.display    = 'block';
      forgotPassword.innerHTML        = 'Recuperar contrasenya?';
    } else {
        title.innerHTML               = 'Registre';
        createAccount.innerHTML       = 'Accedir al compte';
        forgotPassword.style.display  = 'none';
    }
    spanLang.innerHTML                = 'Català';
    eLabel.innerHTML                  = 'Correu electrònic';
    eInput.placeholder                = 'correu@exemple.com';
    eInput.title                      = 'El teu correu electrònic.';
    pHelp.innerHTML                   = 'No comparteixis mai la teva contrasenya.';
    pLabel.innerHTML                  = 'Contrasenya';
    cLabel.innerHTML                  = 'Mantenme connectat';
    submitButtonLF.innerHTML          = 'Accedir';
    Phoenx.innerHTML                  = '&copy;&nbsp;Impulsat per Indústries Fènix.';
    nrLabel.innerHTML                 = 'Nom';
    nrInput.title                     = 'El teu nom';
    lrLabel.innerHTML                 = 'Cognom(s)';
    lrInput.title                     = 'El(s) teu(s) cognom(s)';
    erLabel.innerHTML                 = 'Correu electrònic';
    erInput.placeholder               = 'correu@exemple.com';
    erInput.title                     = 'El teu correu electrònic.';
    prLabel.innerHTML                 = 'Telèfon mòbil';
    prInput.placeholder               = '123-45-67-89';
    prInput.title                     = 'El teu telèfon mòvil. Introdueix el format amb guions.';
    bttnRF.innerHTML                  = 'Següent';
    //  Mode Type Text
    if( mode != '' && mode == 'md_DK' ) {
      spanMode.innerHTML = 'Mode fosc';
    } else {
      spanMode.innerHTML = 'Mode clar';
    }
  } else if( lang != '' && lang == 'lg_ES' ) {  //  Spanish Content
      if ( loginForm.style.display !== 'none' ) {
          title.innerHTML                 = 'Inicio Sesión';
          createAccount.innerHTML         = 'Crear cuenta';
          forgotPassword.style.display    = 'block';
          forgotPassword.innerHTML        = 'Recuperar contraseña?';
      } else {
            title.innerHTML               = 'Registro';
            createAccount.innerHTML       = 'Acceder a la cuenta';
            forgotPassword.style.display  = 'none';
      }
      spanLang.innerHTML                 = 'Español';
      eLabel.innerHTML                    = 'Correo electrónico';
      eInput.placeholder                  = 'correo@ejemplo.com';
      eInput.title                        = 'Tu correo electrónico.';
      pHelp.innerHTML                     = 'Nunca compartas tu contraseña con nadie.';
      pLabel.innerHTML                    = 'Contraseña';
      cLabel.innerHTML                    = 'Mantenme conectado';
      submitButtonLF.innerHTML            = 'Acceder';
      Phoenx.innerHTML                    = '&copy;&nbsp;Impulsado por Industrias Fénix.';
      nrLabel.innerHTML                   = 'Nombre';
      nrInput.title                       = 'Tu nombre';
      lrLabel.innerHTML                   = 'Apellido(s)';
      lrInput.title                       = 'Tu(s) apellido(s)';
      erLabel.innerHTML                   = 'Correo electrónico';
      erInput.placeholder                 = 'correo@ejemplo.com';
      erInput.title                       = 'Tu correo electrónico.';
      prLabel.innerHTML                   = 'Teléfono móvil';
      prInput.placeholder                 = '123-45-67-89';
      prInput.title                       = 'Tu número de teléfono móbil. Introduce el formato con guiones.';
      bttnRF.innerHTML                    = 'Siguiente';
      //  Mode Type Text
      if( mode != '' && mode == 'md_DK' ) {
        spanMode.innerHTML = 'Modo oscuro';
      } else {
        spanMode.innerHTML = 'Modo claro';
      }
    } else {  //  English Content
        if( loginForm.style.display !== 'none' ) {
          title.innerHTML                 = 'Login';
          createAccount.innerHTML         = 'Create account';
          forgotPassword.style.display    = 'block';
          forgotPassword.innerHTML        = 'Forgot password?';
        } else {
            title.innerHTML               = 'Register';
            createAccount.innerHTML       = 'Login';
            forgotPassword.style.display  = 'none';
        }       
        spanLang.innerHTML               = 'English';
        eLabel.innerHTML                  = 'Email address';
        eInput.placeholder                = 'email@example.com';
        eInput.title                      = 'Your email address.';
        pHelp.innerHTML                   = 'Never share your password with anyone.';
        pLabel.innerHTML                  = 'Password';
        cLabel.innerHTML                  = 'Remember me';
        submitButtonLF.innerHTML          = 'Login';
        Phoenx.innerHTML                  = '&copy;&nbsp;Powered by Phoenix Industries.';
        nrLabel.innerHTML                 = 'Name';
        nrInput.title                     = 'Your name';
        lrLabel.innerHTML                 = 'Last name';
        lrInput.title                     = 'Your last name';
        erLabel.innerHTML                 = 'Email address';
        erInput.placeholder               = 'email@example.com';
        erInput.title                     = 'Your email address.';
        prLabel.innerHTML                 = 'Cell phone';
        prInput.placeholder               = '123-45-67-89';
        prInput.title                     = 'Your cell phone number. Use hyphen format.';
        bttnRF.innerHTML                  = 'Next';
        //  Mode Type Text
        if( mode != '' && mode == 'md_DK' ) {
          spanMode.innerHTML = 'Dark mode';
        } else {
          spanMode.innerHTML = 'Light mode';
        }
      }
  }

/**
  * Mode Function(s)
  * Dark or Light
  *  
  *
  */
function erp_login_register_module_set_mode() {
  //  Get Cookie Language
  var lang = erp_login_register_module_get_cookies( 'coo_Language' );
  //  Set Values
  var body      = document.body;
  var modeImg   = document.getElementById( 'dl-mode-img' );
  var logo      = document.getElementById( 'logo' );
  var imLg      = document.getElementById( 'bttn-flags' );
  var condition = firstLevelRF.classList.contains( 'default-Box' );
    
  if( condition ){
    //  Set Dark Mode Cookie
    erp_login_register_module_set_cookies( 'coo_Mode', 'md_DK', '365' );
    //  Remove default class list or default style
    firstLevelRF.classList.remove( 'default-Box' );
    secondLevelRF.classList.remove( 'default-Box' );
    // Set Dark Mode Content
    body.style.color  = '#0eb1dc';
    modeImg.src       = 'img/darkmode/darkside-sun-bright.png';
    logo.src          = 'img/logo/logo_dark.png';
    imLg.innerHTML    = '<img class=\'bttn-lng\' id=\'bttn-lng\' src=\'img/lang/lng_min_bright.png\'>';
    firstLevelRF.classList.remove( 'white-Box' );
    secondLevelRF.classList.remove( 'white-Boxes' );
    firstLevelRF.classList.toggle( 'black-Box' );
    secondLevelRF.classList.toggle( 'black-Boxes' );
    submitButtonLF.classList.remove( 'btn-dark' );
    submitButtonLF.classList.toggle( 'btn-info' );
    submitButtonRF.classList.remove( 'btn-success' );
    submitButtonRF.classList.toggle( 'btn-info' );
    forgotPassword.classList.remove( 'link-primary' );
    forgotPassword.classList.toggle( 'link-info' );
    createAccount.classList.toggle( 'link-primary' );
    createAccount.classList.toggle( 'link-info' );
    //  Set Text Message
    if ( lang != '' && lang == 'lg_CA' ) {
      spanMode.innerHTML = 'Mode fosc';
    } else if( lang != '' && lang == 'lg_ES' ) {
      spanMode.innerHTML = 'Modo oscuro';
    } else {
      spanMode.innerHTML = 'Dark mode';
    }   
  } else {
    //  Set Light Mode Cookie
    erp_login_register_module_set_cookies( 'coo_Mode', 'md_LT', '365' );
    //  Remove default class list or default style
    firstLevelRF.classList.toggle( 'default-Box' );
    secondLevelRF.classList.toggle( 'default-Box' );
    // Set Light Mode Content
    body.style.color  = '#212529';
    modeImg.src       = 'img/darkmode/darkside-moon-dark.png';
    logo.src          = 'img/logo/logo.png';
    imLg.innerHTML    = '<img class=\'bttn-lng\' id=\'bttn-lng\' src=\'img/lang/lng_min_dark.png\'>';
    firstLevelRF.classList.toggle( 'white-Box' );
    secondLevelRF.classList.toggle( 'white-Boxes' );
    firstLevelRF.classList.remove( 'black-Box' );
    secondLevelRF.classList.remove( 'black-Boxes' );
    submitButtonLF.classList.toggle( 'btn-dark' );
    submitButtonLF.classList.remove( 'btn-info' );
    submitButtonRF.classList.toggle( 'btn-success' );
    submitButtonRF.classList.remove( 'btn-info' );
    forgotPassword.classList.remove( 'link-info' );
    forgotPassword.classList.toggle( 'link-primary' );
    createAccount.classList.toggle( 'link-info' );
    createAccount.classList.toggle( 'link-primary' );
    //  Set text message
    if ( lang != '' && lang == 'lg_CA' ) {
      spanMode.innerHTML = 'Mode clar';
    } else if( lang != '' && lang == 'lg_ES' ) {
      spanMode.innerHTML = 'Modo claro';
    } else {
      spanMode.innerHTML = 'Light mode';
    }
  }   
  }

/**
  * Show Hide Function(s)
  * Swap Forms
  *  
  *
  */ 
function erp_login_register_module_create_register_form(){
  //  Get Language and Mode Cookies
  var lang = erp_login_register_module_get_cookies( 'coo_Language' );
  var mode = erp_login_register_module_get_cookies( 'coo_Mode' );
  //  Show Hide Forms
  if( loginForm.style.display === 'none' ) {
    loginForm.style.display    = 'block';
    registerForm.style.display = 'none';
    //  Write the Content
    erp_login_register_module_write_content( lang, mode );
    //  Remove CSS Animation
    secondLevelRF.classList.remove( 'second-level-Box' );
    // Turn ON Next Button
    submitButtonRF.disabled = false;
    } else {
      loginForm.style.display    = 'none';
      registerForm.style.display = 'block';
      //  Write the Content
      erp_login_register_module_write_content( lang, mode );
    }
}

/**
  * Registration Form Function(s)
  * Create Inputs Second Level Registration Form
  *  
  *
  */
function erp_login_register_module_create_content_register_form() {
  var secondLevelBox            = document.getElementById( 'second-parent-Box' );
  
  //  Create empty header
  var emptyHeader               = document.createElement( 'HR' );
  emptyHeader.style.marginTop   = '23.5%';
  secondLevelBox.appendChild( emptyHeader );

  //  Create Parent Box with class form-Box
  var divParentPassword         = document.createElement( 'DIV' );
  divParentPassword.classList.add( 'form-Box' );
  secondLevelBox.appendChild( divParentPassword );

  //  Create Label Input Password
  var passwordInputLabel        = document.createElement( 'LABEL' );
  passwordInputLabel.setAttribute( 'for', 'rgpasswordInput' );
  passwordInputLabel.setAttribute( 'id', 'rgpasswordInputLabel' );
  passwordInputLabel.classList.add( 'form-label' );
  passwordInputLabel.innerHTML  = 'Password'; 
  divParentPassword.appendChild( passwordInputLabel );

  //  Create Input Password 
  var passwordInput             = document.createElement( 'INPUT' );
  passwordInput.setAttribute( 'type', 'password' );
  passwordInput.setAttribute( 'name', 'password' );
  passwordInput.setAttribute( 'id', 'rgpasswordInput' );
  passwordInput.setAttribute( 'minlength', '8' );
  passwordInput.classList.add( 'form-control' );
  passwordInput.classList.add( 'password-input-control' );
  passwordInput.required = true;
  divParentPassword.appendChild( passwordInput );

  //  Create Button Password Pattern
  //  Button trigger modal
  var passwordPatternBox          = document.createElement( 'DIV' );
  passwordPatternBox.classList.add( 'tools-btt' );
  divParentPassword.appendChild( passwordPatternBox );

  var passwordPattern             = document.createElement( 'BUTTON' );
  passwordPattern.setAttribute( 'type', 'button' );
  passwordPattern.setAttribute( 'data-bs-toggle', 'modal' );
  passwordPattern.setAttribute( 'data-bs-target', '#PwdModal' );
  passwordPattern.classList.add( 'btn' );
  passwordPattern.classList.add( 'tools-img' );
  passwordPatternBox.appendChild( passwordPattern );

  var passwordImagePattern        = document.createElement( 'IMG' );
  passwordImagePattern.classList.add( 'btn' );
  passwordImagePattern.setAttribute( 'class', 'img-tools' );
  passwordImagePattern.setAttribute( 'id', 'img-tools' );
  passwordImagePattern.setAttribute("src", "img/tools/light-tools.png");
  passwordPattern.appendChild( passwordImagePattern );
}

/**
  * User Registration Process Function(s)
  * Open Second Level Box
  *  
  *
  */ 
function erp_login_register_module_second_level_register_form(){  
  //  Add CSS Animation
  secondLevelRF.classList.toggle( 'second-level-Box' );
  //  Disable Next Button
  submitButtonRF.disabled = true;
  if( mediaWindow ){
    //  If phone, scroll to second-level-Box
    secondLevelCol.scrollIntoView();
  }
  //  Add Content to the Registration Form
  erp_login_register_module_create_content_register_form();
}


/**
  * Form Validation Function(s)
  * Login Form Validation
  * 
  *
  */

const login_form        = document.getElementById( 'erp-login-form' );
const login_email       = document.getElementById( 'InputEmail' );
const login_emailError  = document.getElementById( 'lg-email-span-error' );

login_email.addEventListener( 'input', ( event ) => {
    // Each time the user types something, we check if the
    // form fields are valid.
    if ( login_email.validity.valid ) {
    // Reset the content of the message
    login_emailError.innerHTML = '';
    // Reset the visual state of the message   
    login_emailError.className = 'error';   
  } else {
    // If there is still an error, show the correct error
    showError( lang );
  }
  } );

login_form.addEventListener( 'submit', ( event ) => {
  // if the email field is valid, we let the form submit
  if ( ! login_email.validity.valid ) {
    // If it isn't, we display an appropriate error message
    showError( lang );
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  }
  } );

/**
  * Form Validation Function(s)
  * Show Error Messages
  * 
  *
  */
function showError( lang ) {
    // Set messages
    if( lang != '' && lang == 'lg_CA' ) {
        missing_message     = 'Cal afegir un correu electrònic.';
        mismatch_message    = 'El valor ha de tenir format de correu electrònic.';
        short_message       = `El valor ha de tenir almenys ${login_email.minLength} caràcters.`;
    } else if( lang != '' && lang == 'lg_ES' ) {
        missing_message     = 'Es necesario añadir un correo electrónico.';
        mismatch_message    = 'El valor debe tener formato de correo electrónico.';
        short_message       = `El valor debe tener al menos de ${login_email.minLength} caracteres.`;
    } else {
        missing_message     = 'You need to enter an e-mail address.';
        mismatch_message    = 'Entered value needs to be an e-mail address.';
        short_message       = `Email should be at least ${login_email.minLength} characters.`;
    }

    if( login_email.validity.valueMissing ) {
        // Set the styling appropriately
        login_emailError.className = 'error active missing';
        // If the field is empty,
        // display the following error message.
        login_emailError.innerHTML = missing_message;
    } else if( login_email.validity.typeMismatch ) {
        // Set the styling appropriately
        login_emailError.className = 'error active mismatch'; 
        // If the field doesn't contain an email address,
        // display the following error message.
        login_emailError.innerHTML = mismatch_message;
    } else if( login_email.validity.tooShort ) {
        // Set the styling appropriately
        login_emailError.className = 'error active short';
        // If the data is too short,
        // display the following error message.
        login_emailError.innerHTML = short_message;
    }
  }

/**
  * Form Validation Function(s)
  * Changing Language
  * 
  *
  */
function erp_login_register_module_set_language_validation( lang ) {
    //  Set language
    var lang_set    = lang.dataset.value;
    //  Set condition(s)
    var messageBox  = document.getElementById( 'lg-email-span-error' );
    var condition   = messageBox.classList.contains( 'active' );
    if( condition ){
      //  Show Error message
      showError( lang_set );
    }
    
}