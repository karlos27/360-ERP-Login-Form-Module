/*
 * Awesome LoginForm
 * scripts.js
 * 
 */

/*
 * Courtesy Greeting
 *
 */

// Set Message
function hi() {
    var hi = 'hi!';
    console.log( hi );
  }

/*
 * Cookies Funtion(s)
 * Resources:
 * https://www.w3schools.com/js/js_cookies.asp
 *
 */

// Show Cookies Message
function show_Cookies( positionWindow ) {
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
    title: 'Cookies activated'
  })
}
// Set Cookies Message
function show_CookiesMessage( mediaWindow ) {
  var positionWindow = "";
  
  if ( mediaWindow ) { 
    positionWindow = 'bottom';
  } else {
    positionWindow = 'top-end';
  }

  show_Cookies( positionWindow )
}
// Set Cookies
function set_Cookies( cname, cvalue, exdays ) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = 'expires='+ d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
// Get Cookies
function get_Cookies( cname ) {
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
// Check Cookies
function check_Cookies() {
  let lang = get_Cookies( 'coo_Language' );
  let mode = get_Cookies( 'coo_Mode' );

  var mediaWindow = window.matchMedia( '(max-width: 576px)' ).matches;
  show_CookiesMessage( mediaWindow );

  var span_mode = document.getElementById('txt-mode');
  var span_lang = document.getElementById('txt-lang');
  var img_langs = document.getElementById('bttn-flags');
  
  if ( lang != '' && lang == 'lg_CA' ) {
    span_lang.innerHTML = 'Català';

    if( mode != '' && mode == 'md_DK' ) {
      span_mode.innerHTML = 'Mode fosc';
    } else {
      span_mode.innerHTML = 'Mode clar';
    }

  } else if( lang != '' && lang == 'lg_ES' ) {
    span_lang.innerHTML = 'Español';

    if( mode != '' && mode == 'md_DK' ) {
      span_mode.innerHTML = 'Modo oscuro';
    } else {
      span_mode.innerHTML = 'Modo claro';
    }

  } else {
    set_Cookies( 'coo_Language', 'lg_GB', '365' );
    span_lang.innerHTML = 'English';

    if( mode != '' && mode == 'md_DK' ) {
      span_mode.innerHTML = 'Dark mode';
    } else {
      span_mode.innerHTML = 'Light mode';
    }
  }

  if( mode != '' && mode == 'md_DK' ) {
    DarkSide();
    img_langs.innerHTML = '<img class=\'bttn-lng\' id=\'bttn-lng\' src=\'img/lang/lng_min_bright.png\'>';
  } else {
    set_Cookies( 'coo_Mode', 'md_BT', '365' );
    img_langs.innerHTML = '<img class=\'bttn-lng\' id=\'bttn-lng\' src=\'img/lang/lng_min_dark.png\'>';
  }
}
// Delete Cookies
function delete_Cookies( cname ) {
  let expires = 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  document.cookie = cname + '=' + expires + ';path=/';
} 

/*
 * Language Funtion(s)
 *
 */

// Show Languages
var box = document.getElementById('box-flags');
var btn = document.getElementById('bttn-flags');

btn.addEventListener('click', function () {
  if (box.classList.contains('hidden')) {
    box.classList.remove('hidden');
    setTimeout(function () {
      box.classList.remove('visuallyhidden');
    }, 20);
  } else {
    box.classList.add('visuallyhidden');    
    box.addEventListener('transitionend', function(e) {
      box.classList.add('hidden');
    }, {
      capture: false,
      once: true,
      passive: false
    });
  }
  
}, false);
// Write Language
function set_Language( language ) {
  var lang      = language.dataset.value;
  var span_lang = document.getElementById('txt-lang');
  
  let mode      = get_Cookies( 'coo_Mode' );
  var span_mode = document.getElementById('txt-mode');
  
  if ( lang != '' && lang == 'lg_CA' ) {
    span_lang.innerHTML = 'Català';
    
    if( mode != '' && mode == 'md_DK' ) {
      span_mode.innerHTML = 'Mode fosc';
    } else {
      span_mode.innerHTML = 'Mode clar';
    }
    
  } else if( lang != '' && lang == 'lg_ES' ) {
    span_lang.innerHTML = 'Español';

    if( mode != '' && mode == 'md_DK' ) {
      span_mode.innerHTML = 'Modo oscuro';
    } else {
      span_mode.innerHTML = 'Modo claro';
    }
    
  } else {
    span_lang.innerHTML = 'English';

    if( mode != '' && mode == 'md_DK' ) {
      span_mode.innerHTML = 'Dark mode';
    } else {
      span_mode.innerHTML = 'Light mode';
    }
  }
}

/*
 * Dark Mode View Funtion(s)
 *
 */

// DarkMode
function DarkSide() {
  var body = document.body;
  var moon = document.getElementById('dark-mode-moon');
  var mode = document.getElementById('txt-mode');
  var logo = document.getElementById('logo');
  var imlg = document.getElementById('bttn-flags');
  var pbox = document.getElementById('parent-Box');
  var bttn = document.getElementById('btt-phoenix-form');
  var pass = document.getElementById('frgt-Pass');
  var acct = document.getElementById('crt-Acc');

  var lang      = get_Cookies( 'coo_Language' );
  var condition = pbox.classList.contains('default-Box');
  
  if( condition ){
    set_Cookies( 'coo_Mode', 'md_DK', '365' );
    
    pbox.classList.remove('default-Box');

    body.style.color = '#0eb1dc';
    moon.src = 'img/darkmode/darkside-sun-bright.png';
    logo.src = 'img/logo/logo_dark.png';
    imlg.innerHTML = '<img class=\'bttn-lng\' id=\'bttn-lng\' src=\'img/lang/lng_min_bright.png\'>';
    pbox.classList.remove('white-Box');
    pbox.classList.toggle('black-Box');
    bttn.classList.remove('btn-primary');
    bttn.classList.toggle('btn-info');
    pass.classList.remove('link-primary');
    pass.classList.toggle('link-info');
    acct.classList.toggle('link-primary');
    acct.classList.toggle('link-info');

    if ( lang != '' && lang == 'lg_CA' ) {
      mode.innerHTML = 'Mode fosc';
    } else if( lang != '' && lang == 'lg_ES' ) {
      mode.innerHTML = 'Modo oscuro';
    } else {
      mode.innerHTML = 'Dark mode';
    }
    
    
  } else {
    set_Cookies( 'coo_Mode', 'md_BT', '365' );

    pbox.classList.toggle('default-Box');

    body.style.color = '#212529';
    moon.src = 'img/darkmode/darkside-moon-dark.png';
    logo.src = 'img/logo/logo.png';
    imlg  .innerHTML = '<img class=\'bttn-lng\' id=\'bttn-lng\' src=\'img/lang/lng_min_dark.png\'>';
    pbox.classList.toggle('white-Box');
    pbox.classList.remove('black-Box');
    bttn.classList.toggle('btn-primary');
    bttn.classList.remove('btn-info');
    pass.classList.remove('link-info');
    pass.classList.toggle('link-primary');
    acct.classList.toggle('link-info');
    acct.classList.toggle('link-primary');

    if ( lang != '' && lang == 'lg_CA' ) {
      mode.innerHTML = 'Mode clar';
    } else if( lang != '' && lang == 'lg_ES' ) {
      mode.innerHTML = 'Modo claro';
    } else {
      mode.innerHTML = 'Light mode';
    }
    
  }
    
}


