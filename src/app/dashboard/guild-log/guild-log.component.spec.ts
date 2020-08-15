import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildLogComponent } from './guild-log.component';

describe('GuildLogComponent', () => {
  let component: GuildLogComponent;
  let fixture: ComponentFixture<GuildLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
