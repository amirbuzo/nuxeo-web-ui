'use strict';

import BasePage from '../../base';
import DocumentMetadata from './document_metadata';
import DocumentView from './document_view';
import DocumentVersions from './document_versions';

export default class DocumentPage extends BasePage {

  constructor(selector, docType) {
    super(selector);
    this.docType = docType;
  }

  get view() {
    return new DocumentView(`${this._selector} nuxeo-document-view #container`, this.docType);
  }

  get metadata() {
    return new DocumentMetadata('nuxeo-document-metadata', this.docType);
  }

  get versions() {
    return new DocumentVersions('nuxeo-document-versions');
  }

  get previewButton() {
    return this.el.element('nuxeo-preview-button');
  }

  get versionInfoBar() {
    this.el.waitForExist('#versionInfoBar');
    this.el.waitForVisible('#versionInfoBar');
    return this.el.element('#versionInfoBar');
  }

  get restoreVersionButton() {
    return this.versionInfoBar.element('nuxeo-restore-version-button');
  }

  get restoreVersionButtonConfirm() {
    return this.versionInfoBar.element('nuxeo-restore-version-button paper-button[dialog-confirm]');
  }

  get info() {
    return this.el.element('nuxeo-document-info');
  }

  get infoBar() {
    return this.el.element('nuxeo-document-info-bar');
  }

  get taskInfo() {
    return this.el.element('nuxeo-document-info-bar .task');
  }

  get processWorkflowButton() {
    return this.el.element('nuxeo-document-info-bar .task paper-button');
  }

  get abandonWorkflowButton() {
    return this.el.element('nuxeo-document-info-bar .workflow paper-button');
  }
}
