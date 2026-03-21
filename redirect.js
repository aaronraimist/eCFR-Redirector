(function () {
  "use strict";

  const USAGE_MESSAGE = "Usage: ?61.51(g)";
  const INVALID_MESSAGE = "Invalid CFR format.";

  function buildTargetUrlFromSearch(search) {
    const raw = (search || "").replace(/^\?/, "");
    if (!raw) {
      return { error: USAGE_MESSAGE };
    }

    const params = raw.split("&");
    let debugMode = false;
    let query = "";

    for (const p of params) {
      const decoded = decodeURIComponent(p).trim();
      if (decoded.toLowerCase() === "debug") {
        debugMode = true;
      } else if (query === "" && p.trim() !== "") {
        query = decoded;
      }
    }

    if (!query) {
      return { error: USAGE_MESSAGE };
    }

    query = query.replace(/^cfr\s+/i, "");

    let title = 14; // default
    let part;
    let section;
    let paragraph = "";

    const explicitTitleMatch = query.match(/^(\d+)\s*(?:cfr\s+|\s+)/i);
    if (explicitTitleMatch) {
      title = explicitTitleMatch[1];
      query = query.replace(/^(\d+)\s*(?:cfr\s+|\s+)/i, "");
    }

    const paragraphMatch = query.match(/(\(.*\))$/);
    if (paragraphMatch) {
      paragraph = paragraphMatch[1];
      query = query.replace(/(\(.*\))$/, "");
    }

    const parts = query.split(".");
    part = parts[0];
    section = parts[1];

    if (!part) {
      return { error: INVALID_MESSAGE };
    }

    let url = `https://www.ecfr.gov/current/title-${title}/part-${part}`;

    if (section) {
      url += `/section-${part}.${section}`;
    }

    if (paragraph && section) {
      url += `#p-${part}.${section}${paragraph}`;
    }

    return { url, debugMode };
  }

  function redirect() {
    const result = buildTargetUrlFromSearch(window.location.search);

    if (result.error) {
      document.body.innerHTML = result.error;
      return;
    }

    if (result.debugMode) {
      document.body.innerHTML = `
        <p>Target URL: <a href="${result.url}">${result.url}</a></p>
      `;
    } else {
      window.location.replace(result.url);
    }
  }

  if (typeof window !== "undefined") {
    window.eCFRRedirector = { buildTargetUrlFromSearch, redirect };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { buildTargetUrlFromSearch, USAGE_MESSAGE, INVALID_MESSAGE };
  }
})();
