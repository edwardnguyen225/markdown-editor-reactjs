import { Renderer, marked } from "marked";

const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, "g");
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
const escapeReplacements: { [index: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const getEscapeReplacement = (ch: string) => escapeReplacements[ch];
const escape = (html: string, encode?: boolean) => {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }

  return html;
};

const renderer: Partial<Renderer> = {
  heading: (text, level) => {
    return `<h${level} class="preview-h${level}">${text}</h${level}>`;
  },
  paragraph: (text) => {
    return `<p class="preview-p">${text}</p>`;
  },

  codespan: (text) => {
    return `<code class="markdown-code">${text}</code>`;
  },

  code(code, infostring, escaped) {
    const lang = (infostring || "").match(/^\S*/)?.[0];

    code = code.replace(/\n$/, "") + "\n";

    const langClass = lang ? `language-${lang}` : "";

    return `<pre class="code-container"><code class="markdown-code ${langClass}">${escaped ? code : escape(code, true)}</code></pre>\n`;
  },

  blockquote(quote) {
    return `<blockquote class="preview-blockquote">\n${quote}</blockquote>\n`;
  },
};

marked.use({
  renderer,
  gfm: true,
  breaks: false,
  pedantic: false,
});

export { marked };
