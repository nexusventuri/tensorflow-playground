ace.require("ace/keybindings/vim");

class Editor {
  constructor(id) {
    this.id = id;
    this.editor = ace.edit(this.id);
    this.runButton = this.id + '-submit';

    this.setKeyboardHandler('vim');
    this.setDefaultEditorSettings();
    Editor.addEditor(this);
  }

  setDefaultEditorSettings() {
    this.editor.setTheme('ace/theme/dracula')
    this.editor.session.setMode("ace/mode/javascript");
    this.editor.setFontSize('20px');
    this.editor.commands.addCommand({
      name: 'Execute',
      bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
      exec: (editor) => { this.executeCode() }
    });
  }

  setKeyboardHandler(editorName) {
    this.editor.setKeyboardHandler(Editor.getEditorHandler(editorName));
    this.setDefaultEditorSettings();
  }

  executeCode() {
    let code = this.editor.getValue();
    eval(code);
  }

  static handlers =  {
    'vim': 'ace/keyboard/vim',
    'emacs': 'ace/keyboard/emacs',
    'sublime': 'ace/keyboard/sublime'
  };

  static getEditorHandler(key) {
    return this.handlers[key] || this.handlers['vim'];
  }

  static editors = {};
  static addEditor(editor) {
    editors[editor.id] = editor;
  }

  static applyToAll(fun) {
    for (const [key, editor] of Object.entries(editors)) {
      fun(editor)
    }
  }
}

const editorDomElements = document.querySelectorAll('.ace-editor');
let editors = {};

editorDomElements.forEach((dom) => {
  editors[dom.id] = new Editor(dom.id);
})

let editorSelection = document.getElementById('editor');
editorSelection.onchange = function (event) {
  Editor.applyToAll((editor) => editor.setKeyboardHandler(event.target.selectedOptions[0].value));
};

