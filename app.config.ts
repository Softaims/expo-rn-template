import { ConfigContext, ExpoConfig } from "expo/config";
import { version } from "./package.json";

/**
 * Calculate build number from semantic version
 * Format: MMNNPP0000 (Major 2 digits + Minor 2 digits + Patch 2 digits + 0000)
 * Example: 7.17.10 → 717100000
 * Example: 1.2.3 → 102030000
 */
const calculateBuildNumber = (ver: string): number => {
    // Remove prerelease suffix if present (e.g., 1.2.3-dev.1 -> 1.2.3)
    const cleanVersion = ver.replace(/-.*$/, '');
    const [major, minor, patch] = cleanVersion.split('.').map(Number);

    // Format: M*100000000 + MM*1000000 + PP*10000
    // Or simpler: MMNNPP0000
    return major * 100000000 + minor * 1000000 + patch * 10000;
};

// App configuration
const APP_NAME = "expo-rn-template";
const SLUG = "expo-rn-template";
const SCHEME = "expo-rn-template";
const BUNDLE_IDENTIFIER = "com.expo.rn.template.app";
const PACKAGE_NAME = "com.expo.rn.template.app";

// EAS configuration
const EAS_PROJECT_ID = "";
const EAS_PROJECT_OWNER = ""; // Applicable if project is under an EAS organization (not required for personal projects)

export default ({ config }: ConfigContext): ExpoConfig => {
    const buildNumber = calculateBuildNumber(version);
    console.log(`⚒️ Building: [NAME: ${APP_NAME}, VERSION: ${version}, BUILD: ${buildNumber}, ENV: ${process.env.APP_ENV || "unset"}]`);

    return {
        ...config,
        name: APP_NAME,
        slug: SLUG,
        version,
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: SCHEME,
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
            supportsTablet: true,
            bundleIdentifier: BUNDLE_IDENTIFIER,
            buildNumber: String(buildNumber),
        },
        android: {
            adaptiveIcon: {
                backgroundColor: "#E6F4FE",
                foregroundImage: "./assets/images/android-icon-foreground.png",
                backgroundImage: "./assets/images/android-icon-background.png",
                monochromeImage: "./assets/images/android-icon-monochrome.png",
            },
            edgeToEdgeEnabled: true,
            package: PACKAGE_NAME,
            versionCode: buildNumber,
        },
        web: {
            output: "static",
            favicon: "./assets/images/favicon.png",
            bundler: "metro",
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    image: "./assets/images/splash-icon.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#ffffff",
                    dark: {
                        backgroundColor: "#000000",
                    },
                },
            ],
            [
                "@sentry/react-native/expo",
                {
                    url: "https://sentry.io/",
                    project: "react-native",
                    organization: "thesoftaims",
                },
            ],
        ],
        experiments: {
            typedRoutes: true,
            reactCompiler: true,
        },
    };
};
