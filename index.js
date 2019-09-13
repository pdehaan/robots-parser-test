const axios = require("axios");
const robotsParser = require("robots-parser");

const DOMAIN = "https://private-network.firefox.com";
const robotsUri = `${DOMAIN}/robots.txt`;
const testUri = `${DOMAIN}/dist/secure-proxy.xpi`;

main({ robotsUri, testUri });

async function main(opts = {}) {
  const userAgent = "Mozilla/5.0 (compatible; Googlebot/2.1;)";
  opts = Object.assign({ userAgent }, opts);

  const robots = await fetchRobotsTxt(opts.robotsUri);
  console.log(
    `${testUri} is allowed?`,
    robots.isAllowed(opts.testUri, opts.userAgent)
  );
}

async function fetchRobotsTxt(uri) {
  const robotsTxt = await axios.get(uri);
  return robotsParser(uri, robotsTxt.data);
}
