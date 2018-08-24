import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare const google
/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  myLocation;
  map;
  marker;
  markers=[];
  coordenadas=[{lat:4.603899,lng: -74.067230},
    {lat:4.609375,lng: -74.082079},
    {lat:4.613610,lng: -74.066372},
    {lat:4.581586,lng: -74.080585},
    {lat:4.556693,lng: -74.112414},
    {lat:4.521438,lng: -74.089390},
    {lat:4.550937,lng: -74.141717}]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
    this.initMap();
    let bounds = new google.maps.LatLngBounds();
    this.coordenadas.forEach((coord) => {
      this.addMarker(coord);
      bounds.extend(coord);
      
    })
    this.map.fitBounds(bounds);
  }
  addMarker(coord){
    let internalMarker= new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: coord
    });
    //internalMarker.addListener('click',()=>{

    //})
    console.log(internalMarker);
    this.markers.push(internalMarker);
  }
  clearAllMarkers(){
    this.markers.forEach((marker)=>{
      marker.setMap(null)//elimina cada marcador
    })
    this.markers=[]//arreglo vacio
  }
  initMap() {
    
    this.myLocation = {lat: 4.646412, lng: -74.077778};
    console.log(this.myLocation)
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: this.myLocation,
      mapTypeId: 'satellite'
    });
    this.marker= new google.maps.Marker({
      map:this.map,
      draggable:true,
      animation:google.maps.Animation.DROP,
      position:this.myLocation
    });
    this.marker.addListener('click',this.toggleBounce.bind(this));
    console.log(this.marker)
  }
  toggleBounce(){
    if (this.marker.getAnimation()!==null){
      this.marker.sendAnimation(null);
    }else{
      this.marker.sendAnimation(google.maps.Animation.BOUNCE);
    }
  }
}
