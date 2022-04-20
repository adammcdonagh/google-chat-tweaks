
var observer;

function main() {
  // Iterating on threads and in the case of DMs, the whole message history is one thread
  var el = 0
  document
    .querySelectorAll("c-wiz[data-topic-id][data-local-topic-id]")
    .forEach(function (e, t, i) {
      // Iterating on each message in the thread
      e.querySelectorAll(
        'div[jscontroller="VXdfxd"]:not([data-tooltip="Open in new tab"])'
      ).forEach(
        // Find the delete message icon for each chat message, but not ones that are links to Docs
        // Adding quote message buttons
        function(addreactionButton){
          addQuoteReply(addreactionButton)
          addLinkCopy(addreactionButton, e)
        }
      );
    });
}

function addLinkCopy(addreactionButton, e){
  if (addreactionButton.parentElement.parentElement.hasAttribute("data-copy-link")// the link button is already there
  || addreactionButton.parentElement.parentElement.children.length === 1 // Add reaction button next to existing emoji
  )
  {
    return;
  }
  const containerSvgLink = document.createElement("div");
  // Quote svg icon
  containerSvgLink.innerHTML = `<svg
  viewBox="0 0 24 24"
  width="24px"
  height="24px"
  style="margin-top: 4px"
  version="1.1"
  id="svg4" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs
    id="defs8" /><path
    d="M 10.023879,18.187096 7.2978831,20.913095 C 6.167738,22.043238 4.3375575,22.043238 3.2083618,20.913267 2.078941,19.783848 2.078941,17.953486 3.2081895,16.824292 l 5.4529456,-5.45295 c 1.1291948,-1.129238 2.9595599,-1.129238 4.0887529,0 0.376426,0.376432 0.986775,0.376432 1.3632,0 0.37643,-0.376427 0.37643,-0.986773 0,-1.363202 -1.882094,-1.8820966 -4.9330576,-1.8820966 -6.8151569,0 l -5.4529028,5.452903 c -1.88209335,1.882097 -1.88209335,4.93306 0,6.815156 1.881873,1.883091 4.933064,1.883091 6.8161561,0 l 2.7259966,-2.725998 c 0.376433,-0.376429 0.376433,-0.986776 0,-1.363203 -0.37643,-0.376429 -0.986822,-0.376384 -1.363245,4.6e-5 z"
    id="path920"
    style="stroke-width:0.0451841" /><path
    d="m 22.155394,1.9660175 c -1.882099,-1.88209327 -4.934056,-1.88209327 -6.81615,0 l -3.270605,3.2706058 c -0.376427,0.3764248 -0.376427,0.986774 0,1.3631988 0.376428,0.3764301 0.986777,0.3764301 1.363204,0 l 3.270605,-3.2706006 c 1.129194,-1.1292383 2.960503,-1.1292383 4.089742,0 1.129193,1.1291942 1.129193,2.9595537 0,4.0887505 l -5.99755,5.997597 c -1.129242,1.129239 -2.959557,1.129239 -4.088752,0 -0.376425,-0.376431 -0.986773,-0.376431 -1.3631985,0 -0.3764318,0.376429 -0.3764318,0.986773 0,1.363202 1.8820925,1.882099 4.9330555,1.882099 6.8151545,0 l 5.99755,-5.9975523 c 1.882093,-1.8820944 1.882093,-4.9331029 0,-6.8152012 z"
    id="path922"
    style="stroke-width:0.0451841" /></svg>`;
  containerSvgLink.className = addreactionButton.className;
  const linkSVG = containerSvgLink.children[0];
  const svg = addreactionButton.querySelector("svg");
  if (svg) { //copy svg class to new element
    svg.classList.forEach((c) => linkSVG.classList.add(c));
  }

  addreactionButton.parentElement.parentElement.setAttribute("data-copy-link", "true");

  addreactionButton.parentElement.parentElement.appendChild(
    containerSvgLink
  );

  const threadId = e.getAttribute("data-topic-id");
  // We want the data-group-id from the DOM to determine the link to the room/DM
  let roomId = document
    .querySelector("c-wiz[data-group-id][data-is-client-side]")
    .getAttribute("data-group-id");
  
  let linkUrl = `https://mail.google.com/chat/u/0/#chat/${roomId}/${threadId}`

  containerSvgLink.addEventListener("click", () => {
    clickLinkButton(document, containerSvgLink, linkUrl);
  });
}

function clickLinkButton(document, copyButton, link){
  const el = document.createElement("textarea");

  el.value = link;

  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  alert("link copied!")
}

function addQuoteReply(addreactionButton){
  if (
    addreactionButton.parentElement.parentElement.querySelector(
      '[data-tooltip*="Quote Message"'
    ) || // Quote reply button already exists
    addreactionButton.parentElement.parentElement.children.length === 1 // Add reaction button next to existing emoji reactions to a message
  ) {
    return;
  }
  const containerSvgQuote = document.createElement("div");
  // Quote svg icon
  containerSvgQuote.innerHTML = `
                    <svg viewBox="0 0 24 24" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" style="margin-top: 4px">
                        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 8v3.701c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5zm6 0v3.701c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5z"/>
                    </svg>`;
  containerSvgQuote.className = addreactionButton.className;
  containerSvgQuote.setAttribute("data-tooltip", "Quote Message");
  const quoteSVG = containerSvgQuote.children[0];
  const svg = addreactionButton.querySelector("svg");
  if (svg) {
    svg.classList.forEach((c) => quoteSVG.classList.add(c));
  } else {
    return;
  }

  var elRef = addreactionButton;
  // Find parent container of the message
  // These messages are then grouped together when they are from the recipient
  // and the upper most one has the name and time of the message
  while (
    !(elRef.className && elRef.className.includes("nF6pT")) &&
    elRef.parentElement
  ) {
    elRef = elRef.parentElement;
  }
  if (elRef.className.includes("nF6pT")) {
    var messageIndex, name;
    [...elRef.parentElement.children].forEach((messageEl, index) => {
      if (messageEl === elRef) {
        messageIndex = index;
      }
    });

    addreactionButton.parentElement.parentElement.style.color = "red";

    addreactionButton.parentElement.parentElement.appendChild(
      containerSvgQuote
    );
    containerSvgQuote.addEventListener("click", () => {
      clickQuoteButton(name, addreactionButton, messageIndex, elRef);
    });
  }
}

function clickQuoteButton(name,addreactionButton, messageIndex, elRef){
  while (messageIndex >= 0) {
    if (
      elRef.parentElement.children[messageIndex].className.includes(
        "AnmYv"
      )
    ) {
      const nameContainer = elRef.parentElement.children[
        messageIndex
      ].querySelector("[data-hovercard-id], [data-member-id]");
      name = nameContainer.getAttribute("data-name");
      break;
      // Can extract time, but adding it into static text surrounded by relative time that's rendered in the chats will only confuse people
      // time = el.Ref.parentElement.children[messageIndex].querySelector('span[data-absolute-timestamp]').getAttribute('data-absolute-timestamp');
    }
    messageIndex -= 1;
  }

  var messageContainer =
    addreactionButton.parentElement.parentElement.parentElement
      .parentElement.children[0];
  var quoteText = getQuoteText(messageContainer);

  let inputEl = e.querySelector('div[contenteditable="true"]'); // This fetches the input element in channels
  let dmInput = document.body.querySelectorAll(
    'div[contenteditable="true"]'
  ); // This fetches the input in DMs
  inputEl = inputEl ? inputEl : dmInput[dmInput.length - 1];
  if (!inputEl) {
    return;
  }

  inputEl.innerHTML = makeInputText(
    name,
    quoteText,
    inputEl,
    messageContainer
  );
  inputEl.scrollIntoView();
  inputEl.click();
  placeCaretAtEnd(inputEl);
}


function makeInputText(name, quoteText, inputEl, messageContainer) {
  var isDM = window.location.href.includes("/dm/");
  var selection = window.getSelection().toString();
  var text = getText(messageContainer);
  var oneLineQuote = "";
  if (selection && text.includes(selection) && selection.trim()) {
    var regexp = new RegExp("(.*)" + selection + "(.*)");
    var matches = regexp.exec(text);
    if (matches[1]) {
      // Has text before the match
      oneLineQuote += "... ";
    }
    oneLineQuote += selection.trim();

    if (matches[2]) {
      // Has text after the match
      oneLineQuote += " ...";
    }
  }

  if (isDM) {
    return oneLineQuote
      ? "`" + oneLineQuote + "`\n"
      : "```\n" + quoteText + "\n```\n" + inputEl.innerHTML;
  } else {
    return oneLineQuote
      ? "`" + name + ": " + oneLineQuote + "`\n"
      : "```\n" + name + ":\n" + quoteText + "\n```\n" + inputEl.innerHTML;
  }
}

function getQuoteText(messageContainer) {
  var regularText = getText(messageContainer);
  var videoCall = messageContainer.querySelector(
    'a[href*="https://meet.google.com/"]'
  );
  var image = messageContainer.querySelector("a img[alt]");
  var text =
    regularText ||
    (videoCall ? "🎥: " + videoCall.href : null) ||
    (image ? "📷: " + image.alt : null) ||
    "...";

  return truncateQuoteText(text);
}

function truncateQuoteText(text) {
  let splitText = text.split("\n");
  let quoteText =
    splitText.slice(0, 3).join("\n") + (splitText.length > 3 ? "\n..." : "");
  if (quoteText.length > 280) {
    quoteText = quoteText.slice(0, 280) + " ...";
  }
  return quoteText;
}

function getText(messageContainer) {
  const multilineMarkdownClass = "FMTudf";
  let textContent = "";
  const childNodes = messageContainer.children[0].childNodes;
  for (var i = 0; i < childNodes.length; i += 1) {
    if (childNodes[i].nodeType === Node.TEXT_NODE) {
      textContent += childNodes[i].textContent;
    } else if (childNodes[i].className === "jn351e") {
      continue;
    } else if (childNodes[i].className === multilineMarkdownClass) {
      textContent += "...\n";
    } else if (childNodes[i].tagName === "IMG") {
      // emojis
      textContent += childNodes[i].alt;
    } else {
      textContent += childNodes[i].innerHTML;
    }
  }

  return textContent;
}

function placeCaretAtEnd(el) {
  el.focus();
  if (
    typeof window.getSelection != "undefined" &&
    typeof document.createRange != "undefined"
  ) {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    range.insertNode(document.createElement("br"));
    range.collapse();
  } else if (typeof document.body.createTextRange != "undefined") {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}

function debounce(fn, delay) {
  var timeout = null;
  return function () {
    if (timeout) {
      return;
    } else {
      timeout = setTimeout(function () {
        fn();
        timeout = null;
      }, delay);
    }
  };
}

main();
var el = document.documentElement;
el.addEventListener("DOMSubtreeModified", debounce(main, 2000));
