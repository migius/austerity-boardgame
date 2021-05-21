
function addToArray(cube, array) 
{
    console.log("added to " + array + ": " + cube);
    array.push(cube);
    logCubes();
} 

function drawCube(array) 
{
    var cube;
    if(array && array.length >0)
        {
            var random = Math.floor(Math.random()*array.length);
            cube = array[random];
            array.splice(random,1);
            console.log("draw: " + cube);
            
            }
    else
    {
        console.log("Empty " + array + "!");
    } 
    logCubes();
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
                console.log("draw: " + cube);
            }
            else
                console.log("no " + type + " in " + array + "!");
        }
    else
    {
        console.log("Empty " + array + "!");
    } 
    logCubes();
    return cube;    
} 

function logArray(divId, array)
{
    var content = $(divId);
    content.text("");
    for (var property in array) {
        var cubeIcon = document.createElement("i");
        var cList = window.cubeIconClass[array[property]].split(" ");
        for(var c in cList)
        {
            cubeIcon.classList.add(cList[c]);
        }
        content.append(cubeIcon);                    
        content.append(" ");                    
    }
}

function logCubes()
{
    logArray("#bagContent", window.Bag); 
    logArray("#currentContent", window.Current); 
    logArray("#usedContent", window.Used); 
    logArray("#treasuryContent", window.Treasury); 
}


function addButton(text, classBtn, btnNumber, logic)
{
    var btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");
    btnGroup.classList.add(classBtn);
    btnGroup.classList.add("col-" + 12 / parseInt(btnNumber));

    var btnAction = document.createElement("button");
    btnAction.type = "button"
    btnAction.classList.add("btn");

    let classStyle = "btn-outline-secondary";
    switch(classBtn) {
        case "action-btn": 
            classStyle = "btn-outline-primary";
            break;
        case "cuts-btn": 
            classStyle = "btn-outline-dark";
            break;
        case "fund-btn": 
            classStyle = "btn-outline-warning";
            break;
        case "fund-c-btn": 
            classStyle = "btn-outline-secondary";
            break;
    }

    btnAction.classList.add(classStyle);
    btnAction.classList.add("choose-btn");
    //btnAction.classList.add(classBtn);
    //btnAction.classList.add("col-" + 12 / parseInt(btnNumber));
    btnAction.classList.add("col-12");
    btnAction.innerHTML = text;
    $(btnAction).on("click", logic);

    btnGroup.append(btnAction);
    
    window.actionDiv.append(btnGroup);
}


function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}


function refreshUx()
{
    checkLose();

    logCubes();

    //document.getElementById("newTurn-btn").setAttribute('disabled',true);
    //document.getElementById("endTurn-btn").setAttribute('disabled',true);
    //document.getElementById("newYear-btn").setAttribute('disabled',true);
    $("#newTurn-btn-g").hide();
    $("#endTurn-btn-g").hide();
    $("#newYear-btn-g").hide();
    $('button.btn-std-action').prop('disabled', false);

    checkFunds();

    if(!window.gameFinished &&
        (!window.actionNeeded || (window.actionNeeded && window.actionCompleted)) &&
        (!window.cutsNeeded || (window.cutsNeeded && window.cutsCompleted)) &&
        (!window.fundNeeded || (window.fundNeeded && window.fundCompleted)) &&
        (!window.fundChoiceNeeded || (window.fundChoiceNeeded && window.fundChoiceCompleted))) {

        if (!window.turnEnded) { 
            //document.getElementById("newTurn-btn").setAttribute('disabled',true);
            //document.getElementById("endTurn-btn").removeAttribute('disabled');
            $("#endTurn-btn-g").show();
            //endTurn();
            //refreshUx();
        } else { 
            //document.getElementById("endTurn-btn").setAttribute('disabled',true);
            
            if(window.Bag && window.Bag.length === 1) {
                addToArray(drawCube(window.Bag), window.Used);
            }

            if (window.Bag && window.Bag.length > 0) { 
                //document.getElementById("newTurn-btn").removeAttribute('disabled');
                $("#newTurn-btn-g").show();
            } else { 
                //document.getElementById("newYear-btn").removeAttribute('disabled');
                $("#newYear-btn-g").show();
            }
        }
    }

    if (window.Bag && window.Bag.length == 0) { 
        $('button.btn-std-action').prop('disabled', true);
    }

    $("div.points-cell").removeClass("current");    
    $("div.points-cell#emp-cell-"+ window.Employment).addClass("current");
    $("div.points-cell#pub-cell-"+ window.PublicSafety).addClass("current");
    $("div.points-cell#wea-cell-"+ window.Wealth).addClass("current");
    $("div.points-cell#hea-cell-"+ window.Health).addClass("current");
    $("div.points-cell#pop-cell-"+ window.Popularity).addClass("current");


    $("div.Institutions-cell").removeClass("current");
    $("div.Institutions-cell#pen-cell-"+ window.PrivateEnterprise).addClass("current");
    $("div.Institutions-cell#nas-cell-"+ window.NationalSecurity).addClass("current");
    $("div.Institutions-cell#sow-cell-"+ window.SocialWelfare).addClass("current");

    $("div.Institutions-cell.private-action-cell").removeClass("p-a-used");
    if(window.fundedInst.PE) $("div.Institutions-cell.private-action-cell.pen-cell").addClass("p-a-used");
    if(window.fundedInst.NS) $("div.Institutions-cell.private-action-cell.nas-cell").addClass("p-a-used");
    if(window.fundedInst.SW) $("div.Institutions-cell.private-action-cell.sow-cell").addClass("p-a-used");

}