import IUserInfo from '../../models/userInfoModel';
import ILangModel from '../../models/langModel';

interface IResultObj {
  language: keyof ILangModel,
  field: keyof IUserInfo,
  value: string,
}

function transformObjectToArray(inputObject: IUserInfo) {
  const resultArray: IResultObj[] = [];
  if (inputObject === null) return resultArray;

  Object.keys(inputObject).forEach((key) => {
    if (key in inputObject) {
      const field = key as keyof IUserInfo;
      const userField = inputObject[field as keyof IUserInfo];

      Object.keys(userField).forEach((languageKey) => {
        if (languageKey in userField) {
          const language = languageKey as keyof ILangModel;
          const value = userField[language as keyof typeof userField];
          resultArray.push({ field, language, value });
        }
      });
    }
  });
  return resultArray;
}

export default transformObjectToArray;
