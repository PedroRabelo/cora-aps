import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SaveAnwserDTO } from './dto/save-answers.dto';
import { SurveysService } from './surveys.service';

@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) { }

  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveysService.create(createSurveyDto);
  }

  @Get('forms')
  getAllSurveysForm() {
    return this.surveysService.getSurveysForm();
  }

  @Get('questions/:surveyFormId')
  findSurveyQuestions(@Param('surveyFormId') surveyFormId: string) {
    return this.surveysService.findSurveyQuestions(surveyFormId);
  }

  @Post('answers')
  saveAnswers(@Body() answers: SaveAnwserDTO[]) {
    return this.surveysService.saveAnswers(answers);
  }

  @Patch('end/:surveyId')
  endSurvey(@Param('surveyId') surveyId: string) {
    return this.surveysService.endSurvey(surveyId);
  }
}
