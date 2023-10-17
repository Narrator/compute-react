// @ts-check
const path = require("path");
const {
  cpSync,
  mkdirSync,
  writeFileSync,
  rmdirSync,
  existsSync,
} = require("fs");

const buildOutputDir = path.join(__dirname, "..", ".amplify-hosting");
const staticDir = path.join(buildOutputDir, "static");

if (existsSync(buildOutputDir)) {
  rmdirSync(buildOutputDir, {
    recursive: true,
  });
}

mkdirSync(staticDir, {
  recursive: true,
});
cpSync(path.join(__dirname, "..", "build"), staticDir, {
  recursive: true,
});

const deployManifest = {
  version: 1,
  framework: {
    name: "react",
    version: "18.2.0",
  },
  routes: [
    {
      path: "/*",
      target: {
        kind: "Static",
        cacheControl: "public, max-age=31536000, immutable",
      },
    },
  ],
};

writeFileSync(
  path.join(buildOutputDir, "deploy-manifest.json"),
  JSON.stringify(deployManifest)
);
