const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
// mix.webpackConfig({
//     test: /\.scss$/,
//     use: [
//         'vue-style-loader',
//         'css-loader',
//         {
//             loader: 'sass-loader',
//             options: {
//                 data: `
//           @import "./sass/variables.scss";
//         `
//             }
//         }
//     ]
// });
mix.js('src/main.js', 'html/build/js')
    .sass('sass/app.scss', 'html/build/css');
