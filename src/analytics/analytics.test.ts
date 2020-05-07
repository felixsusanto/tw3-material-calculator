import * as gtag from 'analytics/analytics';

describe('window.gtag', () => {
  window.gtag = jest.fn();
  it('should work', () => {
    gtag.gaSendAdd('item', 10);
    gtag.gaSendAdd('item');
    gtag.gaSendChange(true, 'type', 'value');
    gtag.gaSendChange(false, 'type', 'value');
    gtag.gaSendRemove('item');
    gtag.gaSendTab('name');
  });
  it('getOutboundLink should work', () => {
    (window.gtag as jest.Mock<any>).mockImplementation((_, __, fields) => {
      fields.event_callback();
    });
    gtag.getOutboundLink('url');
  });
});