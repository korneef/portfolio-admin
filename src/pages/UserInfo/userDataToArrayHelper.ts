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

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const fieldKey in inputObject) {
    if (fieldKey in inputObject) {
      const field = fieldKey as keyof IUserInfo;
      const userField = inputObject[field as keyof IUserInfo];
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const languageKey in userField) {
        if (languageKey in userField) {
          const language = languageKey as keyof ILangModel;
          const value = userField[language as keyof typeof userField];
          resultArray.push({ field, language, value });
        }
      }
    }
  }
  return resultArray;
}

export default transformObjectToArray;
