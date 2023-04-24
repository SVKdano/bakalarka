import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../services/admin.service";
import {Nemocnica} from "../../models/Nemocnica";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  nemocnice:Nemocnica[] = [];

  constructor(private route:ActivatedRoute, private adminService:AdminService, private router: Router) {}

  ngOnInit() {
    this.adminService.getNemocnice().subscribe(
      (result:Nemocnica[]) =>
      {
        this.nemocnice = result;
        console.log(this.nemocnice);
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }

}
