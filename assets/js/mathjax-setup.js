window.MathJax = {
  tex: {
    tags: "ams",
    macros: {
      ket: ["{\\left\\lvert #1 \\right\\rangle}", 1],
      bra: ["{\\left\\langle #1 \\right\\rvert}", 1],
      braket: ["{\\left\\langle #1 \\middle\\vert #2 \\right\\rangle}", 2],
      ketbra: ["{\\left\\lvert #1 \\right\\rangle\\!\\left\\langle #2 \\right\\rvert}", 2],
      Tr: "{\\operatorname{Tr}}",
    },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
  },
  options: {
    renderActions: {
      addCss: [
        200,
        function (doc) {
          const style = document.createElement("style");
          style.innerHTML = `
          .mjx-container {
            color: inherit;
          }
        `;
          document.head.appendChild(style);
        },
        "",
      ],
    },
  },
};
