import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildComponent } from './guild.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../../app-routing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('GuildComponent', () => {
  let component: GuildComponent;
  let fixture: ComponentFixture<GuildComponent>;
  let router: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildComponent ],
      imports: [ HttpClientModule, AppRoutingModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = new class {
      navigate(...args: any) {}
    }

    fixture = TestBed.createComponent(GuildComponent);
    component = new GuildComponent(null, null, router, null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no guild found, redirects to dashboard', () => {
    const spy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  })
});
