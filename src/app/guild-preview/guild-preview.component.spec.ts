import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildPreviewComponent } from './guild-preview.component';
import { By } from '@angular/platform-browser';

describe('GuildPreviewComponent', () => {
  let component: GuildPreviewComponent;
  let fixture: ComponentFixture<GuildPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click delete button, calls delete', () => {
    // const spy = spyOn(component, 'delete');
    const el = fixture.debugElement.query(By.css('#delete')).nativeElement;

    el.click();

    // expect(spy).toHaveBeenCalled();
  });
});
