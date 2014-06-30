function injected_main() {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
    document.getElementsByTagName("head")[0].appendChild(script);
    if (window.jQuery) window.jQuery.noConflict();


    window.aaaCaptchaCode = '3bEq';
    window.isBuy = 0;
    try{document.domain = "aliexpress.com"; } catch(e) {}
//  window.islog = true;
//    switch ('login.alibaba.com/') {
    switch (location.host + location.pathname) {
    case 'gaga.aliexpress.com/':
      window.aaaFrames = Array();
      window.aaaTimes = Array();
      window.aaaTime = null;
      window.setTimeout(init, 10);
      break;
      case 1:
    case 'login.alibaba.com/':
    case 'login.alibaba.com/buyer.htm':
    case 'login.aliexpress.com/':
    case 'login.aliexpress.com/buyer.htm':
      window.setTimeout(login, 100);
      break;
    case 'escrow.alibaba.com/order/business_order_buyer_list.htm':
      window.setTimeout(refresh, 100000);
      break;
    case 'gaga.aliexpress.com/order/create_wholesale_order.htm':
    case 'gaga.aliexpress.com/order/confirm_order.htm':
      window.setTimeout("window.scrollTo(200,800);", 10);
      window.setTimeout("window.scrollTo(200,800);", 30);
      window.setTimeout("window.scrollTo(200,800);", 80);
      window.setTimeout("window.scrollTo(200,800);", 150);
      window.setTimeout(orderConfirm, 10);
      break;
    default:
      document.body.style.background = 'azure';
      window.scrollTo(0,480);
      if (window.parent.isBuy == 0)
        window.setTimeout(checkTimer, 10000);
      break;
  }
}

function init() {
  var div = document.createElement('div');
  div.innerHTML = 'captcha code <img id="aaaCaptcha" onclick="updateCaptcha();" /> <input type=text onchange="window.aaaCaptchaCode = this.value"/>';
  div.style.background = 'azure';
  div.style.padding = '10px';
  div.style.border = '2px solid blue';
  document.body.appendChild(div);
  window.setTimeout(updateCaptcha, 100);

  for (var i = 0; i < 4; i++) {
    fr = document.createElement('iframe');
    fr.style.float = 'left';
    fr.style.width = '620px';
    fr.style.height = '400px';
    fr.name = 'aaaFrame' + i;
    fr.onload = injectToFrame;
    window.aaaFrames[i] = fr;
    document.body.appendChild(fr);
  }
  var a = document.querySelector('a[href="http://gaga.aliexpress.com/250539014-1460158594-detail.html"]');
  if (!a || a.offsetWidth <= 0 || a.offsetHeight <= 0) a = document.querySelector('a[href="http://gaga.aliexpress.com/250539008-1466796938-detail.html"]');
  //if (!a || a.offsetWidth <= 0 || a.offsetHeight <= 0) a = document.querySelector('a[href=""]');

  if(a) {
    for (var i = 0; i < window.aaaFrames.length; i++) {
      window.aaaFrames[i].onload = injectToFrame;
      window.aaaFrames[i].src = a.href;
    };
  }
}

function updateCaptcha() {
  var img = document.querySelector('#aaaCaptcha');
  var sessionID = document.cookie.substr(document.cookie.indexOf('acs_usuc_t=acs_rt=')+18,32);
  img.src='http://checktoken1.alibaba.co/service/checkcode?sessionID='+sessionID+'&type=mark&t=' + Math.random();
}

function injectToFrame(e) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
    e.currentTarget.contentDocument.getElementsByTagName("head")[0].appendChild(script);
    jQuery.noConflict();

  var data = document.querySelector('#injected_main').innerHTML;
  e.currentTarget.contentWindow.id = window.aaaFrames.indexOf(e.currentTarget);
    script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.innerHTML = data;
    e.currentTarget.contentDocument.getElementsByTagName("head")[0].appendChild(script);
    e.currentTarget.contentWindow.injected_main();
  document.domain = "aliexpress.com";
}

function login() {
  var l = document.querySelector('#xloginPassportId');
  var p = document.querySelector('#xloginPasswordId');
  var b = document.querySelector('#signInButton');
  l = document.getElementById('xloginPassportId');
  p = document.getElementById('xloginPasswordId');
  b = document.getElementById('signInButton');
  console.log(l, p, b);
  if (l && p && b) {
    l.value = 'login';
    p.value = 'password';
    b.click();
  }
}

function refresh() {
  window.location.reload();
}

function checkTimer() {
  window.scrollTo(0,480);
  document.domain = "aliexpress.com";
  var h = document.getElementsByClassName('hour')[0].innerText - 0;
  var m = document.getElementsByClassName('minute')[0].innerText - 0;
  var s = document.getElementsByClassName('second')[0].innerText - 0;
  var t = h*3600+m*60+s;
  if (!window.aaaLocalTime && t>0) {
    log('t'+window.id+':' + t);
    window.aaaLocalTime = t;
  } else {
    log('time'+window.id+': '+h+':'+m+':'+s+' t:'+t );
    if (window.aaaLocalTime == t+1 && t>0) {
      window.targetTime = Math.floor(new Date().getTime()/10 + t*100);
      log('2t'+window.id+':' + t);
      log('target'+window.id+':' + t);
      window.aaaLocalTime = 0;
      window.setTimeout(checkTimer, 100000);
      window.clearInterval(window.sendParentTimeTnterval);
      window.sendParentTimeTnterval = window.setInterval(sendParentTime, 30000);
      return;
    }
  }
  window.setTimeout(checkTimer, 10);
}

function sendParentTime() {
  window.scrollTo(0,480);
  document.domain = "aliexpress.com";
  window.parent.aaaTimes[window.id] = window.targetTime;
  var minT = Math.min.apply(Math, window.parent.aaaTimes);
  log('aa'+window.id+': ' + minT + ' tt:' + window.targetTime);
  if (minT != 0) {
    if (window.targetTime > minT+2) {
      log('refresh'+window.id+'');
      window.setTimeout(refresh, 10);
    }
  }
  document.body.style.background = 'pink';
  if (Math.floor(window.targetTime - new Date().getTime()/10) > 3000) {
    document.body.style.background = 'white';
  } else {
    window.setInterval(click123, 30);
    window.clearInterval(window.sendParentTimeTnterval);
  }
}

function click123() {
  var b = document.querySelector('#buy-submit');
  if (b.className == "buy-def buy-now" && window.parent.isBuy < 3) {
    window.parent.isBuy += 1;
    var form = document.querySelector('#gaga-creat-order');
    form.target = '_blank';
    var inp = document.createElement('input');
    inp.type = 'hidden';
    inp.value = window.parent.aaaCaptchaCode;
    inp.name = 'aaaCaptchaCode';
    form.appendChild(inp);
    b.click();
    window.setTimeout(click456, 1);
    //window.setTimeout(click456, 10);
    //window.setTimeout(click456, 20);
  }
}

function click456() {
  window.parent.isBuy += 1;
  try {
    var a = document.querySelector('a.attr-checkbox');
    var isVisible = a.offsetWidth > 0 || a.offsetHeight > 0;
    if (isVisible) {
      jQuery(jQuery('#sku-choose-box').find('a.attr-checkbox').get().reverse()).each(function() {this.click();})
      window.setTimeout(function() {
        jQuery(jQuery('#sku-sku2').find('a.sku-value').get().reverse()).each(function() {this.click();})
        window.setTimeout(function() {
          //jQuery(jQuery('#sku-sku2').find('a.attr-checkbox').get()/*.reverse()*/).each(function() {this.click();})
          //jQuery(jQuery('#sku-sku3').find('a.attr-checkbox').get().reverse()).each(function() {this.click();})
          jQuery(jQuery('#sku-sku3').find('a.sku-value').get().reverse()).each(function() {this.click();})
          window.setTimeout(function() {
            jQuery(jQuery('#sku-color').find('a.sku-value').get().reverse()).each(function() {this.click();})
          },1);
        },1);
      },1);
      window.setInterval(click789, 10);
      window.setTimeout(click789, 10);
      window.setTimeout(click789, 20);
       return;
    }
  } catch(e) {}
}
function click789() {
  document.querySelector('#j-sku-choose-confirm-btn').click();
}
function orderConfirm() {
  document.domain = "aliexpress.com";
  var err = document.querySelector('.error-box-max');
  if (!!err && err.innerText.indexOf('exist') != -1) refresh();
  document.querySelector('#captcha-input').focus();
  document.querySelector('#captcha-input').value = window.location.search.substr(window.location.search.indexOf('aaaCaptchaCode=')+15,4);;
  document.querySelector('#place-order-btn').click();
}

function log(o) {
  if (window.islog)
    console.log(o);
}