export const gaSendTab = (tabName: string) => {
  window.ga && window.ga.send('send', 'event', 'Tab', 'click', tabName);
}

export const gaSendEdit = (toggle: 'on' | 'off') => {
  window.ga && window.ga.send('send', 'event', 'Edit_toggle', 'click', toggle);
}

export const gaSendRemove = (item: string) => {
  window.ga && window.ga.send('send', 'event', 'Remove', 'click', item);
}

export const gaSendAdd = (btnName: string, item: string, qty?: number) => {
  window.ga && window.ga.send(
    'send',
    'event',
    'Add',
    'click',
    btnName,
    qty || 1,
    {
      dimension1: item
    }
  );
}

export const gaSendChange = (mainUI: boolean, selectType: string, value: string) => {
  window.ga && window.ga.send(
    'send',
    'event',
    `Select_${mainUI ? 'main': 'existing'}_${selectType}`,
    'change',
    value
   );
}