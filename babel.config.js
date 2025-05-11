module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@Screens': './src/Screens',
          '@Store': './src/Store',
          '@Hooks': './src/Hooks',
          '@Components': './src/Components',
          '@Constants': './src/Constants',
          '@Navigations': './src/Navigations',
          '@Utils': './src/Utils',
          '@Assets': './src/Assets',
          '@Apis': './src/Apis',
          '@Storage': './src/Storage',
          '@Models': './src/Models',
          '@Services': './src/Services',
        },
      },
    ],
    "react-native-reanimated/plugin"
  ],
};
