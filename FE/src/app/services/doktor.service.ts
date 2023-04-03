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
import {ZaznamUpdate} from "../UpdateModels/ZaznamUpdate";
import {Zaznam} from "../models/Zaznam";
import {Vysetrenie} from "../models/Vysetrenie";
import {VysetrenieZaznamUpdate} from "../UpdateModels/VysetrenieZaznamUpdate";
import {VysetrenieZaznam} from "../models/VysetrenieZaznam";
import {AlergieZdielanie} from "../models/AlergieZdielanie";
import {LiekyZdielanie} from "../models/LiekyZdielanie";
import {OchoreniaZdielanie} from "../models/OchoreniaZdielanie";

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

  public getAllVysetrenia() : Observable<Vysetrenie[]> {
    return this.http.get<Vysetrenie[]>(`${environment.apiUrl}/getAllVysetria`);
  }

  public getMnouZazdielane(osobneCislo:string) : Observable<AlergieZdielanie[]> {
    return this.http.get<AlergieZdielanie[]>(`${environment.apiUrl}/mnouZdielaneAlergie/${osobneCislo}`);
  }

  public getMneZazdielane(osobneCislo:string) : Observable<AlergieZdielanie[]> {
    return this.http.get<AlergieZdielanie[]>(`${environment.apiUrl}/mneZdielaneAlergie/${osobneCislo}`);
  }

  public getMnouZazdielaneLieky(osobneCislo:string) : Observable<LiekyZdielanie[]> {
    return this.http.get<LiekyZdielanie[]>(`${environment.apiUrl}/mnouZdielaneLieky/${osobneCislo}`);
  }

  public getMneZazdielaneLieky(osobneCislo:string) : Observable<LiekyZdielanie[]> {
    return this.http.get<LiekyZdielanie[]>(`${environment.apiUrl}/mneZdielaneLieky/${osobneCislo}`);
  }

  public getMneZazdielaneOchorenia(osobneCislo:string) : Observable<OchoreniaZdielanie[]> {
    return this.http.get<OchoreniaZdielanie[]>(`${environment.apiUrl}/mneZdielaneOchorenia/${osobneCislo}`);
  }

  public getMnouZazdielaneOchorenia(osobneCislo:string) : Observable<OchoreniaZdielanie[]> {
    return this.http.get<OchoreniaZdielanie[]>(`${environment.apiUrl}/mnouZdielaneOchorenia/${osobneCislo}`);
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

  public addZaznam(zaznam: ZaznamUpdate) : Observable<number> {
    return this.http.post<number>(`${environment.apiUrl}/pridajZaznam`, zaznam);
  }

  public pridajVysetrenieKZaznamu(vystrenie: VysetrenieZaznamUpdate) : Observable<VysetrenieZaznam[]> {
    return this.http.post<VysetrenieZaznam[]>(`${environment.apiUrl}/pridajVysetrenieZaznamu`, vystrenie);
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

  public updateZaznam(zaznam:ZaznamUpdate) : Observable<Zaznam[]> {
    return this.http.put<Zaznam[]>(`${environment.apiUrl}/updateZaznam`, zaznam);
  }

  //-------------------DETELE methods---------------------
  public deleteAlergia(rodneCislo: string, kodAlergie:string) : Observable<PacientAlergie[]> {
    return this.http.delete<PacientAlergie[]>(`${environment.apiUrl}/zmazAlergiu/${rodneCislo}/${kodAlergie}`);
  }

  public deleteListok(datum:string, kod:string, id:string, osobne:String, rodne:string) : Observable<OdporucaciListok[]> {
    return this.http.delete<OdporucaciListok[]>(`${environment.apiUrl}/vymazListok/${datum}/${kod}/${id}/${osobne}/${rodne}`);
  }

  public deleteVysetrenie(kod:string, idzaznam:number) : Observable<VysetrenieZaznam[]> {
    return this.http.delete<VysetrenieZaznam[]>(`${environment.apiUrl}/vymazVystrenie/${kod}/${idzaznam}`);
  }

}
