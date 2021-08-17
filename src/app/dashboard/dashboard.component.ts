import { summaryFileName } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { mean, std, median } from 'mathjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  myForm: FormGroup;
  list = JSON.parse(
    localStorage.getItem('superList')
      ? `[${localStorage.getItem('superList')}]`
      : '[1, 2, 3, 4, 99]'
  );

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      newNumber: '',
    });
  }

  ngOnInit(): void {}

  deleteItem(index: number): void {
    localStorage.setItem(
      'superList',
      this.list.filter((_: any, i: number) => i != index)
    );
    this.list = JSON.parse(`[${localStorage.getItem('superList')}]`);
  }

  addNumber(): void {
    localStorage.setItem(
      'superList',
      this.list.concat([this.myForm.value.newNumber])
    );
    this.list = JSON.parse(`[${localStorage.getItem('superList')}]`);
    this.myForm.reset();
  }

  mean(): string {
    return mean(this.list).toPrecision(4);
  }
  median(): string {
    return median(this.list).toPrecision(4);
  }
  std(): string {
    return std(this.list).toPrecision(4);
  }
}
