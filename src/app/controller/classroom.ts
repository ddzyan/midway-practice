import {
  Inject,
  Controller,
  Post,
  Body,
  Query,
  Get,
  Param,
} from '@midwayjs/decorator';
import { Validate } from '@midwayjs/validate';
import { ApiResponse } from '@midwayjs/swagger';
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
  @Validate()
  async create(
    @Body()
    createParams: CreateClassroomDTO
  ) {
    const classroom = await this.service.create(createParams);
    return classroom;
  }

  @Get('/', { summary: '分页获取班级列表' })
  @Validate()
  async index(
    @Query()
    queryParam: QueryParamDTO
  ) {
    const { page, limit } = queryParam;
    const users = await this.service.findAll(page, limit);
    return users;
  }

  @ApiResponse({
    status: 200,
    description: '删除结果',
  })
  @Get('/destroy/:classroomId', {
    summary: '删除管理员',
    description: '删除管理员',
  })
  @Validate()
  async destroy(@Param('classroomId') classroomId: number) {
    const res = await this.service.destroyClassroomAndUser(classroomId);
    return this.success(res);
  }
}
