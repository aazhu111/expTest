require.config({
    baseUrl: Root_File+'asset/scripts/',
    waitSeconds: 600,
    urlArgs: "bust=v20170421",
    paths: {
        'jquery': '../bower_components/jquery/jquery',
        'clipboard': '../bower_components/clipboard/clipboard.min',
    },
    map: {
        '*': {
            'css': '../bower_components/require-css/css'
        }
    },
    shim: {
    }
});


require(['common', 'clipboard'],function(common, Clipboard){
    window['Clipboard'] = Clipboard;
});