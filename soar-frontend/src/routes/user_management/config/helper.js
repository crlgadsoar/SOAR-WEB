import API_ENDPOINT_URL from 'apiServices/API_ENDPOINT_URL';
import { instance } from 'util/connection/axios';
export const validateUserName = async (
  rule,
  value,
  callback,
  initialValues,
) => {
  if (initialValues && initialValues.user_name === value) {
    return Promise.resolve();
  }
  const regex = /^[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*$/; // Updated regex pattern
  if (!value || value.length < 6 || value.length > 25 || !regex.test(value)) {
    return Promise.resolve();
  }
  const data = await validateUserNameFromBackendAPI(value);
  return data ? Promise.resolve() : Promise.reject(new Error(''));
};
const validateUserNameFromBackendAPI = async (name = '') => {
  let str = 'user_name = ' + name;
  return await instance
    .get(
      `${
        API_ENDPOINT_URL.GET_USER_MANAGEMENT_USERNAME_LIST
      }/?filter=(${encodeURIComponent(str)})&include_count=true`,
    )
    .then((res) => {
      return res.data.meta.count === 0;
    }) // if length 0 return true else if length non zero return false
    .catch((error) => {
      console.log(error);
      return false;
    });
};
