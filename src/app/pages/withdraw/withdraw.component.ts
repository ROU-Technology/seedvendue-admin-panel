import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PaymentService } from 'src/app/service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
})
export class WithdrawComponent implements OnInit, AfterViewInit {
  isEmpty: boolean = true;
  withdraws!: any[];

  constructor(private service: PaymentService) {}

  ngAfterViewInit(): void {
    this.service.getWithdraw('first', false).subscribe((res) => {
      this.withdraws = res as any;
    });
  }

  ngOnInit(): void {}
}
