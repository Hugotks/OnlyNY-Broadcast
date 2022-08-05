/*
* Broadcast Theme
*
* Use this file to add custom Javascript to Broadcast.  Keeping your custom
* Javascript in this fill will make it easier to update Broadcast. In order
* to use this file you will need to open layout/theme.liquid and uncomment
* the custom.js script import line near the bottom of the file.
*/


(function() {
  // Add custom code below this line
  const size_variants = document.querySelectorAll('.product__form .product__selectors .radio__fieldset .radio__button input');
  size_variants.forEach((el) => {
    document.querySelectorAll('.product__selectors .variants_id_p option').forEach((e) => {
      if (e.dataset.option1 == el.value && e.value == '1') {
        el.nextElementSibling.classList.add('size_out_p');
      }
    });
  });  

  const layout_col2 = document.querySelector('[data-layout-column2]'), 
        layout_col4 = document.querySelector('[data-layout-column4]');
  var product_items;

  if (layout_col2) {
    layout_col2.addEventListener('click', (e) => {
      product_items = document.querySelectorAll('.product-grid .product-item');
      localStorage.setItem('productGrid', '2');
      layout_col4.classList.remove('active');
      layout_col2.classList.add('active');
      product_items.forEach((el) => {
        el.classList.replace('large-up--one-quarter', 'large-up--one-half');
      });
    });
    layout_col4.addEventListener('click', (el) => {
      product_items = document.querySelectorAll('.product-grid .product-item');
      localStorage.setItem('productGrid', '4');
      layout_col2.classList.remove('active');
      layout_col4.classList.add('active');
      product_items.forEach((el) => {
        el.classList.replace('large-up--one-half', 'large-up--one-quarter');
      });
    });
  }

  // Geolocation
  var country_code;
  const EUlists = ["BE", "BG", "CZ", "DK", "DE", "EE", "IE", "EL", "ES", "FR", "HR", "IT", "CY", "LV", "LT", "LU", "HU", "MT", "NL", "GE", "MD", "UA", "RU",
                    "AT", "PL", "PT", "RO", "SI", "SK", "FI", "SE", "UK", "IS", "LI", "CH", "NO", "ME", "MK", "AL", "RS", "TR", "BA", "XK", "AM", "AZ", "BY", "MD" ];
    
  $.get('//www.cloudflare.com/cdn-cgi/trace', function(data) {
    country_code = data.replace(/(\r\n|\n|\r)/gm,"").split('loc=');
    country_code = country_code[1].split('tls=');
    country_code = country_code[0];   
  });
  
  var waitForCode = () => {
    var tmp = country_code;
    if (!tmp) {
      setTimeout(waitForCode, 100);
      return;
    }
    
    if (document.querySelector('[data-product-form]')) {
      if (EUlists.includes(country_code)) {
        document.querySelector('[data-EU-UK-message]').classList.remove('hidden');
      }
      else {
        document.querySelector('[data-EU-UK-message]').classList.add('hidden');
      }
    }
  }
  
  waitForCode();

  window.onload = () => {
    localStorage.setItem('productGrid', '4');

    if (document.querySelector('input[name="options[Color]"]')) {
      const default_color = document.querySelector('input[name="options[Color]"]:checked').value;
      document.querySelectorAll('.selector-wrapper .radio__button label').forEach((el) => {
        document.querySelectorAll('.variants_id_p.Size option').forEach((e) => {
          if (e.dataset.option1 == default_color && e.dataset.option2 == el.dataset.value && e.value == '1') {
            el.classList.add('stock-out');
          }
        });
      });

      document.querySelectorAll('.selector-wrapper .image__button label').forEach((el) => {
        el.addEventListener('click', (e) => {
          const color = el.dataset.swatch;
          document.querySelectorAll('.selector-wrapper .radio__button label').forEach((ele) => {
            ele.classList.remove('stock-out');
            document.querySelectorAll('.variants_id_p.Size option').forEach((ell) => {
              if (ell.dataset.option1 == color && ell.dataset.option2 == ele.dataset.value && ell.value == '1') {
                ele.classList.add('stock-out');
              }
            });
          });
        });
      });
    }
  }

  // ^^ Keep your scripts inside this IIFE function call to 
  // avoid leaking your variables into the global scope.
})();
