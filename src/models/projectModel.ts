import ILangModel from './langModel';

interface IProject {
  id: string;
  name: ILangModel,
  description: ILangModel,
  image: string,
  tags: Array<string>
}

export default IProject;
