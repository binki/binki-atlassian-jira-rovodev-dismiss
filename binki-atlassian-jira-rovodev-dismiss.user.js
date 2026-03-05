// ==UserScript==
// @name binki-atlassian-jira-rovodev-dismiss
// @version 1.0.0
// @homepageURL https://github.com/binki/binki-atlassian-jira-rovodev-dismiss
// @match https://*.atlassian.net/*
// @require https://github.com/binki/binki-userscript-when-element-changed-async/raw/88cf57674ab8fcaa0e86bdf5209342ec7780739a/binki-userscript-when-element-changed-async.js
// @require https://github.com/binki/binki-userscript-when-element-query-selector-async/raw/0a9c204bdc304a9e82f1c31d090fdfdf7b554930/binki-userscript-when-element-query-selector-async.js
// ==/UserScript==

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
