import { Observable } from "rxjs";
import HttpClient from "../helpers/http-client";
import { API_ENDPOINTS } from "../constants/api-endpoints.constant";
import { AxiosRequestConfig } from "axios";
import * as UserModel from 'UserModel';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthService = {
  login,
  logout,
  forgotPassword
};

function login(identifier: string, password: string) {
  const options: AxiosRequestConfig = { headers: { "Content-Type": "application/json" } },
    body = JSON.stringify({ identifier, password }),
    url = API_ENDPOINTS.AUTH.LOGIN_POST;

  return new Observable<UserModel.RootObject>(observer => {
    return new HttpClient(observer).post(url, options, body);
  });
}

function logout() {
  return AsyncStorage.clear();
}

/**@function forgotPassword
 * Forgot Password
 * @param {string} emailId - User's Email ID
 * @returns {Observable} observable - Observable to which we can subscribe to
 */
function forgotPassword(emailId) {
  return new Observable(observer => {
    const requestType = "post",
      urlWithQueryParams = `${API_ENDPOINTS.URL}${API_ENDPOINTS.AUTH.POST_FORGOT_PASSWORD}`,
      axiosOptions = { headers: headerJSON() };
    new AxiosSubscriber(
      observer,
      urlWithQueryParams,
      requestType,
      axiosOptions,
      { email: emailId }
    );
  });
}
