import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/createTask.dto';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';
import { TaskStatusValidationPipe } from './pipes/taskStatusValidation.pipe';
import { Task } from './task.entity';

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // @UsePipes(ValidationPipe)
  // async getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
  //   if (Object.keys(filterDto).length) {
  //     return await this.tasksService.getTasksWithFilters(filterDto);
  //   }

  //   return await this.tasksService.getAllTasks();
  // }

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() CreateTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(CreateTaskDto);
  }

  // @Patch(':id/status')
  // async updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Promise<Task> {
  //   return await this.tasksService.updateTaskStatus(id, status);
  // }

  // @Delete(':id')
  // async deleteTask(@Param('id') id: string): Promise<void> {
  //   return await this.tasksService.deleteTask(id);
  // }
}
