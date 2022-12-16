import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: path.join(__dirname, "/"),

  server: {
    //open: "/index.html",
    open: "/",
    // port: 5555,
  },

  build: {
    cssCodeSplit: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        // index: path.resolve(__dirname, "src", "index.html"),
        index: path.resolve(__dirname, "index.html"),
        allelements: path.resolve(__dirname, "pages/", "all-elements.html"),
      },
      output: {
        entryFileNames: `assets/js/[name].js`,
        chunkFileNames: `assets/js/[name].js`,
        // assetFileNames: `assets/[name].[ext]`,

        assetFileNames: function (filename) {
          // console.log(filename);

          if (
            filename.name.includes(".png") ||
            filename.name.includes(".jpe?g") ||
            filename.name.includes(".jfif") ||
            filename.name.includes(".pjpeg") ||
            filename.name.includes(".pjp") ||
            filename.name.includes(".gif") ||
            filename.name.includes(".avif") ||
            filename.name.includes(".webp")
          ) {
            return `assets/img/[name].[ext]`;
          } else if (filename.name.includes(".svg")) {
            return `assets/svg/[name].[ext]`;
          } else if (filename.name.includes(".css")) {
            return `assets/css/[name].[ext]`;
          } else if (
            filename.name.includes(".eot") ||
            filename.name.includes(".ttf") ||
            filename.name.includes(".otf") ||
            filename.name.includes(".woff2?")
          ) {
            return `assets/fonts/[name].[ext]`;
          } else {
            return `assets/[ext]/[name].[ext]`;
          }

          /* if (filename.name.includes(".css")) {
            return `assets/css/[name].[ext]`;
          } else {
            return `assets/[ext]/[name].[ext]`;
          } */
        },
      },
    },
    minify: false,
  },
});
