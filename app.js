// creates variable for the form
let form = document.getElementById('form');

// func to create the delete button when each meal/row is created, takes in the proper table and the row id
createDeleteButton = (table, id) => {
    // variable for creating a button
    let btn = document.createElement('button');
    // appends the button to the last cell (the newly created cell)
    table.rows[table.rows.length-1].cells[5].appendChild(btn);
    // sets id of the button
    btn.id = `${id}-btn`;
    // sets className for the button for styling
    btn.className = 'btn btn-secondary btn-sm';
    // adds text to button
    btn.innerHTML = 'Delete';
    // when the button is clicked, will remove the row with the given id
    btn.onclick = () => {
        // logs which meal is deleted
        console.log(`${document.getElementById(id).cells[0].innerHTML} deleted`);
        // removes meal row from the table
        document.getElementById(id).remove();
    }
}

const addValues = (mealType) => {
    // gets table element for the selected mealType
    let table = document.getElementById(mealType);
    console.log(`${table.id} selected`);
    // creates row variable
    let row = table.insertRow(-1);
    console.log(`new ${table.id} row created`);
    // sets id for the new row
    row.id = `${mealType.charAt(0)}-${table.rows.length - 1}`;
    console.log(`new row id = ${row.id}`);
    // loop with 7 iterations (for 6 columns, as we will be essentially "skipping" 1 loop). each iteration will select the next element in the form
    for (i = 0; i < 7; i++) {
        // when i === 2, it will be selecting the mealType select form element, which selects the table, rather than adding a data column.
        // So we skip that loop
        if(i != 2) {
            // creates new cell in the row, and sets the variable "cell" to that cell
            let cell = row.insertCell();
            console.log('new cell created')
            // sets the innerHtml inside that cell to the value in the corresponding form element
            cell.innerHTML = form[i].value;
            // this adds the text-center value to the delete button cell for styling purposes
            if(i === 6) {
                cell.className = 'text-center';
            }
        }
    }
    // after creating all cells and updating values, run the createDeleteButton function
    createDeleteButton(table, row.id);
    // selects all form inputs (all inputs have form-control class)
    const inputs = document.querySelectorAll('.form-control');
    // runs a forEach loop through all inputs
    inputs.forEach(input => {
        // resets all these inputs to default value, for better user experience
        input.value = '';
    })
    console.log('form data reset');
}

document.getElementById('submit').addEventListener('click', (e) => {
    // prevents form from changing URL
    e.preventDefault();
    // checks the mealType form select, to decide which table to add the data to, and sends the corresponding table name
    if(form.mealType.value === 'breakfast') {
        addValues('breakfastTable');
    } else if (form.mealType.value === 'lunch') {
        addValues('lunchTable');
    } else if (form.mealType.value === 'dinner') {
        addValues('dinnerTable');
    }
})


