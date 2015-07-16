/* global platform tabalanche cre */

var tabGroupContainer = document.getElementById('tab-groups');

var tabGroupElems = new Map();

var templateTabIcon = cre('img.tabicon');
var templateTabLink = cre('a.tablink');
var templateTabListItem = cre('li.tablist-item');

function createTabListItem(tab) {
  var tabIcon = cre(templateTabIcon, {src: tab.icon ||
    platform.faviconPath(tab.url)});

  var tabLink = cre(templateTabLink, {href: tab.url},
    [tabIcon, ' ' + tab.title]);

  return cre(templateTabListItem, [tabLink]);
}

var templateTabGroupContainer = cre('div.tabgroup');
var templateTabList = cre('ul.tablist');

function createTabGroupDiv(tabGroup) {
  var tabListItems = tabGroup.tabs.map(createTabListItem);

  var name = cre('h2', [tabGroup.name]);
  var list = cre(templateTabList, tabListItems);

  var container = cre(templateTabGroupContainer, [name, list]);

  tabGroupContainer.appendChild(container);
  tabGroupElems.set(tabGroup._id, {
    container: container,
    list: list,
    name: name
  });
}

tabalanche.getAllTabGroups().then(function(tabGroups) {
  for (var i = 0; i < tabGroups.length; i++) {
    createTabGroupDiv(tabGroups[i]);
  }
});

var optslink = document.getElementById('options');
optslink.href = platform.getOptionsURL();
optslink.addEventListener('click', function(evt) {
  platform.openOptionsPage();
  evt.preventDefault();
});
