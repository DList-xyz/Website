import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuildComponent } from './add-guild.component';
import { By } from '@angular/platform-browser';

describe('AddGuildComponent', () => {
  let component: AddGuildComponent;
  let fixture: ComponentFixture<AddGuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('invalid guild id, form invalid', () => {
    component.form.get('guildId').setValue('123');

    expect(component.form.valid).toBeFalse();
  });

  it('valid guild id, form valid', () => {
    component.form.get('guildId').setValue('598565371162656788');

    expect(component.form.valid).toBeTrue();
  });

  it('invalid client id, form invalid', () => {
    component.form.get('clientId').setValue('123');

    expect(component.form.valid).toBeFalse();
  });

  it('valid client id, form valid', () => {
    component.form.get('clientId').setValue('598565371162656788');

    expect(component.form.valid).toBeTrue();
  });

  it('add button clicked, submit() is called', () => {
    const spy = spyOn(component, 'submit');
    const el = fixture.debugElement.query(By.css('#submit')).nativeElement;

    el.click();

    expect(spy).toHaveBeenCalled();
  });

  it('update button clicked in edit mode, update() is called', () => {
    component.editing = true;

    const spy = spyOn(component, 'update');
    const el = fixture.debugElement.query(By.css('#update')).nativeElement;

    el.click();

    expect(spy).toHaveBeenCalled();
  });
});
