// ==UserScript==
// @name binki-atlassian-jira-rovodev-dismiss
// @version 1.0.0
// @homepageURL https://github.com/binki/binki-atlassian-jira-rovodev-dismiss
// @match https://*.atlassian.net/*
// @require https://github.com/binki/binki-userscript-delay-async/raw/252c301cdbd21eb41fa0227c49cd53dc5a6d1e58/binki-userscript-delay-async.js
// @require https://github.com/binki/binki-userscript-when-element-changed-async/raw/88cf57674ab8fcaa0e86bdf5209342ec7780739a/binki-userscript-when-element-changed-async.js
// @require https://github.com/binki/binki-userscript-when-element-query-selector-async/raw/0a9c204bdc304a9e82f1c31d090fdfdf7b554930/binki-userscript-when-element-query-selector-async.js
// ==/UserScript==

// Old version. Not sure if this is still popping up for people—if it is, we want to leave this functioning!
(async () => {
  const atlasKitPortalContainer = await whenElementQuerySelectorAsync(document.body, '.atlaskit-portal-container');
  while (true) {
    const rovodevNotificationDismissButton = await whenElementQuerySelectorAsync(atlasKitPortalContainer, 'div:has(> a[href$="/rovodev"]) > button');
    rovodevNotificationDismissButton.click();
    // Wait for the element to disappear.
    while (document.contains(rovodevNotificationDismissButton)) {
      await whenElementChangedAsync(document.body);
    }
  }
})();

// Version that shows up in the left navigation bar (see #1).
(async () => {
  const sideNavRecommendations = await whenElementQuerySelectorAsync(document.body, 'div[data-testid="side-nav-recommendation.jira-side-nav"]');
  while (true) {
    const optionsButton = await whenElementQuerySelectorAsync(sideNavRecommendations, 'div[data-testid="jira-side-nav-message"]:has(a[href^="/rovodev"]) button[data-testid="post-office-ad-controls-dropdown--trigger"]');
    optionsButton.click();
    const notInterestedButton = await whenElementQuerySelectorAsync(document.body, 'button[data-testid="ad-controls-dropdown-not-interested"]');
    // Wait for things to load or settle?
    notInterestedButton.click();
    // Wait for the element to disappear.
    while (document.contains(optionsButton)) {
      await whenElementChangedAsync(document.body);
    }
  }
})();
