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

import { CreateClassroomInput } from '../model/dto/class.dto';
import { QueryParam } from '../model/dto/base.dto';
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
  async getUser(@Query(ALL) queryParam: QueryParam) {
    const { page, limit } = queryParam;
    const users = await this.classroomService.getList(page, limit);

    this.ctx.helper.success(users);
  }
}
