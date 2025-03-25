import { Component, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Required for [(ngModel)]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule], // ✅ Added FormsModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private apiUrl = 'http://localhost:8080/api/addressbook';
  
  addresses = signal<any[]>([]);
  loading = signal<boolean>(false);
  showForm = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  contact = signal<any>({ id: null, name: '', email: '', phone: '' });

  private http = inject(HttpClient);

  constructor() {
    this.fetchAddresses();
  }

  // ✅ Fetch contacts
  fetchAddresses() {
    this.loading.set(true);
    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        console.log("API Response:", response);
        this.addresses.set(response.data || []);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching addresses:', error);
        this.loading.set(false);
      }
    });
  }

  // ✅ Toggle form visibility
  toggleForm() {
    this.showForm.set(!this.showForm());
    if (!this.showForm()) this.resetForm();
  }

  // ✅ Reset form
  resetForm() {
    this.isEditing.set(false);
    this.contact.set({ id: null, name: '', email: '', phone: '' });
  }

  // ✅ Save (Add or Update) Contact
  saveContact() {
    const contactData = this.contact();

    if (!contactData.name.trim() || !contactData.email.trim()) {
      alert('Name and Email are required!');
      return;
    }

    if (this.isEditing()) {
      // ✅ Update contact
      this.http.put(`${this.apiUrl}/${contactData.id}`, contactData).subscribe({
        next: () => {
          this.addresses.set(
            this.addresses().map(addr => addr.id === contactData.id ? contactData : addr)
          );
          this.toggleForm();
        },
        error: (error) => console.error('Error updating contact:', error)
      });
    } else {
      // ✅ Add new contact
      this.http.post(this.apiUrl, contactData).subscribe({
        next: (response: any) => {
          console.log('Added Contact:', response);
          if (response.data) {
            this.addresses.set([...this.addresses(), response.data]);
          }
          this.toggleForm();
        },
        error: (error) => console.error('Error adding contact:', error)
      });
    }
  }

  // ✅ Edit Contact
  editAddress(address: any) {
    this.contact.set({ ...address });
    this.isEditing.set(true);
    this.showForm.set(true);
  }

  // ✅ Delete Contact
  deleteAddress(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.addresses.set(this.addresses().filter(addr => addr.id !== id));
      },
      error: (error) => console.error('Error deleting contact:', error)
    });
  }
}
