const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

config.transformer.minifierConfig = {
  mangle: {
    toplevel: true, // Minimiza los nombres de las variables a nivel superior
  },
  keep_classnames: false, // No mantiene los nombres de clases en el código final
  keep_fnames: false, // No mantiene los nombres de funciones en el código final
  output: {
    comments: false, // Elimina los comentarios del código final
  },
};

module.exports = withNativeWind(config, { input: "./src/global.css" });
