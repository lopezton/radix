import { RadixDashboardPage } from './app.po';

describe('radix-dashboard App', () => {
  let page: RadixDashboardPage;

  beforeEach(() => {
    page = new RadixDashboardPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
