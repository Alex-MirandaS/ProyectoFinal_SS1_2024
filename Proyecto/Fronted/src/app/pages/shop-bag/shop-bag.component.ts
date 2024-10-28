import { Component } from '@angular/core';
import { ShopBagService } from '../../services/ShopBagService';

@Component({
  selector: 'app-shop-bag',
  templateUrl: './shop-bag.component.html',
  styleUrls: ['./shop-bag.component.css']
})
export class ShopBagComponent {
checkout() {
throw new Error('Method not implemented.');
}
  cart = this.shopBagService.getCart();

  constructor(private shopBagService: ShopBagService) {}
}
