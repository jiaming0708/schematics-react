import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const GENERATE_COMONENT = 'component';

const collectionPath = path.join(__dirname, '../collection.json');


describe('schematics-react', () => {
  const runner = new SchematicTestRunner('schematics', collectionPath);

  it('create a component', () => {
    const option = {
      name: 'button'
    };

    const tree = runner.runSchematic(GENERATE_COMONENT, option, Tree.empty());

    const files = tree.files;

    expect(files).toEqual(
      jasmine.arrayContaining([
        '/Button/Button.jsx',
        '/Button/Button.scss',
        '/Button/package.json',
      ]),
    );
  });

  it('create a component with path', () => {
    const option = {
      name: 'button',
      path: 'src',
    };

    const tree = runner.runSchematic(GENERATE_COMONENT, option, Tree.empty());

    const files = tree.files;

    expect(files).toEqual(
      jasmine.arrayContaining([
        '/src/Button/Button.jsx',
        '/src/Button/Button.scss',
        '/src/Button/package.json',
      ]),
    );
  });

  it('create a component, the name include path', () => {
    const option = {
      name: 'src/button',
    };

    const tree = runner.runSchematic(GENERATE_COMONENT, option, Tree.empty());

    const files = tree.files;

    expect(files).toEqual(
      jasmine.arrayContaining([
        '/src/Button/Button.jsx',
        '/src/Button/Button.scss',
        '/src/Button/package.json',
      ]),
    );
  });
});
