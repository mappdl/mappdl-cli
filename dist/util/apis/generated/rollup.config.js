/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import multiEntry from "@rollup/plugin-multi-entry";
import json from "@rollup/plugin-json";

import nodeBuiltins from "builtin-modules";

// #region Warning Handler

/**
 * A function that can determine whether a rollup warning should be ignored. If
 * the function returns `true`, then the warning will not be displayed.
 */

function ignoreNiseSinonEval(warning) {
  return (
    warning.code === "EVAL" &&
    warning.id &&
      (warning.id.includes("node_modules/nise") ||
        warning.id.includes("node_modules/sinon")) === true
  );
}

function ignoreChaiCircularDependency(warning) {
  return (
    warning.code === "CIRCULAR_DEPENDENCY" &&
    warning.importer && warning.importer.includes("node_modules/chai") === true
  );
}

const warningInhibitors = [ignoreChaiCircularDependency, ignoreNiseSinonEval];

/**
 * Construct a warning handler for the shared rollup configuration
 * that ignores certain warnings that are not relevant to testing.
 */
function makeOnWarnForTesting() {
  return (warning, warn) => {
    // If every inhibitor returns false (i.e. no inhibitors), then show the warning
    if (warningInhibitors.every((inhib) => !inhib(warning))) {
      warn(warning);
    }
  };
}

// #endregion

function makeBrowserTestConfig() {
  const config = {
    input: {
      include: ["dist-esm/test/**/*.spec.js"],
      exclude: ["dist-esm/test/**/node/**"]
    },
    output: {
      file: `dist-test/index.browser.js`,
      format: "umd",
      sourcemap: true
    },
    preserveSymlinks: false,
    plugins: [
      multiEntry({ exports: false }),
      nodeResolve({
        mainFields: ["module", "browser"]
      }),
      cjs(),
      json(),
      sourcemaps()
      //viz({ filename: "dist-test/browser-stats.html", sourcemap: true })
    ],
    onwarn: makeOnWarnForTesting(),
    // Disable tree-shaking of test code.  In rollup-plugin-node-resolve@5.0.0,
    // rollup started respecting the "sideEffects" field in package.json.  Since
    // our package.json sets "sideEffects=false", this also applies to test
    // code, which causes all tests to be removed by tree-shaking.
    treeshake: false
  };

  return config;
}

const defaultConfigurationOptions = {
  disableBrowserBundle: false
};

export function makeConfig(pkg, options) {
  options = {
    ...defaultConfigurationOptions,
    ...(options || {})
  };

  const baseConfig = {
    // Use the package's module field if it has one
    input: pkg["module"] || "dist-esm/src/index.js",
    external: [
      ...nodeBuiltins,
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.devDependencies)
    ],
    output: { file: "dist/index.js", format: "cjs", sourcemap: true },
    preserveSymlinks: false,
    plugins: [sourcemaps(), nodeResolve()]
  };

  const config = [baseConfig];

  if (!options.disableBrowserBundle) {
    config.push(makeBrowserTestConfig());
  }

  return config;
}

export default makeConfig(require("./package.json"));
