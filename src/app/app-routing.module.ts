import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { LibraryComponent } from './library/library.component';

const routes: Routes = [
  {path: 'user', component: ClientComponent},
  {path: 'library', component: LibraryComponent}
];

export const AppRoutingModule = RouterModule.forRoot(routes);
