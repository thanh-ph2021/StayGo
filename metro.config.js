const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: { sourceExts, assetExts },
} = defaultConfig;

const config = {
    resolver: {
        extraNodeModules: {
            '@': path.resolve(__dirname, 'src'),
            '@Screens': path.resolve(__dirname, 'src/Screens'),
            '@Store': path.resolve(__dirname, 'src/Store'),
            '@Hooks': path.resolve(__dirname, 'src/Hooks'),
            '@Components': path.resolve(__dirname, 'src/Components'),
            '@Constants': path.resolve(__dirname, 'src/Constants'),
            '@Navigations': path.resolve(__dirname, 'src/Navigations'),
            '@Utils': path.resolve(__dirname, 'src/Utils'),
            '@Assets': path.resolve(__dirname, 'src/Assets'),
            '@Apis': path.resolve(__dirname, 'src/Apis'),
            '@Storage': path.resolve(__dirname, 'src/Storage'),
        },
    },
};

module.exports = mergeConfig(defaultConfig, config);
