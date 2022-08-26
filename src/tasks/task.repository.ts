import { Bind, Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/createTask.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./taskStatus.enum";

export class TaskRepository extends Repository<Task> {
  
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save();

    return task;
  }

}