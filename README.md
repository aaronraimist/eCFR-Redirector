# CFR Redirect

A tiny static website that converts short CFR citations into direct links to that section on the https://eCFR.gov website.

By default, if no title is specified, the default is Title 14 (Aeronautics and Space).

# Examples

| Input | Result |
|-------|--------|
| `61.51` | [14 CFR §61.51](https://www.ecfr.gov/current/title-14/part-61/section-61.51) |
| `91.108(b)(1)(ii)(A)` | [14 CFR §91.108(b)(1)(ii)(A)](https://www.ecfr.gov/current/title-14/part-91/section-91.108#p-91.108(b)(1)(ii)(A)) |
| `49 CFR 821.1` | [49 CFR §821.1](https://www.ecfr.gov/current/title-49/part-821/section-821.1) |
| `12 1.1` | [12 CFR §1.1](https://www.ecfr.gov/current/title-12/part-1/section-1.1) |

# Browser Configuration

You can create a custom search engine in your browser to quickly access a CFR reference by typing `cfr <reg>` into the address bar.

## Firefox

1. Open: `about:preferences#search`
2. Scroll to **Search Shortcuts**
3. Click **Add**
4. Enter:
   - **Search engine name**: CFR
   - **URL**: `https://yourdomain.com/?%s`
   - **Keyword**: cfr

## Google Chrome

1. Open: `chrome://settings/searchEngines`
2. Click **Add**
3. Enter:
   - **Search engine**: CFR
   - **Shortcut**: cfr
   - **URL**: `https://yourdomain.com/?%s`
4. Save

## Microsoft Edge

1. Open: `edge://settings/search`
2. Click **Manage search engines**
3. Click **Add**
4. Enter:
   - **Search engine**: CFR
   - **Shortcut**: cfr
   - **URL**: `https://yourdomain.com/?%s`
