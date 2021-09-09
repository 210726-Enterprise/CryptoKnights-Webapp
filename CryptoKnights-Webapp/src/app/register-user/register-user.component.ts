import { Component, OnInit } from '@angular/core';
import { RegisterUserService } from '../register-user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private service: RegisterUserService) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;

  async createNewUser() {

    const newUser = {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    }
    const user = await this.service.saveUser(newUser)
    console.log(user)
  }

}
