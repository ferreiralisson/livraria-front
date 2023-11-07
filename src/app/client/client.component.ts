import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ClientDTO } from '../model/client-dto';
import { ClientService } from '../services/client.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogDeleteClientComponent } from '../dialog-delete-client/dialog-delete-client.component';
import { EventEmitterService } from '../services/event-emitter.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  isCpf: boolean = true;
  isCnpj: boolean = false;
  client: ClientDTO = {
    name: '',
    cpf: '',
    cnpj: '',
    telephone: '',
    cep: '',
  };
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options: FormGroup | any;
  displayedColumns: string[] = ['name', 'cpf', 'cnpj', 'telephone', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | any;
  @ViewChild(MatSort, { static: true }) sort: MatSort | any;
  dataSource: MatTableDataSource<ClientDTO> | any;
  clients: ClientDTO[] = [];
  loading: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private clientService: ClientService,
    private dialog: MatDialog,
    private events: EventEmitterService
  ) {
    this.validForm();
  }

  ngAfterContentInit() {
    this.events.subscribe('update-table-client', () => {
      this.findAllClient();
      this.events.destroy('update-calendar');
    });
  }

  ngOnInit(): void {
    this.findAllClient();
  }

  createClient() {
    this.clientService.createClient(this.client).subscribe((response) => {
      this.options.reset();
      this.findAllClient();
    });
  }

  validForm() {
    this.options = this._formBuilder.group({
      floatLabel: this.floatLabelControl,
      name: this.client.name,
      cpf: this.client.cpf,
      cnpj: this.client.cnpj,
      telephone: this.client.telephone,
      cep: this.client.cep,
    });
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  getCpfOrCnpj() {
    const type = this.floatLabelControl.value;
    if (String(type) === 'cpf') {
      this.isCpf = true;
      this.isCnpj = false;
      this.client.cnpj = '';
    } else if (String(type) === 'cnpj') {
      this.isCnpj = true;
      this.isCpf = false;
      this.client.cpf = '';
    }
  }

  findAllClient() {
    this.clients = [];
    this.clientService.findAll().subscribe((response) => {
      this.loading = true;
      response.forEach((element) => {
        let client: ClientDTO = {
          id: element.id,
          name: element.name,
          cpf: element.cpf,
          cnpj: element.cnpj,
          telephone: element.telephone,
        };

        this.clients.push(client);
      });
      this.dataSource = new MatTableDataSource(this.clients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  applyFilter(event: Event) {
    const search = (event.target as HTMLInputElement).value;
    this.dataSource.filter = search.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: id,
    };
    dialogConfig.width = '250px';

    this.dialog.open(DialogDeleteClientComponent, dialogConfig);
  }
}
