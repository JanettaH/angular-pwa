import {Component, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos = [
    {title: 'Clean my room'},
    {title: 'Do the dishes'}
  ];
  title = '';

  constructor(private todoService: TodoService) {
    this.todoService.init();
    this.todoService.getAll().then(docs => this.todos = docs.rows.map(result => result.doc));
    this.todoService.track()
      .on('change', change => {
        console.log(change);
        this.todoService.getAll().then(docs => this.todos = docs.rows.map(result => result.doc));
      });
  }

  ngOnInit() {
  }

  addTodo() {
    this.todoService.create(this.title);
    this.title = '';
  }

  removeTodo(item) {
    this.todoService.delete(item);
  }

  sync() {
    this.todoService.sync();
  }
}
