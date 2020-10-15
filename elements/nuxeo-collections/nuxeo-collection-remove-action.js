/**
@license
(C) Copyright Nuxeo Corp. (http://nuxeo.com/)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@nuxeo/nuxeo-elements/nuxeo-operation.js';
import '@nuxeo/nuxeo-ui-elements/actions/nuxeo-action-button-styles.js';
import { I18nBehavior } from '@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js';
import '@nuxeo/nuxeo-ui-elements/nuxeo-icons.js';
import '@nuxeo/nuxeo-ui-elements/widgets/nuxeo-tooltip.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

/**
`nuxeo-collection-remove-action`
@group Nuxeo UI
@element nuxeo-collection-remove-action
*/
Polymer({
  _template: html`
    <style include="nuxeo-action-button-styles"></style>

    <nuxeo-operation op="Collection.RemoveFromCollection" id="removeOp" sync-indexing></nuxeo-operation>

    <template id="availability" is="dom-if" if="[[_isAvailable(members, collection)]]">
      <div class="action" on-tap="remove">
        <paper-icon-button noink id="removeButton" icon="nuxeo:remove"></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]">[[_label]]</span>
        <nuxeo-tooltip position="[[tooltipPosition]]">[[_label]]</nuxeo-tooltip>
      </div>
    </template>
  `,

  is: 'nuxeo-collection-remove-action',
  behaviors: [I18nBehavior],

  properties: {
    members: {
      type: Object,
    },
    collection: {
      type: Object,
    },

    tooltipPosition: {
      type: String,
      value: 'bottom',
    },

    /**
     * `true` if the action should display the label, `false` otherwise.
     */
    showLabel: {
      type: Boolean,
      value: false,
    },

    _label: {
      type: String,
      computed: '_computeLabel(i18n)',
    },
  },

  remove() {
    if (this.members && this.members.length > 0) {
      const uids = this.members.map((doc) => doc.uid).join(',');
      this.$.removeOp.input = `docs:${uids}`;
      this.$.removeOp.params = { collection: this.collection.uid };
      this.$.removeOp.execute().then(() => {
        this.members = [];
        this.fire('refresh');
      });
    }
  },

  _isAvailable(members, collection) {
    if (collection && collection.contextParameters && collection.contextParameters.permissions) {
      // NXP-21408: prior to 8.10-HF01 the permissions enricher wouldn't return ReadCanCollect
      // Action will therefore not be available
      return collection.contextParameters.permissions.indexOf('ReadCanCollect') > -1;
    }
    return false;
  },

  _computeLabel() {
    return this.i18n('collections.remove');
  },
});