/**
 * @param {() => void} f
 */
function OnLoad(f) {
  window.addEventListener('load', f)
  if (document.readyState == 'complete') {
    f();
  }
}

export {OnLoad};