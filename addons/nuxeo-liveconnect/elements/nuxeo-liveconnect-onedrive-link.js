/**
(C) Copyright 2016 Nuxeo SA (http://nuxeo.com/) and others.

icensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Contributors:
  Gabriel Barata <gbarata@nuxeo.com>
*/
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { I18nBehavior } from '@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js';
import './nuxeo-liveconnect-onedrive-provider.js';

/**
`nuxeo-liveconnect-onedrive-link`
@group Nuxeo UI
@element nuxeo-liveconnect-onedrive-link
*/
Polymer({
  _template: html`
    <style include="nuxeo-styles">
      :host {
        display: inline-block;
        @apply --layout-horizontal;
        @apply --nuxeo-liveconnect-link-layout;
      }

      iron-icon {
        --iron-icon-height: 16px;
        --iron-icon-width: 16px;
        margin-right: 4px;
        @apply --nuxeo-liveconnect-icon-layout;
      }

      a {
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --layout-center-justified;
        @apply --nuxeo-liveconnect-anchor-layout;
      }

      a,
      a:active,
      a:visited,
      a:focus {
        color: var(--nuxeo-secondary-color, #0066ff);
        text-decoration: underline;
      }
    </style>

    <nuxeo-liveconnect-onedrive-provider
      id="provider"
      is-available="{{isProviderAvailable}}"
    ></nuxeo-liveconnect-onedrive-provider>
    <template is="dom-if" if="[[isProviderAvailable]]">
      <a href="javascript:undefined" on-tap="_openPicker">
        <iron-icon src="[[importPath]]images/OneDrive.png"></iron-icon>
        [[i18n('liveconnectImportActions.onedrive', 'OneDrive')]]
      </a>
    </template>
  `,

  is: 'nuxeo-liveconnect-onedrive-link',
  behaviors: [I18nBehavior],

  ready() {
    this.$.provider.updateProviderInfo();
  },

  _openPicker() {
    this.$.provider.openPicker();
  },
});
