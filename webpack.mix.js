const mix = require('laravel-mix');

mix.autoload({ jquery: ['$', 'window.jQuery'] });

mix.options({
    publicPath: 'html',
    processCssUrls: false
});

mix.webpackConfig({
    output: {
        publicPath: '/html',
    }
});


mix.copy('src/assets', 'html/assets');
mix.copy('db/img', 'html/assets/img');
mix.copy('node_modules/font-awesome/fonts', 'html/node_modules/font-awesome/fonts');


mix.sass('src/main.scss', 'html/build/css')
    .js('src/main.js', 'html/build/js').sourceMaps()