import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'User' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Admin' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', role: 'User' },
  ];

  editUser(userId: number) {
    console.log('Edit user with ID:', userId);
    alert(`Edit functionality for user ID: ${userId}`);
  }

  deleteUser(userId: number) {
    console.log('Delete user with ID:', userId);
    this.users = this.users.filter(user => user.id !== userId);
    alert(`User with ID: ${userId} deleted`);
  }

  showdetail(userId:number) {
    console.log("ShowDetail", userId)
    alert(`Show details  functionality for user: ${userId}`)

  }
}
