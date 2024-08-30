import IProject from '../../models/projectModel';

const DEFAULT_PROJECT_VALUES: IProject = {
  id: '',
  name: {
    ru: '',
    en: '',
  },
  description: {
    ru: '',
    en: '',
  },
  tags: [],
};

export default DEFAULT_PROJECT_VALUES;
