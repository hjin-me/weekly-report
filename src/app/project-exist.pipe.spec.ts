import { ProjectExistPipe } from './project-exist.pipe';

describe('ProjectExistPipe', () => {
  it('create an instance', () => {
    const pipe = new ProjectExistPipe();
    expect(pipe).toBeTruthy();
  });
});
