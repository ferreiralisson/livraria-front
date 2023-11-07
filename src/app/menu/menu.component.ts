import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  
  constructor(private router: Router) {}

  menuOpc(opc: string) {
    switch (opc) {
      case 'user': {
        //statements;
        this.router.navigate(['/user'])
        break;
      }
      case 'library': {
        //statements;
        this.router.navigate(['/library'])
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }
}
