import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  addresses: any[] = [];
  errorMessage: string = '';

  constructor(private addressService: AddressService) {}

  ngOnInit() {
    this.loadAddresses();
  }

  loadAddresses() {
    console.log('Fetching addresses...'); // ✅ Debugging
    this.addressService.getAddresses().subscribe({
      next: (response) => {
        console.log('API Response:', response); // ✅ Debugging
        this.addresses = response.data; // Ensure API response structure is correct
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
        this.errorMessage = 'Failed to load addresses. Check backend connection.';
      },
    });
  }
}
