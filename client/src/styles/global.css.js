import { createGlobalStyle } from 'styled-components'
import theme from './theme'

export default createGlobalStyle`
  @font-face {
    font-family: "DINNextRoundedLTPro";
    font-style: normal;
    font-weight: 300;
    src: url("/DINNextRoundedLTPro-Light.woff2") format("woff2");
  }

  @font-face {
    font-family: "DINNextRoundedLTPro";
    font-style: normal;
    font-weight: 400;
    src: url("/DINNextRoundedLTPro-Regular.woff2") format("woff2");
  }

  @font-face {
    font-family: "DINNextRoundedLTPro";
    font-style: normal;
    font-weight: 500;
    src: url("/DINNextRoundedLTPro-Medium.woff2") format("woff2");
  }

  @font-face {
    font-family: "DINNextRoundedLTPro";
    font-style: normal;
    font-weight: 700;
    src: url("/DINNextRoundedLTPro-Bold.woff2") format("woff2");
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    background: #f7f7f7;
    color: ${theme.text.default};
    font-family: 'DINNextRoundedLTPro', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 14px;
    line-height: 22px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body, div, span,
  h1, h2, h3, h4, h5, h6, p,
  a, code, em, small, strong,
  b, u, i, ol, ul, li, button,
  fieldset, form, label,
  article, aside, footer, header,
  menu, nav, section, summary {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    box-sizing: border-box;
  }

  ul, ol {
    list-style: none;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
    color: inherit;
  }

  button:focus {
    outline: 0;
  }

  button::-moz-focus-inner {
    border: 0;
  }

  a {
    color: currentColor;
    text-decoration: none;
  }
`
