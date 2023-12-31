import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../intertface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey      : string = 'RZWpnmhljKNRQd6wPKAfkVYfQoRK6e2B';
  private servicioUrl : string  = 'https://api.giphy.com/v1/gifs';
  private _historial  : string[] = [];


  //todo: Cambiar el todo por su tipo correspondiente
  public resultados :Gif[]=[];

  get historial() {
    
    return [...this._historial];
  }

  constructor ( private http:HttpClient){
    //! Esto lo mostramos en el localstorage
    this._historial = JSON.parse( localStorage.getItem('historial')! )|| [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')! )|| [];

    // Resultados

    // if(localStorage.getItem('historial')){
    //     this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }
  }

  buscarGifs( query:string = ''){

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice( 0,10 );

      //! Esto vamos a grabar en el localstorage
      localStorage.setItem('historial', JSON.stringify(this._historial) );
      // console.log('====================================');
      // console.log(this._historial);
      // console.log('====================================');
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);


    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
    .subscribe( ( resp  ) => { 
      // console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados) );
    })


  }
}
