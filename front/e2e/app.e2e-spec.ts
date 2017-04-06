import { Ang2Page } from './app.po';

describe('ang2 App', () => {
  let page: Ang2Page;

  beforeEach(() => {
    page = new Ang2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
