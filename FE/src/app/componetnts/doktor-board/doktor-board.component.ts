import {Component, OnInit} from '@angular/core';
import {Chart,registerables} from "chart.js";
import {DoktorService} from "../../services/doktor.service";
import {GraphData} from "../../models/GraphData";
import {ActivatedRoute} from "@angular/router";
Chart.register(...registerables);

@Component({
  selector: 'app-doktor-board',
  templateUrl: './doktor-board.component.html',
  styleUrls: ['./doktor-board.component.css']
})
export class DoktorBoardComponent implements OnInit {
  data:GraphData[] = [];

  mesiace:any[] = [];
  pocty:any[] = [];

  idDoktor: string = this.route.snapshot.paramMap.get('osobnecislo')!;

  constructor(private doctorService:DoktorService, private route:ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('osobnecislo');
    this.doctorService.getChartData(id!).subscribe(
      (result:GraphData[]) => {
        this.data = result;

        if (this.data != null) {
          for (let i=0; i < this.data.length; i++)
          {
            this.mesiace.push(this.data[i].mesiac);
            this.pocty.push(this.data[i].pocet);
          }

          this.renderChart(this.mesiace,this.pocty);
        }
      }
    )


  }

  renderChart(pMesiace:any, pPocty:any) {
    const myChart = new Chart("chart", {
      type: 'bar',
      data: {
        labels: pMesiace,
        datasets: [{
          label: 'Počet vyšetrených pacientov',
          data: pPocty,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Počet záznamov'
            }
          },
          x: {
            title: {
              display: true,
              text: "Mesiac"
            }
          }
        }
      }
    });
  }

  printPage() {
    window.print();
  }
}
