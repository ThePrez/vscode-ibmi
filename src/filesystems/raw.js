
const util = require(`util`);
const vscode = require(`vscode`);
let {instance} = require(`../Instance`);

module.exports = class qsysFs {
  constructor() {
    this.emitter = new vscode.EventEmitter();
    this.onDidChangeFile = this.emitter.event;
  }
  
  /**
   * 
   * @param {vscode.Uri} uri 
   * @returns {Promise<Uint8Array>}
   */
  async readFile(uri) {
    const contentApi = instance.getContent();

    const fileContent = await contentApi.download(uri.path);

    return new Uint8Array(Buffer.from(fileContent));
  }

  /**
   * 
   * @param {vscode.Uri} uri 
   */
  stat(uri) {
    return {file: vscode.FileType.File}
  }

  /**
   * @param {vscode.Uri} uri 
   * @param {Buffer} content 
   * @param {*} options 
   */
  writeFile(uri, content, options) {
    const contentApi = instance.getContent();

    return contentApi.upload(uri.path, content);
  }

  /**
   * @param {vscode.Uri} oldUri 
   * @param {vscode.Uri} newUri 
   * @param {{overwrite: boolean}} options 
   */
  rename(oldUri, newUri, options) {
    console.log({oldUri, newUri, options});
  }
}