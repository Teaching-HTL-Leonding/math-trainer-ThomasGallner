import { Injectable } from '@angular/core';
import { first } from 'rxjs';

export interface MathExercise {
  numA: number;
  operator: String;
  numB: number;
  expectedResult: number;
  actualResult: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class MathTrainerService {
  public showResults: boolean = false;
  public exercises!: MathExercise[];
  public numOfDigits!: number;
  public numOfQuestions!: number;
  public operatorsUsed!: { [key: string]: boolean };

  constructor() {
    this.resetSettings();
  }

  private resetSettings() {
    this.operatorsUsed = {
      '+': true,
      '-': true,
      '*': true,
      '/': true,
    };
    this.numOfDigits = 1;
    this.numOfQuestions = 10;
    this.exercises = [];
  }

  public generateExercise() {
    this.showResults = false;
    this.exercises = [];

    let rndNum: number;
    let rndOperator: String;
    let firstNum: number;
    let secNum: number;
    let operators = [];

    for (let i = 0; i < this.numOfQuestions; i++) {
      operators = this.getSelectedOperators();
      rndNum = this.getRandomInt(0, operators.length);
      rndOperator = operators[rndNum];

      firstNum = this.getRandomIntWithSpecDigits(this.numOfDigits);
      secNum = this.getRandomIntWithSpecDigits(this.numOfDigits);
      if (rndOperator === '-') {
        while (secNum > firstNum) {
          secNum = this.getRandomIntWithSpecDigits(this.numOfDigits);
        }
      } else if (rndOperator === '/') {
        firstNum = this.getRandomIntWithSpecDigits(this.numOfDigits, true);
        while (firstNum % secNum !== 0) {
          secNum = this.getRandomIntWithSpecDigits(this.numOfDigits, true);
        }
      }

      let exercise: MathExercise = {
        numA: firstNum,
        numB: secNum,
        operator: rndOperator,
        expectedResult: eval(
          firstNum.toString() + rndOperator + secNum.toString()
        ),
        actualResult: null,
      };
      this.exercises.push(exercise);
    }
  }

  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min); // max is exclusive and min is inclusive
  }
  private getRandomIntWithSpecDigits(
    numOfDigits: number,
    even: boolean = false
  ): number {
    let min: number = 1;
    let help: string = '1';

    help += '0'.repeat(numOfDigits);

    let max = parseInt(help);
    if (even) {
      let tmp = this.getRandomInt(min, max);
      return tmp - (tmp % 2);
    } else {
      return this.getRandomInt(min, max);
    }
  }
  private getSelectedOperators() {
    let operators = [];
    for (let j = 0; j < Object.keys(this.operatorsUsed).length; j++) {
      if (Object.values(this.operatorsUsed)[j] === true) {
        operators.push(Object.keys(this.operatorsUsed)[j]);
      }
    }

    return operators;
  }

  public oneOperatorSelected(): boolean {
    for (let operator of Object.values(this.operatorsUsed)) {
      if (operator) {
        return true;
      }
    }

    return false;
  }
}
