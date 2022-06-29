import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PaymentService } from 'src/app/service';
import { ReceivedPayment } from 'src/app/shared/payment.interface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, AfterViewInit {
  isEmpty: boolean = true;
  payments!: ReceivedPayment[];

  constructor(private service: PaymentService) {}

  ngAfterViewInit(): void {
    this.service.getPayment('first', false).subscribe((res) => {
      this.payments = res as any;
    });
  }

  ngOnInit(): void {}
}
