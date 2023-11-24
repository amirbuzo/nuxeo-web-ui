import BasePage from '../base';
import Vocabulary from './admin/vocabulary';
import CloudServices from './admin/cloudServices';
import Audit from './admin/audit';
import { url } from '../helpers';

export default class Administration extends BasePage {
  get analytics() {
    return this.el.element('nuxeo-analytics');
  }

  get nxqlSearch() {
    return this.el.element('nuxeo-search-page#nxql');
  }

  get userAndGroupManagement() {
    return this.el.element('nuxeo-user-group-management');
  }

  get userGroupCreateButton() {
    return (async () => {
      const createEle = await this.el.element('#createButton');
      return createEle;
    })();
  }

  get vocabularyManagement() {
    if (!browser.getUrl().endsWith('vocabulary-management')) {
      url(process.env.NUXEO_URL ? '#!/admin/vocabulary-management' : 'ui/#!/admin/vocabulary-management');
    }
    return new Vocabulary('nuxeo-vocabulary-management');
  }

  goToVocabularyManagement() {
    if (!browser.getUrl().endsWith('vocabulary-management')) {
      url(process.env.NUXEO_URL ? '#!/admin/vocabulary-management' : 'ui/#!/admin/vocabulary-management');
    }
    return this.vocabularyManagement;
  }

  get audit() {
    return new Audit('nuxeo-audit');
  }

  get cloudServices() {
    return new CloudServices('nuxeo-cloud-services');
  }

  goToCloudServices() {
    if (!browser.getUrl().endsWith('cloud-services')) {
      url(process.env.NUXEO_URL ? '#!/admin/cloud-services' : 'ui/#!/admin/cloud-services');
    }
    return this.cloudServices;
  }
}
