import $ from 'jquery';
import {parseCode} from './code-analyzer';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        document.getElementById('mytable').innerHTML = addTable(parsedCode);
    });
});

function addTable(myArray) {
    var table = '<table border=1>';
    table += '<tr>';
    table += '<td> Line </td>';
    table += '<td> Type </td>';
    table += '<td> Name </td>';
    table += '<td> Condition </td>';
    table += '<td> Value </td>';
    for (var i = 0; i < myArray.length; i++) {
        table += '<tr>';
        table += '<td>' + myArray[i].line + '</td>';
        table += '<td>' + myArray[i].type + '</td>';
        table += '<td>' + myArray[i].name + '</td>';
        table += '<td>' + myArray[i].condition + '</td>';
        table += '<td>' + myArray[i].value + '</td>';
        table += '</tr>';
    }
    return table;
}
