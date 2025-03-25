import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // 👈 Ensures the service is available globally
})
export class AddressService {
  private apiUrl = 'http://localhost:8080/api/addressbook';

  constructor(private http: HttpClient) {}

  getAddresses(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addAddress(address: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, address);
  }

  deleteAddress(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateAddress(id: number, address: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, address);
  }
}
