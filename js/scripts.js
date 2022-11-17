/*
 * Application Name: 360 ERP Login Form Module
 * Folder Path: /js/
 * File Name: scripts.js
 * Resources:
 * https://www.w3schools.com/js/js_cookies.asp
 * 
 * 
 */

/*
 * Cookies Funtion(s)
 * Set Cookies
 * 
 *
 */
function erp_login_module_set_cookies( cname, cvalue, exdays ) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = 'expires='+ d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';

}

/*
 * Cookies Funtion(s)
 * Get Cookies
 * 
 *
 */
function erp_login_module_get_cookies( cname ) {
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

/*
 * Cookies Funtion(s)
 * Check Cookies
 * 
 *
 */
function erp_login_module_check_cookies() {
  let lang = erp_login_module_get_cookies( 'coo_Language' );
  let mode = erp_login_module_get_cookies( 'coo_Mode' );
  let remr = erp_login_module_get_cookies( 'coo_In' );

  if( !lang ) {
    erp_login_module_set_cookies( 'coo_Language', 'lg_GB', '365' );
  }
  if( !mode ) {
    erp_login_module_set_cookies( 'coo_Mode', 'md_LT', '365' );
  }
  if( !remr ) {
    erp_login_module_set_cookies( 'coo_In', 'in_FALSE', '365' );
  }
}

/*
 * Cookies Funtion(s)
 * Delete Cookies
 * 
 *
 */
function erp_login_module_delete_cookies( cname ) {
  let expires = 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  document.cookie = cname + '=' + ';path=/'+ expires;
}

/*
 * Cookies Funtion(s)
 * Checkbox value
 * 
 *
 */
function erp_login_module_cookies_checkbox_value( cookieValue ){
  var check = cookieValue.checked;
  //console.log(check);
  if( check == true ) {
    erp_login_module_set_cookies( 'coo_In', 'in_TRUE', '365' );
  } else {
    erp_login_module_set_cookies( 'coo_In', 'in_FALSE', '365' );
  }
}

/*
 * Cookies Funtion(s)
 * Activation Message
 * 
 *
 */
function erp_login_module_cookies_activation_message( lang, positionWindow ) {
  var message;
  
  if ( lang != '' && lang == 'lg_CA' ) {
    message = 'Galetes activades';
  } else if( lang != '' && lang == 'lg_ES' ) {
    message = 'Galletas activadas';
  } else {
    message = 'Cookies enabled';
  }
  
  const Toast = Swal.mixin({
    toast: true,
    position: positionWindow,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: message
  })
}
/*
 * Cookies Funtion(s)
 * Position Activation Message
 * 
 *
 */
function erp_login_module_cookies_message_position( lang, mediaWindow ) {
  var positionWindow;
  
  if ( mediaWindow ) { 
    positionWindow = 'bottom';
  } else {
    positionWindow = 'top-end';
  }

  erp_login_module_cookies_activation_message( lang, positionWindow )
}

/*
 * Content Funtion(s)
 * Onload full content depending on cookies
 * 
 *
 */
function erp_login_module_onload_content(){
  // OnLoad check if cookies are set. If not, set default values
  erp_login_module_check_cookies();
  // Get cookie values and write content depending on language and mode
  var content_lang  = erp_login_module_get_cookies( 'coo_Language' );
  var content_mode  = erp_login_module_get_cookies( 'coo_Mode' );
  var img_langs     = document.getElementById('bttn-flags');
  // Language and content
  if ( content_lang != '' && content_lang == 'lg_CA' ) {  // Catalan 
    erp_login_module_write_content( content_lang, content_mode );
  } else if( content_lang != '' && content_lang == 'lg_ES' ) {  // Spanish
    erp_login_module_write_content( content_lang, content_mode );
  } else {
    // Set English language as default
    erp_login_module_set_cookies( 'coo_Language', 'lg_GB', '365' );//  English 
    erp_login_module_write_content( content_lang, content_mode );
  }
  // Mode and content
  if( content_mode != '' && content_mode == 'md_DK' ) { // Dark
    erp_login_module_set_mode();
    img_langs.innerHTML = '<img class=\'bttn-lng\' id=\'bttn-lng\' src=\'img/lang/lng_min_bright.png\'>';
  } else {  // Light
    erp_login_module_set_cookies( 'coo_Mode', 'md_LT', '365' );
    img_langs.innerHTML = '<img class=\'bttn-lng\' id=\'bttn-lng\' src=\'img/lang/lng_min_dark.png\'>';
  }
  // Check window size
  var mediaWindow = window.matchMedia( '(max-width: 576px)' ).matches;
  // Call for the message
  erp_login_module_cookies_message_position( content_lang, mediaWindow );
  // Load the content
  erp_login_module_write_content( content_lang, content_mode  );
}

/*
 * Language Funtion(s)
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
  
}, false);

/*
 * Language Funtion(s)
 * Select Language Action
 *  
 *
 */
function erp_login_module_set_language( language ) {
  var lang_set  = language.dataset.value;
  var coo_mode  = erp_login_module_get_cookies( 'coo_Mode' );
  
  if( lang_set != '' && lang_set == 'lg_CA' ) { //  Catalan
    erp_login_module_write_content( lang_set, coo_mode );
  } else if( lang_set != '' && lang_set == 'lg_ES' ) {  //  Sapanish
      erp_login_module_write_content( lang_set, coo_mode );
    } else {  //  English
        erp_login_module_write_content( lang_set, coo_mode );
      }
}

/*
 * Language Funtion(s)
 * Onload Write Language
 *  
 *
 */
function erp_login_module_write_content( lang, mode ) {
  var title     = document.getElementById( 'lgn-title');
  var span_mode = document.getElementById( 'txt-mode' );
  var span_lang = document.getElementById( 'txt-lang' );
  var eLabel    = document.getElementById( 'InputEmailLabel' );
  var eInput    = document.getElementById( 'InputEmail' );
  var pHelp     = document.getElementById( 'passwordHelp' );
  var pLabel    = document.getElementById( 'InputPasswordLabel' );
  var cLabel    = document.getElementById( 'CheckMeInLabel' );
  var bttnFm    = document.getElementById( 'PhoenixLFSubmit' );
  var frPass    = document.getElementById( 'frgt-Pass');
  var crAcct    = document.getElementById( 'crt-Acc' );
  var Phoenx    = document.getElementById( 'copyright' );
  
  if( lang != '' && lang == 'lg_CA' ) { //  Catalan
    title.innerHTML     = 'Inici Sessió';
    span_lang.innerHTML = 'Català';
    eLabel.innerHTML    = 'Correu electrònic';
    eInput.placeholder  = 'correu@exemple.com';
    pHelp.innerHTML     = 'No comparteixis mai la teva contrasenya.';
    pLabel.innerHTML    = 'Contrasenya';
    cLabel.innerHTML    = 'Mantenme connectat';
    bttnFm.innerHTML    = 'Accedir';
    frPass.innerHTML    = 'Recuperar contrasenya?';
    crAcct.innerHTML    = 'Crear compte';
    Phoenx.innerHTML    = '&copy;&nbsp;Impulsat per Indústries Fènix.';
    if( mode != '' && mode == 'md_DK' ) {
      span_mode.innerHTML = 'Mode fosc';
    } else {
      span_mode.innerHTML = 'Mode clar';
    }
  } else if( lang != '' && lang == 'lg_ES' ) {  //  Spanish
    title.innerHTML     = 'Inicio Sesión';
    span_lang.innerHTML = 'Español';
    eLabel.innerHTML    = 'Correo electrónico';
    eInput.placeholder  = 'correo@ejemplo.com';
    pHelp.innerHTML     = 'Nunca compartas tu contraseña con nadie.';
    pLabel.innerHTML    = 'Contraseña';
    cLabel.innerHTML    = 'Mantenme conectado';
    bttnFm.innerHTML    = 'Acceder';
    frPass.innerHTML    = 'Recuperar contraseña?';
    crAcct.innerHTML    = 'Crear cuenta';
    Phoenx.innerHTML    = '&copy;&nbsp;Impulsado por Industrias Fénix.';
    if( mode != '' && mode == 'md_DK' ) {
      span_mode.innerHTML = 'Modo oscuro';
    } else {
      span_mode.innerHTML = 'Modo claro';
    }
  } else {  //  English
    title.innerHTML     = 'Login';
    span_lang.innerHTML = 'English';
    eLabel.innerHTML    = 'Email address';
    eInput.placeholder  = 'email@example.com';
    pHelp.innerHTML     = 'Never share your password with anyone.';
    pLabel.innerHTML    = 'Password';
    cLabel.innerHTML    = 'Remember me';
    bttnFm.innerHTML    = 'Login';
    frPass.innerHTML    = 'Forgot password?';
    crAcct.innerHTML    = 'Create account';
    Phoenx.innerHTML    = '&copy;&nbsp;Powered by Phoenix Industries.';
    if( mode != '' && mode == 'md_DK' ) {
      span_mode.innerHTML = 'Dark mode';
    } else {
      span_mode.innerHTML = 'Light mode';
    }
  }
}

/*
 * Mode Funtion(s)
 * Dark or Light - CSS
 *  
 *
 */
function erp_login_module_set_mode() {
  var body      = document.body;
  var mode      = document.getElementById( 'dl-mode-img' );
  var logo      = document.getElementById( 'logo' );
  var imlg      = document.getElementById( 'bttn-flags' );
  var pbox      = document.getElementById( 'parent-Box' );
  var bttn      = document.getElementById( 'PhoenixLFSubmit' );
  var pass      = document.getElementById( 'frgt-Pass' );
  var acct      = document.getElementById( 'crt-Acc' );
  var condition = pbox.classList.contains('default-Box');
  var coo_lang  = erp_login_module_get_cookies( 'coo_Language' );
  var box_mode  = document.getElementById('txt-mode');
  
  if( condition ){
    //  Set Dark Mode Cookie
    erp_login_module_set_cookies( 'coo_Mode', 'md_DK', '365' );
    //  Remove default class list or default style
    pbox.classList.remove('default-Box');

    body.style.color  = '#0eb1dc';
    mode.src          = 'img/darkmode/darkside-sun-bright.png';
    logo.src          = 'img/logo/logo_dark.png';
    imlg.innerHTML    = '<img class=\'bttn-lng\' id=\'bttn-lng\' src=\'img/lang/lng_min_bright.png\'>';
    pbox.classList.remove( 'white-Box' );
    pbox.classList.toggle( 'black-Box' );
    bttn.classList.remove( 'btn-dark' );
    bttn.classList.toggle( 'btn-info' );
    pass.classList.remove( 'link-primary' );
    pass.classList.toggle( 'link-info' );
    acct.classList.toggle( 'link-primary' );
    acct.classList.toggle(  'link-info' );
    //  Set text message
    if ( coo_lang != '' && coo_lang == 'lg_CA' ) {
      box_mode.innerHTML = 'Mode fosc';
    } else if( coo_lang != '' && coo_lang == 'lg_ES' ) {
      box_mode.innerHTML = 'Modo oscuro';
    } else {
      box_mode.innerHTML = 'Dark mode';
    }   
  } else {
    //  Set Light Mode Cookie
    erp_login_module_set_cookies( 'coo_Mode', 'md_LT', '365' );
    //  Remove default class list or default style
    pbox.classList.toggle('default-Box');

    body.style.color  = '#212529';
    mode.src          = 'img/darkmode/darkside-moon-dark.png';
    logo.src          = 'img/logo/logo.png';
    imlg.innerHTML    = '<img class=\'bttn-lng\' id=\'bttn-lng\' src=\'img/lang/lng_min_dark.png\'>';
    pbox.classList.toggle('white-Box');
    pbox.classList.remove('black-Box');
    bttn.classList.toggle('btn-dark');
    bttn.classList.remove('btn-info');
    pass.classList.remove('link-info');
    pass.classList.toggle('link-primary');
    acct.classList.toggle('link-info');
    acct.classList.toggle('link-primary');
    //  Set text message
    if ( coo_lang != '' && coo_lang == 'lg_CA' ) {
      box_mode.innerHTML = 'Mode clar';
    } else if( coo_lang != '' && coo_lang == 'lg_ES' ) {
      box_mode.innerHTML = 'Modo claro';
    } else {
      box_mode.innerHTML = 'Light mode';
    }
  }
    
}
