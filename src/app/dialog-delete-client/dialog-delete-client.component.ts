import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../services/client.service';
import { EventEmitterService } from '../services/event-emitter.service';

@Component({
  selector: 'app-dialog-delete-client',
  templateUrl: './dialog-delete-client.component.html',
  styleUrls: ['./dialog-delete-client.component.css']
})
export class DialogDeleteClientComponent {

  id: string = '';

  constructor(
    private dialogRef: MatDialogRef<DialogDeleteClientComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private clientService: ClientService,
    private events: EventEmitterService
  ){
    if(data){
      this.id = data.id;
    }
  }

  closeModal(){
    this.dialogRef.close();
  }

  deleteClient(){
    this.clientService.deleteClient(this.id).subscribe((response) => {
      this.events.publish("update-table-client");
    })
  }

}
