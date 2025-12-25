import { parse } from 'acorn';
import { generate } from 'astring';
import { walk } from 'estree-walker';

/**
 * Instruments JavaScript code to automatically inject logStep() calls.
 * It injects logStep after every statement in a loop to capture state changes.
 */
export function instrumentCode(code: string): string {
  try {
    const ast = parse(code, {
      ecmaVersion: 2020,
      sourceType: 'script',
    });

    const scopeStack: Set<string>[] = [];

    // Initialize global scope.
    scopeStack.push(new Set(['arr', 'target']));

    const getInScopeVariables = () => {
      const vars = new Set<string>();
      scopeStack.forEach(scope => {
        scope.forEach(v => vars.add(v));
      });
      return Array.from(vars);
    };

    const createLogCall = () => {
      const varsToLog = getInScopeVariables();
      return {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: { type: 'Identifier', name: 'logStep' },
          arguments: [
            {
              type: 'ObjectExpression',
              properties: varsToLog.map(v => ({
                type: 'Property',
                key: { type: 'Identifier', name: v },
                value: { type: 'Identifier', name: v },
                kind: 'init',
                computed: false,
                method: false,
                shorthand: true,
              })),
            },
          ],
        },
      };
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    walk(ast as any, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      enter(node: any, parent: any) {
        if (node.type === 'BlockStatement') {
          const newScope = new Set<string>();
          scopeStack.push(newScope);

          if (
            parent &&
            (parent.type === 'FunctionDeclaration' ||
              parent.type === 'FunctionExpression' ||
              parent.type === 'ArrowFunctionExpression')
          ) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            parent.params.forEach((param: any) => {
              if (param.type === 'Identifier') {
                newScope.add(param.name);
              }
            });
          }
        }

        if (node.type === 'VariableDeclarator') {
          if (node.id.type === 'Identifier' && scopeStack.length > 0) {
            scopeStack[scopeStack.length - 1].add(node.id.name);
          }
        }

        // Instrument loops
        if (
          node.type === 'BlockStatement' &&
          parent &&
          (parent.type === 'ForStatement' ||
            parent.type === 'WhileStatement' ||
            parent.type === 'DoWhileStatement' ||
            parent.type === 'ForInStatement' ||
            parent.type === 'ForOfStatement')
        ) {
          const newBody = [];
          // Log at start
          newBody.push(createLogCall());

          for (const stmt of node.body) {
            newBody.push(stmt);
            // Log after every statement in the loop to catch assignments/declarations
            newBody.push(createLogCall());
          }
          node.body = newBody;
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      leave(node: any) {
        if (node.type === 'BlockStatement') {
          scopeStack.pop();
        }
      },
    });

    return generate(ast);
  } catch (error) {
    console.error('Instrumentation failed:', error);
    return code;
  }
}
