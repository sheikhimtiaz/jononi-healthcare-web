import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { environment } from '../../../environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  url = environment.firebase.databaseURL;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  get userId() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    }
  }

  add(project: Project, _userId: string) {
    const projects = this.db.list(`projects/`);
    return projects.push(project);
  }

  addProjects(projects: Project[]) {
    projects.forEach( (project: Project) => {
      this.db.list(`projects/`).push(project);
    });
  }

  get(_userId: string) {
    return this.db.list(`projects/`).snapshotChanges();
  }

  update(project: Project, _userId: string) {
    return of(this.db.object(`projects/` + project.key)
      .update({
        title: project.title,
        description: project.description,
        photoUrl: project.photoUrl
      }));
  }

  delete(project: Project, _userId: string) {
    return this.db.object(`projects/` + project.key).remove();
  }
}
