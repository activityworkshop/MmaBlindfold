browser.runtime.onMessage.addListener(updatePage);

function updatePage(request, sender, sendResponse) {
  let html = document.querySelector('html');
  let body = document.querySelector('body');
  if (request == "yes") {
    html.style.backgroundColor = "#ddffdd";
    body.style.backgroundColor = "#ddffdd";
    let tables = document.getElementsByClassName("toccolours");
    for (let i=0; i<tables.length; i++) {
      for (let row of tables[i].rows) {
        if (row.cells.length == 8 && row.cells[4].innerText.length > 0 && row.cells[3].innerText.length > 0) {
          row.style.backgroundColor = "#aaffaa44";
          row.cells[2].innerText = "and";
          for (let j=4; j<8; j++) {
            row.cells[j].innerText = "- - -";
          }
          if (Math.random() < 0.5) {
            var r = row.cells[1].innerText;
            row.cells[1].innerText = row.cells[3].innerText;
            row.cells[3].innerText = r;
          }
        }
      }
    }
    let section = document.getElementById("Bonus_awards");
    let node = section.parentNode.nextElementSibling;
    while (node.nodeName != "H2") {
      let lis = node.getElementsByTagName("li");
      for (let i=0; i<lis.length; i++) {
        let text = lis[i].innerText;
        let fotn = "Fight of the Night";
        if (text.includes(fotn) && text.includes(" vs. ")) {
          lis[i].innerText = fotn + ": " + mangleFotn(text.substring(20));
          lis[i].style.backgroundColor = "#eeffee";
        }
        let potn = "Performance of the Night";
        if (text.includes(potn)) {
          lis[i].innerText = potn + ": ---";
          lis[i].style.backgroundColor = "#eeffee";
        }
      }
      node = node.nextElementSibling;
    }
  }
  else {
    html.style.backgroundColor = "#fff";
    body.style.backgroundColor = "#fff";
  }
}

function mangleFotn(text) {
  let fighters = text.split(" vs. ");
  if (fighters.length == 2) {
    let ff = (Math.random() < 0.5 ? 0 : 1);
    return "'" + fighters[ff] + "' and '" + fighters[1-ff] + "'";
  }
  return "---";
}
