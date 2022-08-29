import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './taskStatus.enum';

@Injectable()
export class TasksService {
  constructor(
    private taskRepository: TaskRepository
  ) { }

  async getAllTasks(user: User, filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.taskRepository.findAllTasks(user, filterDto);
  }
  
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findTaskById({ id });

    if (!found) {
      throw new NotFoundException(`Task with id [${id}] not found`);
    }

    return found;
  }

  async deleteTask(id: number): Promise<void> {
    const found = await this.getTaskById(id);

    await found.remove();
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    if (task) {
      task.status = status;
    }

    return await task.save();
  }
}
