import {Component, Input, NgZone, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  public lat: number = 0;
  public lon: number = 0;
  public zoom: number = 20;


  constructor(
    private sanitizer: DomSanitizer,
    private router: ActivatedRoute,
  ) {

  }

  ngOnInit() {

    this.router.queryParamMap
      .subscribe((params) => {
        // @ts-ignore
        const {params: {lat, lon} = {}} = params
        this.lat = lat;
        this.lon = lon;
      })
  }


  photoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl( `https://embed.waze.com/iframe?zoom=${this.zoom}&lat=${this.lat}&lon=${this.lon}&pin=1`)
  }
}
