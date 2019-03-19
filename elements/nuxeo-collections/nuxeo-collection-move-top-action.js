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
import '@nuxeo/nuxeo-ui-elements/widgets/nuxeo-tooltip.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

/**
`nuxeo-collection-move-top-action`
@group Nuxeo UI
@element nuxeo-collection-move-top-action
*/
Polymer({
  _template: html`
    <style include="nuxeo-action-button-styles"></style>

    <nuxeo-operation op="Document.MoveCollectionMember" id="moveTopOp"></nuxeo-operation>

    <template id="availability" is="dom-if" if="[[_isAvailable(members)]]">
      <div class="action" on-tap="moveUp">
        <paper-icon-button noink id="topButton" icon="editor:vertical-align-top"></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]">[[_label]]</span>
      </div>
      <nuxeo-tooltip for="topButton" position="[[tooltipPosition]]">[[_label]]</nuxeo-tooltip>
    </template>
  `,

  is: 'nuxeo-collection-move-top-action',
  behaviors: [I18nBehavior],

  properties: {
    members: {
      type: Object,
    },
    allMembers: {
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
    _member1Idx: {
      type: Number,
    },
    _member2Idx: {
      type: Number,
    },
  },

  moveUp() {
    if (this.members && this.members.length === 1 && this.allMembers) {
      const member2 = this.members[0].uid;
      let i = 0;
      for (; i < this.allMembers.length; i++) {
        if (this.allMembers[i].uid === member2) {
          if (i > 0) {
            this._member2Idx = i;
            this._member1Idx = 0;
            const member1 = this.allMembers[this._member1Idx].uid;
            this.$.moveTopOp.input = this.collection.uid;
            this.$.moveTopOp.params = {
              member1,
              member2,
            };
            this.$.moveTopOp.execute().then(() => {
              [this.allMembers[this._member2Idx]] = this.allMembers.splice(
                this._member1Idx,
                1,
                this.allMembers[this._member2Idx],
              );
              this.fire('refresh-display', { focusIndex: this._member1Idx });
            });
          }
          break;
        }
      }
    }
  },

  _isAvailable() {
    if (this.members && this.members.length === 1) {
      if (this.allMembers && this.allMembers.length <= 1) {
        return false;
      }
      if (this.allMembers[0].uid === this.members[0].uid) {
        return false;
      }
      return true;
    }
    return false;
  },

  _computeLabel() {
    return this.i18n('collections.moveTop');
  },
});
