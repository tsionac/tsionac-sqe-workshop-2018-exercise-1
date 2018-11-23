import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';

// describe('The javascript parser', () => {
//     it('is parsing an empty function correctly', () => {
//         assert.equal(
//             JSON.stringify(parseCode('')),
//             '{"type":"Program","body":[],"sourceType":"script"}'
//         );
//     });
//
//     it('is parsing a simple variable declaration correctly', () => {
//         assert.equal(
//             JSON.stringify(parseCode('let a = 1;')),
//             '{"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"a"},"init":{"type":"Literal","value":1,"raw":"1"}}],"kind":"let"}],"sourceType":"script"}'
//         );
//     });
// });
describe('Parser to table simple cases 1', () => {
    it('is testing a variable declaration with assignment', () => {
        assert.equal(JSON.stringify(parseCode('let a=3;')), '[{"line":1,"type":"VariableDeclaration","name":"a","condition":"","value":"3"}]');
    });
    it('is testing a if statement', () => {
        assert.equal(JSON.stringify(parseCode('if(x<3)y=5;')), '[{"line":1,"type":"IfStatement","name":"","condition":"x<3","value":""},{"line":1,"type":"AssignmentExpression","name":"y","condition":"","value":"5"}]');
    });
    it('is testing a base declaration', () => {
        assert.equal(JSON.stringify(parseCode('let y;')), '[{"line":1,"type":"VariableDeclaration","name":"y","condition":"","value":""}]');
    });
    it('is testing a declaration and assignments', () => {
        assert.equal(JSON.stringify(parseCode('let low,high,mid;low = 0;high = n - 1;')), '[{"line":1,"type":"VariableDeclaration","name":"low","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"high","condition":"","value":""},{"line":1,"type":"VariableDeclaration","name":"mid","condition":"","value":""},{"line":1,"type":"AssignmentExpression","name":"low","condition":"","value":"0"},{"line":1,"type":"AssignmentExpression","name":"high","condition":"","value":"n - 1"}]');
    });

});

describe('Parser to table cases 2', () => {
    it('is testing a for statement', () => {
        assert.equal(JSON.stringify(parseCode('for(let i = 0;i<array.length;i++){y=y+1;}')), '[{"line":1,"type":"ForStatement","name":"","condition":"i<array.length","value":""},{"line":1,"type":"VariableDeclaration","name":"i","condition":"","value":"0"},{"line":1,"type":"AssignmentExpression","name":"y","condition":"","value":"y+1"}]');

    });
    it('is testing a While Statement', () => {
        assert.equal(JSON.stringify(parseCode('while(low<=high){mid=(low+high)/2;}')), '[{"line":1,"type":"WhileStatement","name":"","condition":"low<=high","value":""},{"line":1,"type":"AssignmentExpression","name":"mid","condition":"","value":"(low+high)/2"}]');
    });
    it('is testing a While Statement and assignment', () => {
        assert.equal(JSON.stringify(parseCode('while (low <= high){\n' + 'mid = (low + high)/2;\n' + 'high = mid - 1;\n' +'}')), '[{"line":1,"type":"WhileStatement","name":"","condition":"low <= high","value":""},{"line":2,"type":"AssignmentExpression","name":"mid","condition":"","value":"(low + high)/2"},{"line":3,"type":"AssignmentExpression","name":"high","condition":"","value":"mid - 1"}]');
    });

    it('is analyzing a composed function declaration', () => {
        assert.equal(JSON.stringify(parseCode('function binarySearch(X, V, n){\n' + 'let low, high, mid;\n' +'low = 0;\n' + 'high = n - 1;\n' +' while (low <= high) {\n' + 'mid = (low + high)/2;\n' + 'if (X < V[mid])\n' + 'high = mid - 1;\n' + 'else if (X > V[mid])\n' + 'low = mid + 1;\n' + 'else\n' + 'return mid;\n' + '}\n' + 'return -1;\n' + '}')), '[{"line":1,"type":"FunctionDeclaration","name":"binarySearch","condition":"","value":""},{"line":1,"type":"Identifier","name":"X","condition":"","value":""},{"line":1,"type":"Identifier","name":"V","condition":"","value":""},{"line":1,"type":"Identifier","name":"n","condition":"","value":""},{"line":2,"type":"VariableDeclaration","name":"low","condition":"","value":""},{"line":2,"type":"VariableDeclaration","name":"high","condition":"","value":""},{"line":2,"type":"VariableDeclaration","name":"mid","condition":"","value":""},{"line":3,"type":"AssignmentExpression","name":"low","condition":"","value":"0"},{"line":4,"type":"AssignmentExpression","name":"high","condition":"","value":"n - 1"},{"line":5,"type":"WhileStatement","name":"","condition":"low <= high","value":""},{"line":6,"type":"AssignmentExpression","name":"mid","condition":"","value":"(low + high)/2"},{"line":7,"type":"IfStatement","name":"","condition":"X < V[mid]","value":""},{"line":8,"type":"AssignmentExpression","name":"high","condition":"","value":"mid - 1"},{"line":9,"type":"IfStatement","name":"","condition":"X > V[mid]","value":""},{"line":10,"type":"AssignmentExpression","name":"low","condition":"","value":"mid + 1"},{"line":12,"type":"ReturnStatement","name":"","condition":"","value":"mid"},{"line":14,"type":"ReturnStatement","name":"","condition":"","value":"-1"}]');
    });
    it('is testing a func declaration', () => {
        assert.equal(JSON.stringify(parseCode('function myFunction(p1, p2){\n' + 'return p1 * p2;\n' +'}')), '[{"line":1,"type":"FunctionDeclaration","name":"myFunction","condition":"","value":""},{"line":1,"type":"Identifier","name":"p1","condition":"","value":""},{"line":1,"type":"Identifier","name":"p2","condition":"","value":""},{"line":2,"type":"ReturnStatement","name":"","condition":"","value":"p1 * p2"}]');
    });

});
