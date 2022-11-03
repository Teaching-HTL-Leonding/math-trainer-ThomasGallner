import { Component } from '@angular/core';
import { MathTrainerService } from '../math-trainer.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  constructor (public mathTrainerService: MathTrainerService){
  }

  public isExerciseValid(): boolean{
    if(this.mathTrainerService.exercises.length === 0) {
      return false;
    }
    for(let question of this.mathTrainerService.exercises){
      if(question.actualResult === null){
        return false;
      }
    }

    return true;
  }

  public getColorStyle(expectedVal: number, actualVal: number|null): String{
    if (actualVal === null || expectedVal !== actualVal){
      return "color:red";
    }
    return "color:green";
  }
}
