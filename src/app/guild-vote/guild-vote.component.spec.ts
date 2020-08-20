import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildVoteComponent } from './guild-vote.component';
import { By } from '@angular/platform-browser';

describe('GuildVoteComponent', () => {
  let component: GuildVoteComponent;
  let fixture: ComponentFixture<GuildVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click vote button, vote is called', () => {
    const spy = spyOn(component, 'vote');
    const el = fixture.debugElement.query(By.css('#vote')).nativeElement;

    el.click();

    expect(spy).toHaveBeenCalled();
  });
});
