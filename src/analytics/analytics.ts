export const gaSendTab = (tabName: string) => {
  window.gtag && window.gtag('event', 'click', {
    event_category: 'Tab',
    event_label: tabName
  });
}

export const getOutboundLink = (url: string) => {
  window.gtag && window.gtag('event', 'click', {
    event_category: 'outbound',
    event_label: url,
    transport_type: 'beacon',
    event_callback: () => { document.location.href = url; }
  });
}

export const gaSendRemove = (item: string) => {
  window.gtag && window.gtag('event', 'click', {
    event_category: 'Remove',
    event_label: item
  });
}

export const gaSendAdd = (item: string, qty?: number) => {
  window.gtag && window.gtag('event', 'click', {
    event_category: 'Add',
    event_label: item,
    value: qty || 1
  });
}

export const gaSendChange = (mainUI: boolean, selectType: string, value: string) => {
  window.gtag && window.gtag('event', 'change', {
    event_category: `Select_${mainUI ? 'main': 'existing'}_${selectType}`,
    event_label: value
  });
}