import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class SpacexapiService {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.spacexdata.com/v3/launches'
    });
  }

  getLaunches = async (): Promise<Mission[]> => {
    const response = await this.client.get<Mission[]>('');
    return response.data;
  };

  filterLaunches = async (year: number): Promise<Mission[]> => {
    const response = await this.client.get<Mission[]>('', {
      params: { launch_year: year }
    });
    return response.data;
  };

  getLaunchDetails = async (flightNumber: number): Promise<Mission> => {
    const response = await this.client.get<Mission>(`/${flightNumber}`);
    return response.data;
  };
}
