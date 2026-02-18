import * as fs from "fs";
import * as path from "path";

const APP_NAME_ARG = process.argv[2];

if (!APP_NAME_ARG) {
    console.error("❌ Error: App name is required");
    console.error("Usage: npm run reset -- <app-name>");
    console.error("Example: npm run reset -- my-awesome-app");
    process.exit(1);
}

const ROOT_DIR = path.resolve(__dirname, "..");

function updatePackageJson(appName: string): void {
    const packageJsonPath = path.join(ROOT_DIR, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    packageJson.name = appName;
    packageJson.version = "1.0.0";

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
    console.log(`✅ Updated package.json: name="${appName}", version="1.0.0"`);
}

function updatePackageLockJson(appName: string): void {
    const packageLockPath = path.join(ROOT_DIR, "package-lock.json");
    
    if (!fs.existsSync(packageLockPath)) {
        console.log("⚠️  package-lock.json not found, skipping...");
        return;
    }

    const packageLock = JSON.parse(fs.readFileSync(packageLockPath, "utf-8"));

    packageLock.name = appName;
    packageLock.version = "1.0.0";
    
    if (packageLock.packages && packageLock.packages[""]) {
        packageLock.packages[""].name = appName;
        packageLock.packages[""].version = "1.0.0";
    }

    fs.writeFileSync(packageLockPath, JSON.stringify(packageLock, null, 2) + "\n");
    console.log(`✅ Updated package-lock.json: name="${appName}", version="1.0.0"`);
}

function updateAppConfig(appName: string): void {
    const appConfigPath = path.join(ROOT_DIR, "app.config.ts");
    let appConfig = fs.readFileSync(appConfigPath, "utf-8");

    const slug = appName.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const scheme = slug;

    appConfig = appConfig.replace(
        /const APP_NAME = ".*";/,
        `const APP_NAME = "${appName}";`
    );
    appConfig = appConfig.replace(
        /const SLUG = ".*";/,
        `const SLUG = "${slug}";`
    );
    appConfig = appConfig.replace(
        /const SCHEME = ".*";/,
        `const SCHEME = "${scheme}";`
    );

    fs.writeFileSync(appConfigPath, appConfig);
    console.log(`✅ Updated app.config.ts: APP_NAME="${appName}", SLUG="${slug}", SCHEME="${scheme}"`);
}

function clearChangelog(): void {
    const changelogPath = path.join(ROOT_DIR, "CHANGELOG.md");
    const changelogContent = `# Changelog

All notable changes to this project will be documented in this file.
`;
    fs.writeFileSync(changelogPath, changelogContent);
    console.log("✅ Reset CHANGELOG.md");
}

function main(): void {
    console.log(`\n🚀 Resetting project for: ${APP_NAME_ARG}\n`);

    updatePackageJson(APP_NAME_ARG);
    updatePackageLockJson(APP_NAME_ARG);
    updateAppConfig(APP_NAME_ARG);
    clearChangelog();

    console.log("\n✨ Project reset complete!\n");
    console.log("Next steps:");
    console.log("  1. Update BUNDLE_IDENTIFIER and PACKAGE_NAME in app.config.ts");
    console.log("  2. Configure your .env file");
    console.log("  3. Run: npm install");
    console.log("  4. Initialize git and push to your repository\n");
}

main();
