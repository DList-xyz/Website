import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGuildComponent } from './edit-guild.component';

describe('EditGuildComponent', () => {
  let component: EditGuildComponent;
  let fixture: ComponentFixture<EditGuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
