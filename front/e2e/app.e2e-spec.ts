import { FrontBPage } from './app.po';

describe('front-b App', () => {
  let page: FrontBPage;

  beforeEach(() => {
    page = new FrontBPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
