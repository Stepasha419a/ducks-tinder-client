const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const semver = require('semver');
const os = require('process');

const packages = fs.readdirSync('packages');

packages.map((package) => {
  try {
    publishPackage(package);
  } catch (error) {
    console.error(`package ${package} error:`, error);
    os.exit(1);
  }
});

function publishPackage(package) {
  const packageRootPath = path.resolve('packages', package);
  const packageJsonPath = path.resolve(packageRootPath, 'package.json');

  const res = fs.readFileSync(packageJsonPath);
  const packageContent = JSON.parse(res);

  const packageName = packageContent.name;

  const version = packageContent.version;
  const publishedVersion = execSync(`npm view ${packageName} version`, {
    encoding: 'utf-8',
  }).trim();

  if (semver.compare(version, publishedVersion) < 1) {
    console.log(`${packageName} - has no changes`);

    return;
  }

  console.log(`${packageName} - publish version: ${version}`);

  execSync(`npm publish ${packageRootPath}`);

  console.log(`${packageName} - finished`);
}
