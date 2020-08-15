import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildWidgetComponent } from './guild-widget.component';

describe('GuildWidgetComponent', () => {
  let component: GuildWidgetComponent;
  let fixture: ComponentFixture<GuildWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
