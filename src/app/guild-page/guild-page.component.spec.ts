import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildPageComponent } from './guild-page.component';
import { AppModule } from '../app.module';
import { By } from '@angular/platform-browser';

describe('GuildPageComponent', () => {
  let component: GuildPageComponent;
  let fixture: ComponentFixture<GuildPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildPageComponent ],
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click approve button, calls approve', () => {
    const spy = spyOn(component, 'approve');
    const el = fixture.debugElement.query(By.css('#approve')).nativeElement;

    el.click();

    expect(spy).toHaveBeenCalled();
  });

  it('click decline button, calls decline', () => {
    const spy = spyOn(component, 'decline');
    const el = fixture.debugElement.query(By.css('#decline')).nativeElement;

    el.click();

    expect(spy).toHaveBeenCalled();
  });

  it('if not accepted yet, reviewer div exists', () => {
    const el = fixture.debugElement.query(By.css('#review')).nativeElement;

    expect(el).toBeTruthy();
  });
});
