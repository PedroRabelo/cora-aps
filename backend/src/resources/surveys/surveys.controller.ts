import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
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

  @Get('survey/:healthRecordId/:alias')
  findSurvey(@Param('healthRecordId') healthRecordId: string, @Param('alias') alias: string) {
    return this.surveysService.findSurveyByHealthRecordAndAlias(healthRecordId, alias);
  }

  @Get('forms/:alias')
  getSurveysFormByAlias(@Param('alias') alias: string) {
    return this.surveysService.getSurveysFormByAlias(alias);
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

  @Get('answers-points')
  calcAnswersPoints(@Query('healthRecordId') healthRecordId: string, @Query('alias') alias: string) {
    return this.surveysService.calcSurveyPoints(healthRecordId, alias);
  }
}
