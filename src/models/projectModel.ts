import ILangModel from './langModel';

interface IProject {
  id: string;
  name: ILangModel,
  description: ILangModel,
  githubURL?: string,
  projectURL?: string,
  tags: Array<string>
}

export default IProject;
