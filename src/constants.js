export const DragItemTypes = {
  LAP: 'lap',
};

var LOCAL_STORAGE_KEYS = Object.create(null);
Object.assign(LOCAL_STORAGE_KEYS, {
  CURRENTLY_EDITING_JOG_ROUTE: 'currentlyEditingJogRoute',
});

export { LOCAL_STORAGE_KEYS };

let lap = {
  getLapLength() {
    return this.sides.reduce((acc, curr) => acc + curr, 0);
  },
};

export let laps = {
  s: Object.assign(Object.create(lap), {
    name: 's',
    sides: [170, 49, 180, 54],
  }),
  m: Object.assign(Object.create(lap), {
    name: 'm',
    sides: [350, 74, 350, 59],
  }),
  l: Object.assign(Object.create(lap), {
    name: 'l',
    sides: [520, 74, 530, 54],
  }),
  xl: Object.assign(Object.create(lap), {
    name: 'xl',
    sides: [600, 50, 650, 85],
  }),
  xxl: Object.assign(Object.create(lap), {
    name: 'xxl',
    sides: [1100, 74, 1100, 82],
  }),
};
