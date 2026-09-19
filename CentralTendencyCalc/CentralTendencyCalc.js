function add() {
    // place the values in the form into variables
    var theNewHigh = Number(document.forms["myForm"]["newHigh"].value);
    var theNewLow = Number(document.forms["myForm"]["newLow"].value);
    var theNewNum = Number(document.forms["myForm"]["newNum"].value);
    
    // check if the number is within the range
    if (theNewNum < theNewLow || theNewNum > theNewHigh) {
        alert("The number must be between " + theNewLow + " and " + theNewHigh);
        return false;
    }

    // add the number to the list
    var tableRef = document.getElementById("myList1");
    (tableRef.insertRow(tableRef.rows.length)).innerHTML = theNewNum;

    // calculate the mean
    var total = 0;

    for (var i = 0; i < tableRef.rows.length; i++) {
        total = total + Number(tableRef.rows[i].innerHTML);
    }

    var mean = total / tableRef.rows.length;

    // display the mean
    document.getElementById("meanResult").innerHTML = mean;

    // calculate the median
    var numbers = [];

    for (var i = 0; i < tableRef.rows.length; i++) {
        numbers.push(Number(tableRef.rows[i].innerHTML));
    }

    numbers.sort(function(a, b) {
        return a - b;
    });

    var middle = Math.floor(numbers.length / 2);
    var median;

    if (numbers.length % 2 == 0) {
        median = (numbers[middle - 1] + numbers[middle]) / 2;
    } else {
        median = numbers[middle];
    }

    document.getElementById("medianResult").innerHTML = median;

    // calculate the mode
    var counts = {};
    var maxCount = 0;
    var mode = "No mode";

    for (var i = 0; i < tableRef.rows.length; i++) {
        var number = Number(tableRef.rows[i].innerHTML);

        if (counts[number] == undefined) {
            counts[number] = 1;
        } else {
            counts[number]++;
        }

        if (counts[number] > maxCount) {
            maxCount = counts[number];
            mode = number;
        }
    }

    if (maxCount == 1) {
        mode = "No mode";
    }

    document.getElementById("modeResult").innerHTML = mode;

    // erase the form field
    document.forms["myForm"]["newNum"].value = "";
    return true;
  }

  function clearList1() {
    // clear the table of all rows
    var tableRef = document.getElementById("myList1");
    tableRef.innerHTML = " ";
    document.getElementById("meanResult").innerHTML = "";
    document.getElementById("medianResult").innerHTML = "";
    document.getElementById("modeResult").innerHTML = "";
  }