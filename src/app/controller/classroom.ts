import {
  Inject,
  Provide,
  Controller,
  Post,
  Body,
  ALL,
  Query,
  Get,
} from '@midwayjs/decorator';
import { Context } from 'egg';

import { CreateClassroomInput } from '../dto/class.dto';
import ClassroomService from '../service/classroom';

@Provide()
@Controller('/api', { tagName: '班级接口', description: 'Classroom Router' })
export class ClassroomController {
  @Inject()
  ctx: Context;

  @Inject()
  classroomService: ClassroomService;

  @Post('/classroom', { summary: '添加班级', description: '' })
  async createClassroom(@Body(ALL) createParams: CreateClassroomInput) {
    const classroom = await this.classroomService.createClassroom(createParams);
    this.ctx.helper.success(classroom);
  }

  @Get('/classroom', { summary: '分页获取班级列表', description: '' })
  async getUser(@Query(ALL) { offset: reqOffset, take: reqTake }) {
    const offset = Number(reqOffset ?? 0);
    const take = Number(reqTake ?? 10);
    const users = await this.classroomService.getList(offset, take);

    this.ctx.helper.success(users);
  }
}
