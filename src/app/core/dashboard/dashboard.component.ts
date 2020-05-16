import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, empty } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { ProjectsService } from '../../projects/services/projects.service';
import { CustomersService } from '../../customers/services/customers.service';
import { getUser } from '../../auth/store/auth.selectors';
import { switchMap, take } from 'rxjs/operators';
import { Customer } from '../../customers/models/customer.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  projectsSub: Subscription;
  projects = [
    {
      title: 'জ্বর',
      photoUrl:
      'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(97).jpg',
      description: 'জ্বর এর জন্য ন্যাপা সেবন করুন। করোনা সন্দেহে ইথানল সেবন করছিলেন। সেটি আশু বন্ধ করুন। গলা ব্যাথার জন্য acetaminophen সেবন করতে পারেন। ডঃ ইসমাইল - ০১৮১২৩৪৫৬৭৮ ইন্টার্ন, ময়মনসিংহ মেডিকেল কলেজ'
    }
  ];

  customersSub: Subscription;
  customers: Customer[] = [
    {
      id: 1,
      name: 'Doctor 1',
      description: 'Dhanmondi',
      PhoneNumber: '01849325209'
    },
    {
      id: 2,
      name: 'Doctor 2',
      description: 'jatrabari',
      PhoneNumber: '0184935209'
    },
  ];

  constructor(
    private store: Store<AppState>,
    private projectsService: ProjectsService,
    private customersService: CustomersService
  ) {}

  ngOnInit() {
    this.initProjects();
    this.initCustomers();
  }

  ngOnDestroy() {
    if (this.projectsSub) {
      this.projectsSub.unsubscribe();
    }

    if (this.customersSub) {
      this.customersSub.unsubscribe();
    }
  }

  initProjects() {
    this.projectsSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.projectsService.get(user.uid);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe(projects => {
        if (projects.length === 0) {
          this.projectsService.addProjects(this.projects);
        }
      });
  }

  initCustomers() {
    this.customersSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.customersService.get(user.uid);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe(customers => {
        if (customers.length === 0) {
          this.customersService.addCustomers(this.customers);
        }
      });
  }
}
