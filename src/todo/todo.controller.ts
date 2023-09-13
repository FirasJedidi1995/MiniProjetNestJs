import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.tdo';
import { AddTodoDto } from './dto/add-todo.Dto';
import { UpperAndFusionPipe } from 'src/pipes/upper-and-fusion/upper-and-fusion.pipe';
import { DurationInterceptor } from 'src/interceptors/duration/duration.interceptor';
@UseInterceptors(DurationInterceptor)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('v2')
  getTodosV2(@Req() request: Request, @Res() response: Response) {
    console.log('recuperer la liste des todos');
    response.status(205);
    response.json({
      contenu: 'je suis une réponse ',
    });
  }
  @Get()
  getTodos(@Query() mesQueryParams: GetPaginatedTodoDto): Todo[] {
    return this.todoService.getTodos();
  }
  @Get('/:id')
  getTodoById(@Param('id', ParseIntPipe) id) {
    return this.todoService.getTodoById(id);
  }
  @Post()
  addTodo(@Body() newTodo: AddTodoDto): Todo {
    return this.todoService.addTodo(newTodo);
  }
  //supprimer un Todo via son id
  @Delete(':id')
  deleteTodos(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    id,
  ) {
    return this.todoService.deleteTodo(id);
  }
  @Put(':id')
  modifierTodos(
    @Param('id', ParseIntPipe) id,
    @Body() newtodo: Partial<AddTodoDto>,
  ) {
    return this.todoService.updateTodo(id, newtodo);
  }
  @Post('pipe')
  testPipe(@Body(UpperAndFusionPipe) data) {
    return data;
  }
}
