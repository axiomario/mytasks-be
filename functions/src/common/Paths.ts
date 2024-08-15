export default {
  Base: '/',
  Users: {
    Base: '/users',
    Get: '/',
    Add: '/'
  },
  Tasks: {
    Base: '/tasks',
    Get: '/',
    Add: '/',
    Update: '/:id',
    Delete: '/:id'
  }
} as const;
