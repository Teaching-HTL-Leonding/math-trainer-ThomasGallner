import { MathTrainerService } from './math-trainer.service';

describe('MathTrainerService', () => {
  let service: MathTrainerService = new MathTrainerService();

  it('can create a exercise with a specific amount of questions', () => {
    service.numOfQuestions = 15;
    service.generateExercise();
    expect(service.exercises.length).toBe(15);
  });
  it('can create a exercise with a specified operators', () => {
    service.operatorsUsed['/'] = false;
    service.operatorsUsed['*'] = false;
    service.operatorsUsed['-'] = false;
    service.generateExercise();
    let operatorIsOnlyPlus = true;

    for(let exercise of service.exercises){
      if(exercise.operator !== '+'){
        operatorIsOnlyPlus = false;
        return;
      }
    }

    expect(operatorIsOnlyPlus).toBe(true);
  });
});
