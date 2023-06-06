import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SaveAnwserDTO } from './dto/save-answers.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SurveysService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createSurveyDto: CreateSurveyDto) {
    const surveyExists = await this.prisma.survey.findMany({
      where: {
        healthRecordId: createSurveyDto.healthRecordId,
        surveyFormId: createSurveyDto.surveyFormId
      }
    })

    if (surveyExists.length > 0) {
      const history = surveyExists[0];

      await this.prisma.surveyHistory.create({
        data: {
          ...history,
          surveyId: history.id
        }
      })

      await this.prisma.survey.deleteMany({
        where: {
          healthRecordId: history.healthRecordId,
          surveyFormId: history.surveyFormId
        }
      })
    }

    return await this.prisma.survey.create({
      data: createSurveyDto,
    });
  }

  async findSurveyByHealthRecordAndAlias(healthRecordId: string, alias: string) {
    const res = await this.prisma.survey.findFirst({
      where: {
        healthRecordId,
        endDate: null,
        surveyForm: {
          alias
        }
      }
    })

    if (res === null) {
      throw new NotFoundException();
    }

    return res
  }

  async getSurveysForm() {
    return await this.prisma.surveyForm.findMany({
      where: {
        active: true
      },
      select: {
        id: true,
        title: true,
      }
    })
  }

  async getSurveysFormByAlias(alias: string) {
    return await this.prisma.surveyForm.findFirst({
      where: {
        active: true,
        alias
      },
      select: {
        id: true,
        title: true,
      }
    })
  }

  async findSurveyQuestions(surveyFormId: string) {
    const questions = await this.prisma.surveyQuestion.findMany({
      where: {
        surveyFormId,
        active: true,
      },
      orderBy: {
        order: 'asc',
      },
      select: {
        id: true,
        question: true,
        subtitle: true,
        order: true,
        answerType: true,
        answersOptions: {
          select: {
            id: true,
            answer: true,
            points: true
          }
        },
      },
    });

    return questions;
  }

  async saveAnswers(answersDTO: SaveAnwserDTO[]) {
    const answers: Prisma.SurveyAnswerCreateManyInput[] = [];

    answersDTO.map((ans: Prisma.SurveyAnswerCreateManyInput) => {
      return answers.push({
        surveyId: ans.surveyId,
        surveyQuestionId: ans.surveyQuestionId,
        answer: ans.answer,
        points: ans.points,
        answerOptionId: ans.answerOptionId
      });
    });

    await this.prisma.surveyAnswer.createMany({ data: answers });
  }

  async endSurvey(surveyId: string) {
    await this.prisma.survey.update({
      where: { id: surveyId },
      data: {
        endDate: new Date(),
      },
    });
  }

  async calcSurveyPoints(healthRecordId: string, surveyAlias: string) {
    const answersPoints = await this.prisma.surveyAnswer.groupBy({
      by: ['surveyId'],
      where: {
        survey: {
          healthRecordId,
          surveyForm: {
            alias: surveyAlias
          }
        }
      },
      _sum: {
        points: true
      },
    })

    const surveyForm = await this.prisma.surveyForm.findFirst({
      where: {
        alias: surveyAlias
      },
      select: {
        id: true,
        alias: true,
        resultLowRisk: true,
        resultMediumRisk: true,
        resultHighRisk: true
      }
    })

    let result: string
    const points = answersPoints[0]._sum.points

    if (points <= surveyForm.resultLowRisk) result = 'Baixo Risco'
    if (points > surveyForm.resultLowRisk && points <= surveyForm.resultMediumRisk) result = 'Médio Risco'
    if (points >= surveyForm.resultHighRisk) result = 'Alto Risco'

    return {
      surveyId: answersPoints[0].surveyId,
      alias: surveyForm.alias,
      points,
      result
    };
  }
}
