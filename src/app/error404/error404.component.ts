import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css'],
})
export class Error404Component {
  message: string | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {
    if (data) {
      this.message = data.message;
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
