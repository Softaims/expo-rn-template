const { withStorybook } = require('@storybook/react-native/metro/withStorybook');
const { withNativeWind } = require('nativewind/metro');
const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname);

module.exports = withStorybook(withNativeWind(config, { input: './global.css' }));