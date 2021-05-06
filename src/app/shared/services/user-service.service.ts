import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Account } from '../interfaces/IAccount'
import { Customer } from '../interfaces/ICustomer'
import { Injectable } from '@angular/core'
import { customerUrl } from '../constants/constants'

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  headerOptions = {}
  constructor(private http: HttpClient) {}

  registerCustomer(customer: Customer) {
    return this.http.post(`${customerUrl}/register`, customer)
  }

  loginCustomer(customer: Customer) {
    this.http.post(`${customerUrl}/login`, customer).subscribe((res) => {
      sessionStorage.setItem('token', Object(res)['token'])
    })
  }

  deleteToken() {
    sessionStorage.removeItem('token')
  }

  private setHeaderOptions() {
    this.headerOptions = {
      headers: new HttpHeaders().set(
        'Authorization',
        sessionStorage.getItem('token') + '',
      ),
    }
  }

  getUserProfile() {
    this.setHeaderOptions()
    return this.http.get<Customer>(`${customerUrl}/profile`, this.headerOptions)
  }

  getAccountOfUser() {
    this.setHeaderOptions()
    return this.http.get<Account>(`${customerUrl}/account`, this.headerOptions)
  }

  createAccount(account: Account) {
    this.setHeaderOptions()
    return this.http
      .post(`${customerUrl}/create`, account, this.headerOptions)
      .subscribe((res) => {
        console.log(res)
      })
  }

  withdraw(amount: any) {
    this.setHeaderOptions()

    return this.http
      .get(`${customerUrl}/withdraw/${amount}`, this.headerOptions)
      .subscribe((res) => {
        console.log(res)
      })
  }

  deposit(amount: any) {
    this.setHeaderOptions()

    return this.http
      .get(`${customerUrl}/deposit/${amount}`, this.headerOptions)
      .subscribe((res) => {
        console.log(res)
      })
  }
}
