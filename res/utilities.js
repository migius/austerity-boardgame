function addToArray(cube, array) 
{
    array.push(cube);
} 

function drawCube(array) 
{
    var cube;
    if(array && array.length >0)
        {
            var random = Math.floor(Math.random()*array.length);
            cube = array[random];
            array.splice(random,1);
            
            }
    else
    {
        console.log("Empty " + array + "!");
    } 
    return cube;
 } 

function drawSpecificCube(array, type)
{
    var cube;
    if(array && array.length >0)
        {
            var index = array.indexOf(type);
            if(index > -1){
                cube = array[index];
                array.splice(index,1);
            }
            else
                console.log("no " + type + " in " + array + "!");
        }
    else
    {
        console.log("Empty " + array + "!");
    } 
    return cube;    
} 

function addButton(text, classBtn, btnNumber, logic)
{
    switch(classBtn) {
        case "action-btn": 
            main.actions_available.push({text: text, click: logic});
            break;
        case "cuts-btn": 
            main.cuts_available.push({text: text, click: logic});
            break;
        case "fund-btn": 
            main.fund_available.push({text: text, click: logic});
            break;
        case "fund-c-btn": 
            main.fund_c_available.push({text: text, click: logic});
            break;
    }
}


function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

