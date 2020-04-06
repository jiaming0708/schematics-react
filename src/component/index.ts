import { Rule, SchematicContext, Tree, apply, url, mergeWith, applyTemplates, move } from '@angular-devkit/schematics';
import { strings, Path, basename, dirname, normalize } from '@angular-devkit/core';

import { OptionSchema } from './schema';

function parseName(path: string, name: string) {
  const nameWithoutPath = basename(name as Path);
  const namePath = dirname((path + '/' + name) as Path);

  return {
    name: nameWithoutPath,
    path: normalize('/' + namePath),
  };
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function(_options: OptionSchema): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    if (!_options.path) {
      _options.path = '';
    }

    const parsePath = parseName(_options.path, _options.name);

    const templateSource = apply(url('./files'), [
      applyTemplates({
        ...strings,
        ...parsePath,
      }),
      move(parsePath.path),
    ]);

    return mergeWith(templateSource);
  };
}
