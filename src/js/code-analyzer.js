import * as esprima from 'esprima';

export {parseCode};


let table = [];
const parseCode = (codeToParse) => {

    let pp = esprima.parseScript(codeToParse, {loc: true, range: true}, function (y) {
        y['valuetext'] = codeToParse.substring(y.range[0], y.range[1]);
    });
    table = [];
    for (let bodyOfProg = 0; bodyOfProg < pp.body.length; bodyOfProg++) {
        typeparse[pp.body[bodyOfProg].type](pp.body[bodyOfProg]);
    }
    return table;
};


function initializeIf(bodypart) {
    table.push({
        line: bodypart.test.loc.start.line,
        type: bodypart.type,
        name: '',
        condition: bodypart.test.valuetext,
        value: ''
    });
    typeparse[bodypart.consequent.type](bodypart.consequent);
    if (bodypart.alternate != null) {
        typeparse[bodypart.alternate.type](bodypart.alternate);

    }
}

function initializeWhile(bodypart) {
    table.push({
        line: bodypart.loc.start.line,
        type: bodypart.type,
        name: '',
        condition: bodypart.test.valuetext,
        value: ''
    });
    typeparse[bodypart.body.type](bodypart.body);


}

function initializeFor(bodypart) {
    table.push({
        line: bodypart.loc.start.line,
        type: bodypart.type,
        name: '',
        condition: bodypart.test.valuetext,
        value: ''
    });
    typeparse[bodypart.init.type](bodypart.init);
    typeparse[bodypart.body.type](bodypart.body);
}

function initializeVar(bodypart) {
    let init = '';
    for (let i = 0; i < (bodypart.declarations).length; i++) {
        if (bodypart.declarations[i].init == null) {
            table.push({
                line: bodypart.declarations[i].id.loc.start.line,
                type: bodypart.type, name: bodypart.declarations[i].id.name, condition: '', value: init
            });
        }
        else {
            table.push({
                line: bodypart.declarations[i].id.loc.start.line,
                type: bodypart.type,
                name: bodypart.declarations[i].id.name,
                condition: '',
                value: bodypart.declarations[i].init.valuetext
            });
        }
    }
}

function initializeBlockState(bodypart) {
    for (let i = 0; i < (bodypart.body).length; i++) {
        typeparse[bodypart.body[i].type](bodypart.body[i]);
    }

}

function initializeFunc(bodypart) {
    table.push({
        line: bodypart.loc.start.line,
        type: bodypart.type,
        name: bodypart.id.name,
        condition: '',
        value: ''
    });
    for (let i = 0; i < (bodypart.params).length; i++) {
        typeparse[bodypart.params[i].type](bodypart.params[i]);
    }

    typeparse[bodypart.body.type](bodypart.body);


}

function initializeAssignmentExp(bodypart) {
    table.push({
        line: bodypart.loc.start.line,
        type: bodypart.type,
        name: bodypart.left.valuetext,
        condition: '',
        value: bodypart.right.valuetext
    });

}

function initializeExpressionState(bodypart) {

    typeparse[bodypart.expression.type](bodypart.expression);

}

function initializeIdent(bodypart) {

    table.push({line: bodypart.loc.start.line, type: bodypart.type, name: bodypart.name, condition: '', value: ''});
}

function initializeRet(bodypart) {

    table.push({
        line: bodypart.loc.start.line,
        type: bodypart.type,
        name: '',
        condition: '',
        value: bodypart.argument.valuetext
    });
}

const typeparse = {
    'FunctionDeclaration': initializeFunc,
    'VariableDeclaration': initializeVar,
    'IfStatement': initializeIf,
    'BlockStatement': initializeBlockState,
    'ExpressionStatement': initializeExpressionState,
    'AssignmentExpression': initializeAssignmentExp,
    'Identifier': initializeIdent,
    'WhileStatement': initializeWhile,
    'ReturnStatement': initializeRet,
    'ForStatement': initializeFor


};


