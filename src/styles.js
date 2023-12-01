const styles = `
#header-toolbar-intervals > div > button[class*="isActive-"]::after {
  border-radius: var(--tv-toolbar-explicit-hover-border-radius,2px);
  bottom: 4px;
  display: block;
  left: 0;
  outline: 2px none #2962ff;
  position: absolute;
  right: var(--tv-toolbar-explicit-hover-margin,2px);
  right: 0;
  top: 4px;
  z-index: -1;
  background-color: var(--tv-color-toolbar-button-background-hover, #f0f3fa);
  content: "";
}
`

export function insertStyles() {
  const style = document.createElement('style')
  style.innerHTML = styles;
  document.body.appendChild(style);
}
