export const DragItemTypes = {
  LAP: 'lap',
};

let lap = {
  getLapLength: function () {
    return this.sides.reduce((acc, curr) => acc + curr, 0);
  },
};

export let laps = {
  small: Object.assign(Object.create(lap), {
    name: 'small',
    sides: [170, 49, 180, 54],
  }),
  medium: Object.assign(Object.create(lap), {
    name: 'medium',
    sides: [350, 74, 350, 59],
  }),
  large: Object.assign(Object.create(lap), {
    name: 'large',
    sides: [520, 74, 530, 54],
  }),
  xlarge: Object.assign(Object.create(lap), {
    name: 'xlarge',
    sides: [600, 50, 650, 85],
  }),
  xxlarge: Object.assign(Object.create(lap), {
    name: 'xxlarge',
    sides: [1100, 74, 1100, 82],
  }),
};
