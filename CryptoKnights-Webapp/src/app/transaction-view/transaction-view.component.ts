import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionStorageService } from '../transaction-storage.service';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent implements OnInit {

  constructor(private transactionStorage: TransactionStorageService) { }

  transactionList: Transaction[] = [];

  ngOnInit(): void {
  }

  getTransactions() {

    this.transactionStorage.getTransactionList(1)
      .subscribe(foundTransactions => 
      {
        console.log(foundTransactions);
        this.transactionList = foundTransactions;
      });
  }
}
