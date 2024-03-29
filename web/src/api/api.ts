import axios, { type AxiosInstance } from 'axios';
import { type CognitoUserSession } from 'amazon-cognito-identity-js';

import config from '../config/config.json';
import { type GetSupportedLanguagesResponse } from './responses/getSupportedLanguagesResponse';
import Pool from '../utils/users/UserPool';
import { type TranslateRequest } from './requests/translateRequest';
import { type TranslateResponse } from './responses/translateResponse';
import { type CreateRepetitionRequest } from './requests/createRepetitionRequest';
import { type GetRepetitionsResponseElement } from './responses/getRepetitionsResponseElement';
import { type GetRepetitionsRequestParams } from './requests/getRepetitionsRequestParams';
import { type CreateRepetitionResponse } from './responses/createRepetitionResponse';
import { type UpdateRepetitionRequest } from './requests/updateRepetitionRequest';

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

  public static async createRepetition(body: CreateRepetitionRequest): Promise<CreateRepetitionResponse> {
    const response = await Api.createClient().post('/repetitions', body);
    return response?.data;
  }

  public static async getRepetitions(params?: GetRepetitionsRequestParams): Promise<GetRepetitionsResponseElement[]> {
    const response = await Api.createClient().get('/repetitions', {
      params,
    });
    return response?.data;
  }

  public static async updateRepetition(params: UpdateRepetitionRequest): Promise<void> {
    await Api.createClient().patch(`/repetitions/${params.id}`, params);
  }

  public static async deleteRepetition(id: string): Promise<void> {
    await Api.createClient().delete(`/repetitions/${id}`);
  }
}
