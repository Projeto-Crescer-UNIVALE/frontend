import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alunos-diario',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './alunos-diario.component.html',
  styleUrls: ['./alunos-diario.component.css']
})
export class AlunosDiarioComponent implements OnInit {
  id!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }
}
