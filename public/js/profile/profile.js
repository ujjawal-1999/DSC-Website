const tabEl = document.querySelectorAll(".tab-buttons");

// Initialize A11yTab on each element
// All options are shown
for (let i = 0; i < tabEl.length; i++) {
  const tabs = new A11yTab({
    selector: tabEl[i],
    tabPanelFocus: "tab-panel--is-active",
    tabPanelBlur: "tab-panel--is-disabled",
    tabFocus: "tab-button--is-active",
    tabBlur: "tab-button--is-disabled",
  });
  tabs.init();
}
