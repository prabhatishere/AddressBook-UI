import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, FormsModule],  
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
})
export class AddressFormComponent implements OnChanges {
  @Output() formSubmit = new EventEmitter<any>();
  @Input() selectedAddress: any;

  address = { fullName: '', phoneNumber: '', address: '', state: '', city: '', pinCode: '' };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedAddress'] && this.selectedAddress) {
      this.address = { ...this.selectedAddress }; // Fill form with selected address for editing
    }
  }

  onSubmit() {
    this.formSubmit.emit(this.address);
    this.resetForm(); // Clear form after submission
  }

  resetForm() {
    this.address = { fullName: '', phoneNumber: '', address: '', state: '', city: '', pinCode: '' };
  }
}
