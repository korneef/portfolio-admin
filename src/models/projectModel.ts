import ILangModel from './langModel';

interface IProject {
  name: ILangModel,
  description: ILangModel,
  image: string,
  tags: Array<string>
}

export default IProject;
