import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environmenst";
import {Doktor} from "../models/Doktor";
import {DoktorPacient} from "../models/DoktorPacient";
import {Pacient} from "../models/Pacient";
import {DoktorPacientUpdate} from "../UpdateModels/DoktorPacientUpdate";
import {Alergie} from "../models/Alergie";
import {AlergiaUpdate} from "../UpdateModels/AlergiaUpdate";
import {PacientAlergie} from "../models/PacientAlergie";
import {Lieky} from "../models/Lieky";
import {LiekUpdate} from "../UpdateModels/LiekUpdate";
import {PacientLieky} from "../models/PacientLieky";
import {Ochorenie} from "../models/Ochorenie";
import {OchorenieUpdate} from "../UpdateModels/OchorenieUpdate";
import {PacientOchorenie} from "../models/PacientOchorenie";
import {Oddelenie} from "../models/Oddelenie";
import {OdporucaciListok} from "../models/OdporucaciListok";
import {ListokUpdate} from "../UpdateModels/ListokUpdate";

@Injectable({
  providedIn: 'root'
})
export class DoktorService {

  constructor(private http:HttpClient) { }

  //--------------------GET methods--------------------
  public getDoktori(osobneCislo: string) : Observable<Doktor[]>{
    return this.http.get<Doktor[]>(`${environment.apiUrl}/doktor/${osobneCislo}`);
  }

  public getPacientiDoktora(osobneCislo: string) : Observable<DoktorPacient[]> {
    return this.http.get<DoktorPacient[]>(`${environment.apiUrl}/doktorPacienti/${osobneCislo}`);
  }

  public getAllPacients() : Observable<Pacient[]> {
    return this.http.get<Pacient[]>(`${environment.apiUrl}/allPacients`);
  }

  public getAllAlergies() : Observable<Alergie[]> {
    return this.http.get<Alergie[]>(`${environment.apiUrl}/allAlergies`);
  }

  public getAllLieky() : Observable<Lieky[]> {
    return this.http.get<Lieky[]>(`${environment.apiUrl}/allLieky`);
  }

  public getAllOchorenia() : Observable<Ochorenie[]> {
    return this.http.get<Ochorenie[]>(`${environment.apiUrl}/allOchorenia`);
  }

  public getOddelenia(): Observable<Oddelenie[]> {
    return this.http.get<Oddelenie[]>(`${environment.apiUrl}/allOddelenia`);
  }

  public getDoktoroveListky(rodneCislo:string, osobneCislo:string) : Observable<OdporucaciListok[]> {
    return this.http.get<OdporucaciListok[]>(`${environment.apiUrl}/listky/${rodneCislo}/${osobneCislo}`);
  }

  //--------------------POST methods----------------------
  public addPacient(pacient: DoktorPacientUpdate) : Observable<DoktorPacient[]> {
    return this.http.post<DoktorPacient[]>(`${environment.apiUrl}/pridajPacienta`, pacient);
  }

  public addAlergia(alergia: AlergiaUpdate) : Observable<PacientAlergie[]> {
    return this.http.post<PacientAlergie[]>(`${environment.apiUrl}/pridajAlergiu`,alergia);
  }

  public addLiek(liek: LiekUpdate) : Observable<PacientLieky[]> {
    return this.http.post<PacientLieky[]>(`${environment.apiUrl}/pridajLiek`,liek);
  }

  public addOchorenie(ochorenie: OchorenieUpdate) : Observable<PacientOchorenie[]> {
    return this.http.post<PacientOchorenie[]>(`${environment.apiUrl}/pridajOchorenie`, ochorenie);
  }

  public addListok(listok: ListokUpdate) : Observable<OdporucaciListok[]> {
    return this.http.post<OdporucaciListok[]>(`${environment.apiUrl}/pridajListok`, listok);
  }

  //--------------------PUT methods-----------------------
  public updateAlergia(alergia: AlergiaUpdate) : Observable<PacientAlergie[]> {
    return this.http.put<PacientAlergie[]>(`${environment.apiUrl}/updateAlergiu`,alergia);
  }

  public updateLiek(liek: LiekUpdate) : Observable<PacientLieky[]> {
    return this.http.put<PacientLieky[]>(`${environment.apiUrl}/ukonciUzivanie`, liek);
  }

  public updateOchorenie(ochorenie: OchorenieUpdate) : Observable<PacientOchorenie[]> {
    return this.http.put<PacientOchorenie[]>(`${environment.apiUrl}/ukonciOchorenie`, ochorenie);
  }

  //-------------------DETELE methods---------------------
  public deleteAlergia(rodneCislo: string, kodAlergie:string) : Observable<PacientAlergie[]> {
    return this.http.delete<PacientAlergie[]>(`${environment.apiUrl}/zmazAlergiu/${rodneCislo}/${kodAlergie}`);
  }

  public deleteListok(datum:string, kod:string, id:string, osobne:String, rodne:string) : Observable<OdporucaciListok[]> {
    return this.http.delete<OdporucaciListok[]>(`${environment.apiUrl}/vymazListok/${datum}/${kod}/${id}/${osobne}/${rodne}`);
  }

}
