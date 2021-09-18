import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor() { }

  async saveUser(newUser: { username: string; password: string; firstName: string; lastName: string; email: string; }) {
    console.log("in here")
    
    const user = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        'Content-Type': "application/json;charset=utf-8"
      },
      body: JSON.stringify(newUser)
    }).then((res) => res.json())
    return user
  }

}
