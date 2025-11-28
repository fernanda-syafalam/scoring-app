const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js")
    .js("resources/js/scoringJuri.js", "public/js")
    .js("resources/js/scoringDewan.js", "public/js")
    .js("resources/js/scoreUpdate.js", "public/js")
    .js("resources/js/operator/index.js", "public/js/operator.js")
    .js("resources/js/ketuaPertandingan.js", "public/js")
    .js(
        "resources/js/drop-verification/index.js",
        "public/js/dropVerification.js"
    )
    .js("resources/js/papanScore.js", "public/js")
    .js("resources/js/winnerModal.js", "public/js")
    .js("resources/js/wmpConfirmationModal.js", "public/js")
    .js("resources/js/library/DewanFunc.js", "public/js/library")
    .js("resources/js/library/JuriFunc.js", "public/js/library")
    .js("resources/js/library/LogoutFunc.js", "public/js/library")
    .js("resources/js/library/Time.js", "public/js/library")
    .postCss("resources/css/app.css", "public/css", [
        //
    ])
    .sourceMaps();

mix.options({
    hmrOptions: {
        host: "localhost",
        port: 8080,
    },
});
