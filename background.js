const TITLE_APPLY = "Put on blindfold";
const TITLE_REMOVE = "Take off blindfold";
const COOKIE_NAME = "mma-blindfold";

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

function cookieUpdate() {
  getActiveTab().then((tabs) => {
    // get any previously set cookie for the current tab 
    let gettingCookies = browser.cookies.get({
      url: tabs[0].url,
      name: COOKIE_NAME
    });
    gettingCookies.then((cookie) => {
      if (cookie) {
        browser.tabs.sendMessage(tabs[0].id, cookie.value);
        let blind = (cookie.value==="yes");
        browser.pageAction.setIcon({tabId: tabs[0].id, path: blind ? "icons/on.svg" : "icons/off.svg"});
        browser.pageAction.setTitle({tabId: tabs[0].id, title: blind ? TITLE_REMOVE : TITLE_APPLY});
      }
    });
  }); 
}

// update when the tab is updated
browser.tabs.onUpdated.addListener(cookieUpdate);
// update when the tab is activated
browser.tabs.onActivated.addListener(cookieUpdate);

function toggleBlindfold(tab) {
  getActiveTab().then((tabs) => {
    let gettingCookies = browser.cookies.get({
      url: tabs[0].url,
      name: COOKIE_NAME
    });
    gettingCookies.then((cookie) => {
      let blind = false;
      if (cookie) {blind = (cookie.value == "yes");}
      browser.cookies.set({
        url: tabs[0].url,
        name: COOKIE_NAME,
        value: blind ? "no" : "yes"
      });
      cookieUpdate();
    });
  });
}

function initializePageAction(tab) {
  if (tab.url.includes("wikipedia.org")) {
    browser.pageAction.show(tab.id);
  }
}

let gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

browser.pageAction.onClicked.addListener(toggleBlindfold);
