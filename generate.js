const fs = require("fs");
const path = require("path");
const util = require("util");
const postcss = require("postcss");
const _ = require("lodash");
const pkg = require("./package.json");
const defaultRules = require("./defaultRules");

const buildStylesMap = () => {
  const css = fs.readFileSync(`./tachyons.css`);
  const root = postcss.parse(css);
  const ruleSet = {};

  root.walkRules(rule => {
    if (
      rule.parent.parent ||
      rule.selector.includes(":hover") ||
      rule.selector.includes(":focus")
    ) {
      return;
    }

    const declarations = rule.nodes
      .map(n => {
        if (n.type === "decl") {
          return `${n.prop}: ${n.value};`;
        }
      })
      .join("");

    const sanitizedSelector = _.camelCase(rule.selector);
    return Object.assign(ruleSet, defaultRules, {
      [sanitizedSelector]: declarations
    });
  });

  writeFile(ruleSet);
};

const writeFile = object =>
  fs.writeFile(
    `./${pkg.main}`,
    `export default ${util.inspect(object)}`,
    err => {
      if (err) {
        console.error(err);
      }
      console.log("Modules generated successfully.");
    }
  );

buildStylesMap();
