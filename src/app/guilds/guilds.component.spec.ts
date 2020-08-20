import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildsComponent } from './guilds.component';

describe('GuildsComponent', () => {
  let component: GuildsComponent;
  let fixture: ComponentFixture<GuildsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`query length > 1, title shows 'Result'`, () => {
    component.query = 'a';

    expect(component.title).toBe('Results');
  });

  it('paginate, reduces array correctly', () => {
    component.page = 2;
    component.size = 4;

    const result = component.paginate([1,2,3,4,5,6,7,8]);

    expect(result).toBe([5,6,7,8]);
  });
});
