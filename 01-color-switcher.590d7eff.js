!function(){var t={startBtn:document.querySelector("button[data-start]"),stoptBtn:document.querySelector("button[data-stop]"),body:document.querySelector("body")};function n(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}var a=null;t.body.addEventListener("click",(function(e){if("button"===e.target.type)if(e.target!==t.startBtn||t.startBtn.classList.contains("active-btn")){if(e.target!==t.stoptBtn||!t.startBtn.classList.contains("active-btn"))return;t.startBtn.classList.remove("active-btn"),clearTimeout(a)}else t.startBtn.classList.add("active-btn"),a=setInterval(n,1e3)}))}();
//# sourceMappingURL=01-color-switcher.590d7eff.js.map
