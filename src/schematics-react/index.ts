import { Rule, SchematicContext, Tree, apply, url, move, mergeWith, applyTemplates, ActionList } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

import { OptionSchema } from './schema';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function schematicsReact(_options: OptionSchema): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    if (!_options.path) {
      _options.path = './';
    }

    if (!_options.path.startsWith('/')) {
    }

    _tree.getDir(_options.name)

    const templateSource = apply(url('./files'), [
      applyTemplates({
        ..._options,
        ...strings,
      }),
      move(_options.path),
    ]);

    return mergeWith(templateSource);
  };
}
