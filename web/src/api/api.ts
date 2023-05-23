import axios, { type AxiosInstance } from 'axios';
import { type CognitoUserSession } from 'amazon-cognito-identity-js';

import config from '../config/config.json';
import { type GetSupportedLanguagesResponse } from './responses/getSupportedLanguagesResponse';
import Pool from '../utils/users/UserPool';
import { type TranslateRequest } from './requests/translateRequest';
import { type TranslateResponse } from './responses/translateResponse';
import { type CreateRepetitionRequest } from './requests/createRepetitionRequest';

export default class Api {
  public static createClient(): AxiosInstance {
    const headers = Api.getHeaders();

    const instance = axios.create({
      baseURL: config.apiUrl,
      timeout: config.apiTimeout,
      headers,
    });

    instance.interceptors.response.use(
      response => response,
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      error => {
        if (error.response && error.response.status === 401) {
          window.location.reload();
        }
        return Promise.reject(error);
      },
    );

    return instance;
  }

  public static getHeaders(): Record<string, string | number | boolean> {
    const headers: Record<string, string | number | boolean> = {
      'Content-Type': 'application/json',
    };
    const user = Pool.getCurrentUser();
    let token: string | undefined;
    if (user) {
      user.getSession((err: Error | null, userSession: CognitoUserSession | null) => {
        if (!err) {
          token = userSession?.getIdToken().getJwtToken();
        }
      });
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }

  public static async getSupportedLanguages(): Promise<GetSupportedLanguagesResponse> {
    const response = await Api.createClient().get('/supportedLanguages');
    return response?.data;
  }

  public static async translate(body: TranslateRequest): Promise<TranslateResponse> {
    const response = await Api.createClient().post('/translate', body);
    return response?.data;
  }

  public static async createRepetition(body: CreateRepetitionRequest): Promise<CreateRepetitionRequest> {
    const response = await Api.createClient().post('/repetitions', body);
    return response?.data;
  }
}
