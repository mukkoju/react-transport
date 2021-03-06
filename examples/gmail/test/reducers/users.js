import assert from 'power-assert';
import reducer from '../../src/reducers/users';
import * as actions from '../../src/actions';

describe('Reducers > users', () => {
  it('returns default state', () => {
    assert.deepEqual(reducer(undefined, { type: '' }), {
      show: [],
      list: [],
      entities: {}
    });
  });

  it('adds a user', () => {
    let state = reducer(undefined, actions.addUser({ name: 'OK', email: 'ok@example.com' }));
    assert.deepEqual(state, {
      show: [],
      list: ['ok@example.com'],
      entities: {
        'ok@example.com': {
          name: 'OK',
          presence: null,
          status: '',
          error: false
        }
      }
    });

    state = reducer(state, actions.addUser({ name: 'NG', email: 'ng@example.com' }));
    assert.deepEqual(state, {
      show: [],
      list: ['ok@example.com', 'ng@example.com'],
      entities: {
        'ok@example.com': {
          name: 'OK',
          presence: null,
          status: '',
          error: false
        },
        'ng@example.com': {
          name: 'NG',
          presence: null,
          status: '',
          error: false
        }
      }
    });
  });

  it('ignores adding duplicated users', () => {
    let state = {
      show: [],
      list: ['ok@example.com'],
      entities: {
        'ok@example.com': {
          name: 'OK',
          presence: null,
          status: '',
          error: false
        }
      }
    };

    state = reducer(state, actions.addUser({ name: 'OK', email: 'ok@example.com' }));

    assert.deepEqual(state, {
      show: [],
      list: ['ok@example.com'],
      entities: {
        'ok@example.com': {
          name: 'OK',
          presence: null,
          status: '',
          error: false
        }
      }
    });
  });

  it('removes a user', () => {
    const state = {
      list: ['ng@example.com'],
      entities: {
        'ng@example.com': {
          name: 'NG',
          presence: null,
          status: '',
          error: false
        }
      }
    };

    assert.deepEqual(reducer(state, actions.removeUser({ email: 'ng@example.com' })), {
      list: [],
      entities: {}
    });
  });

  it('ignores removing missing users', () => {
    let state = {
      list: ['ok@example.com'],
      entities: {
        'ok@example.com': {
          name: 'OK',
          presence: null,
          status: '',
          error: false
        }
      }
    };

    state = reducer(state, actions.removeUser({ name: 'NG', email: 'ng@example.com' }));

    assert.deepEqual(state, {
      list: ['ok@example.com'],
      entities: {
        'ok@example.com': {
          name: 'OK',
          presence: null,
          status: '',
          error: false
        }
      }
    });
  });
});
