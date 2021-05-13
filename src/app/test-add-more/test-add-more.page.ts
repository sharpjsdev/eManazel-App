import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-add-more',
  templateUrl: './test-add-more.page.html',
  styleUrls: ['./test-add-more.page.scss'],
})
export class TestAddMorePage implements OnInit {
  public addresses: any[] = [{
    id: 1,
    address: '',
    street: '',
    city: '',
    country: ''
  }];
  constructor() { }

  ngOnInit() {
  }
  addAddress() {
    this.addresses.push({
      id: this.addresses.length + 1,
      address: '',
      street: '',
      city: '',
      country: ''
    });
  }

  removeAddress(i: number) {
    if(this.addresses.length == 1){
      alert('you cant remove last one');
    }else{
      this.addresses.splice(i, 1);
    }
    
  }

  logValue(form) {
    console.log(form);
  }
}
