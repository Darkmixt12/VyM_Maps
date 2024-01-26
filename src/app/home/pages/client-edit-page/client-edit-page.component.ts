import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-client-edit-page',
  templateUrl: './client-edit-page.component.html',
  styleUrls: ['./client-edit-page.component.css']
})
export class ClientEditPageComponent {

  @Input() imgProfile?: string;

  public test = "https://res.cloudinary.com/dlsxaumhg/image/upload/v1706303599/locationsFolder/oljyhijjaiict3vtl8ie.jpg"
  constructor(){}


}
