import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public name = '';
  public tasks: { complete: any[]; incomplete: any[] } = {
    incomplete: [],
    complete: [],
  };

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.getTasks();
  }

  public addTask() {
    if (!this.name) {
      alert('You must put a task name');
      return;
    }

    this.appService.saveTask(this.name).subscribe(() => {
      this.getTasks();
      this.name = '';
    });
  }

  public completeTask(taskId: string) {
    this.appService.completeTask(taskId).subscribe(() => {
      this.getTasks();
    });
  }

  public editTaskName(task: any) {
    this.appService.editTaskName(task).subscribe(() => {
      this.getTasks();
    });
  }

  private getTasks() {
    this.appService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  public removeTask(taskId: string) {
    this.appService.removeTask(taskId).subscribe(() => {
      this.getTasks();
    });
  }
}
