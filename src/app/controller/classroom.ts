import {
  Inject,
  Controller,
  Post,
  Body,
  Query,
  Get,
  Param,
} from '@midwayjs/core';
import { ApiResponse } from '@midwayjs/swagger';
import { ParseIntPipe } from '@midwayjs/validate';

import { CreateClassroomDTO } from '../model/dto/class';
import { QueryParamDTO } from '../model/dto/base';
import { ClassroomService } from '../service/classroom';
import { BaseController } from '../../core/baseController';

@Controller('/classroom', {
  tagName: 'Classroom',
  description: '班级管理控制器',
})
export class ClassroomController extends BaseController {
  @Inject()
  protected service: ClassroomService;

  @Post('/', { summary: '添加班级' })
  async create(
    @Body()
    param: CreateClassroomDTO
  ) {
    const classroom = await this.service.saveNew(param);
    return classroom;
  }

  @Get('/', { summary: '获取全部班级信息' })
  async index(
    @Query()
    queryParam: QueryParamDTO
  ) {
    const { page, limit } = queryParam;
    const res = await this.service.findAndCountAll(page, limit);
    return res;
  }

  @ApiResponse({
    status: 200,
    description: '删除结果',
  })
  @Get('/destroy/:classroomId', {
    summary: '删除管理员',
    description: '删除管理员',
  })
  async destroy(@Param('classroomId', [ParseIntPipe]) classroomId: number) {
    const res = await this.service.destroyClassroomAndUser(classroomId);
    return this.success(res);
  }
}
