const axios = require("axios");
const robotsParser = require("robots-parser");

const DOMAIN = process.env.DOMAIN || "https://private-network.firefox.com";
const robotsUri = process.env.ROBOTS_URI || getUri("/robots.txt", DOMAIN);
const testUri = process.env.TEST_URI || getUri("/dist/secure-proxy.xpi", DOMAIN);

main({ robotsUri, testUri });

async function main(opts = {}) {
  const userAgent = process.env.USER_AGENT || "Mozilla/5.0 (compatible; Googlebot/2.1;)";
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

function getUri(uri, domain=DOMAIN) {
  return new URL(uri, domain).href;
}
