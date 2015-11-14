var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var url = window.location.href
    path = window.location.pathname;

if(isMobile.any()){
    if(path == '/thebright-expo')
        window.location = "http://thebright.in.th/mobile/expo-detail";
    if(path == '/paid-complete')
      window.location = "http://thebright.in.th/mobile/m-complete";
    else
        window.location = "http://thebright.in.th/mobile";
}
