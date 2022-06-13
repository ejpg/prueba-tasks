import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public completeTask(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/complete-task`, { id });
  }

  public editTaskName(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-name`, {
      id: task._id,
      name: task.name,
    });
  }

  public getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks`);
  }

  public saveTask(name: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/task`, { name });
  }

  public removeTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove-task/${id}`);
  }
}
