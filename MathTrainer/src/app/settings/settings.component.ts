import { Component, OnInit } from '@angular/core';
import { MathTrainerService } from '../math-trainer.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  constructor(public mathTrainerService: MathTrainerService){
  }
}
