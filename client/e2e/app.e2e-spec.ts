import { MyLoginPage } from './app.po';

describe('my-login App', () => {
  let page: MyLoginPage;

  beforeEach(() => {
    page = new MyLoginPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
