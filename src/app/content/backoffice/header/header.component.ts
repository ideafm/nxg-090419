import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'course-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input('drawer')
  public customDrawer: any;

  public headerTitle: SafeHtml = this._sanitizer
    .bypassSecurityTrustHtml('<h3 style="color:orange" >Team Board</h3>');

  public constructor(
    private _sanitizer: DomSanitizer
  ) {
  }

  public ngOnInit(): void {

  }

}
