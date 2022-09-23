const types = {
  completed: 'Completed',
  uncompleted: 'Uncompleted',
  favorites: 'Favorites',
};

Object.defineProperty(types, 'default', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: '',
});

export default Object.freeze(types);
