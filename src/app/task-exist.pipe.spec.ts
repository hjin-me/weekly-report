import { TaskExistPipe } from './task-exist.pipe';

describe('ProjectExistPipe', () => {
  it('create an instance', () => {
    const pipe = new TaskExistPipe();
    expect(pipe).toBeTruthy();
  });
});
