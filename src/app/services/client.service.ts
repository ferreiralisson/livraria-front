import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientDTO } from '../model/client-dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  createClient(client: ClientDTO) {
    return this.http.post(`${environment.base_url}/client`, client, {
      observe: 'response',
      responseType: 'text',
    });
  }

  findAll(): Observable<ClientDTO[]> {
    return this.http.get<ClientDTO[]>(`${environment.base_url}/client`);
  }

  deleteClient(id: string) {
    return this.http.delete(`${environment.base_url}/client/${id}`);
  }
}
