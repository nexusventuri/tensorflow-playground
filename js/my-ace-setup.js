ace.require("ace/keybindings/vim");

const editorDomElements = document.querySelectorAll('.ace-editor');

function esm(templateStrings, ...substitutions) {
  let js = templateStrings.raw[0];
  for (let i=0; i<substitutions.length; i++) {
    js += substitutions[i] + templateStrings.raw[i+1];
  }
  return 'data:text/javascript;base64,' + btoa(js);
}

let editors = {};

editorDomElements.forEach((dom) => {
  let id = dom.id;
  let editor = ace.edit(id);
  editor.setTheme('ace/theme/dracula')
  editor.session.setMode("ace/mode/javascript");
  editor.setKeyboardHandler("ace/keyboard/vim");
  editor.setFontSize('20px');
  editor.commands.addCommand({
    name: 'Execute',
    bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
    exec: function(editor) {
      let code = editor.getValue();
      //code = code.replace(/\b(let|const)\b/, 'var');
      eval(code);
      //console.log('going to execute', code);
      //let executable = esm`${code}`;
      //import(executable)
      //  .then(running => console.log('running the thing', running));
    }
  });
  editors[id] = editor;
})

let editorSelection = document.getElementById('editor');

let editorKeyboardHandlers = {
  'vim': 'ace/keyboard/vim',
  'emacs': 'ace/keyboard/emacs',
  'sublime': 'ace/keyboard/sublime'
}

editorSelection.onchange = function (event) {
  let editorHandler = editorKeyboardHandlers[event.target.selectedOptions[0].value] ||
    editorKeyboardHandlers['vim'];

  for (const [key, value] of Object.entries(editors)) {
    value.setKeyboardHandler(editorHandler);
  }
};

