import { IsNumber, IsOptional, IsString } from 'class-validator';
import { SurveyAnswerEntity } from 'src/resources/surveys/entities/survey-answer.entity';

export class SaveAnwserDTO extends SurveyAnswerEntity {
  @IsString()
  answer: string;

  @IsNumber()
  points: number;

  @IsNumber()
  @IsOptional()
  answerOptionId: number;

  @IsString()
  surveyQuestionId: string;

  @IsString()
  surveyId: string;
}
