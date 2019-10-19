import { Subscriber, Observer } from "rxjs";
import axios, { CancelTokenSource, AxiosRequestConfig, AxiosInstance } from "axios";
import { AsyncStorage } from "react-native";
import * as AxiosLogger from 'axios-logger';

export default class HttpClient extends Subscriber<any> {
  source: CancelTokenSource;
  completed: boolean;
  observer: Observer<any>;
  axiosInstance: AxiosInstance;
  constructor(
    observer: Observer<any>
  ) {
    super(observer);

    this.observer = observer;

    this.axiosInstance = axios.create();
    if (process.env.IS_PRODUCTION === 'false') {
      this.axiosInstance.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
      this.axiosInstance.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);
    }

    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();

    // XHR complete pointer
    this.completed = false;
  }

  delete(urlWithQueryParams: string, axiosRequestConfig: AxiosRequestConfig) {
    const axiosPromise = this.axiosInstance.delete(urlWithQueryParams, {
      cancelToken: this.source.token,
      ...axiosRequestConfig
    });
    this._handlePromise(axiosPromise);
  }

  get(urlWithQueryParams: string, axiosRequestConfig: AxiosRequestConfig) {
    const axiosPromise = this.axiosInstance.get(urlWithQueryParams, {
      cancelToken: this.source.token,
      ...axiosRequestConfig
    });
    this._handlePromise(axiosPromise);
  }

  patch(urlWithQueryParams: string, axiosRequestConfig: AxiosRequestConfig, requestBody: any) {
    const axiosPromise = this.axiosInstance.patch(urlWithQueryParams, requestBody, {
      cancelToken: this.source.token,
      ...axiosRequestConfig
    });
    this._handlePromise(axiosPromise);
  }

  post(urlWithQueryParams: string, axiosRequestConfig: AxiosRequestConfig, requestBody: any) {
    const axiosPromise = this.axiosInstance.post(urlWithQueryParams, requestBody, {
      cancelToken: this.source.token,
      ...axiosRequestConfig
    });
    this._handlePromise(axiosPromise);
  }

  put(urlWithQueryParams: string, axiosRequestConfig: AxiosRequestConfig, requestBody: any) {
    const axiosPromise = this.axiosInstance.put(urlWithQueryParams, requestBody, {
      cancelToken: this.source.token,
      ...axiosRequestConfig
    });
    this._handlePromise(axiosPromise);
  }

  _handlePromise(axiosPromise) {
    axiosPromise
      .then(response => {
        this.observer.next(this._handleResponse(response));
        this.completed = true;
        this.observer.complete();
      })
      .catch(async error => {
        this.completed = true;
        const status = error.response
          ? error.response.status
            ? error.response.status
            : undefined
          : undefined;
        this.observer.error(error.response || error);
        if (status === 401) {
          // auto logout if 401 response returned from api
          await AsyncStorage.clear();
        }
      });
  }

  unsubscribe() {
    super.unsubscribe();

    // cancel XHR
    if (this.completed === false) {
      this.source.cancel();
      this.completed = true;
    }
  }

  _handleResponse(response) {
    return response;
  }
}
