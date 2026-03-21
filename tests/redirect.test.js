const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildTargetUrlFromSearch,
  USAGE_MESSAGE,
  INVALID_MESSAGE,
} = require('../redirect');

function expectUrl(search, expectedUrl) {
  const result = buildTargetUrlFromSearch(search);
  assert.equal(result.error, undefined);
  assert.equal(result.url, expectedUrl);
}

test('returns usage message when no search is provided', () => {
  const result = buildTargetUrlFromSearch('');
  assert.equal(result.error, USAGE_MESSAGE);
});

test('returns usage message when only debug is provided', () => {
  const result = buildTargetUrlFromSearch('?debug');
  assert.equal(result.error, USAGE_MESSAGE);
});

test('default title with part and section', () => {
  expectUrl(
    '?61.51',
    'https://www.ecfr.gov/current/title-14/part-61/section-61.51'
  );
});

test('explicit title with CFR keyword, part, and section - 821.1', () => {
  expectUrl(
    '?49 CFR 821.1',
    'https://www.ecfr.gov/current/title-49/part-821/section-821.1'
  );
});

test('explicit title with CFR keyword, part, and section - 91.1707', () => {
  expectUrl(
    '?14 CFR 91.1707',
    'https://www.ecfr.gov/current/title-14/part-91/section-91.1707'
  );
});

test('explicit title, part, and section without CFR keyword', () => {
  expectUrl(
    '?12 1.1',
    'https://www.ecfr.gov/current/title-12/part-1/section-1.1'
  );
});

test('leading CFR keyword is removed from query', () => {
  expectUrl(
    '?cfr 119.1',
    'https://www.ecfr.gov/current/title-14/part-119/section-119.1'
  );
});

test('anchors are added when subparagraph is present', () => {
  expectUrl(
    '?61.51(g)(2)',
    'https://www.ecfr.gov/current/title-14/part-61/section-61.51#p-61.51(g)(2)'
  );
});

test('full part - defaults to 14 CFR', () => {
  expectUrl(
    '?125',
    'https://www.ecfr.gov/current/title-14/part-125'
  );
});

test('full part - explicit title with CFR', () => {
  expectUrl(
    '?49 CFR 830',
    'https://www.ecfr.gov/current/title-49/part-830'
  );
});

test('full part - explicit title without CFR', () => {
  expectUrl(
    '?49 821',
    'https://www.ecfr.gov/current/title-49/part-821'
  );
});

test('full part - explicit 14 CFR title without CFR', () => {
  expectUrl(
    '?14 129',
    'https://www.ecfr.gov/current/title-14/part-129'
  );
});

test('explicit title with CFR keyword using + encoding', () => {
  expectUrl(
    '?14+CFR+129.1',
    'https://www.ecfr.gov/current/title-14/part-129/section-129.1'
  );
});

test('explicit title with CFR keyword using %2B encoding', () => {
  expectUrl(
    '?14%2BCFR%2B129.1',
    'https://www.ecfr.gov/current/title-14/part-129/section-129.1'
  );
});

test('debug mode', () => {
  const result = buildTargetUrlFromSearch('?61.51&debug');
  assert.equal(result.debugMode, true);
  assert.equal(
    result.url,
    'https://www.ecfr.gov/current/title-14/part-61/section-61.51'
  );
});

test('invalid CFR format when part is missing', () => {
  const result = buildTargetUrlFromSearch('?.1');
  assert.equal(result.error, INVALID_MESSAGE);
});
