let htmlmin = require("html-minifier");
let markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {

    // Rendu du markdown
    let options = {
        html: true,
        typographer: true,
        linkify: true,
    };
    eleventyConfig.setLibrary("md", markdownIt(options));

    // Minification des pages
    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {

        if (outputPath && outputPath.endsWith(".html")) {
            let minified = htmlmin.minify(content, {
                minifyCSS: true,
                minifyJS: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                decodeEntities: true,
                preserveLineBreaks: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            });
            return minified;
        }

        return content;
    });

    eleventyConfig.addPassthroughCopy("_headers");

    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
};