//cubes colors:
//"Y" - yellow
//"K" - black
//"W" - white
//"B" - blue
//"R" - red

//cube spaces
window.Bag = [];
window.Current = [];
window.Used = [];
window.Treasury = [];

//tracks
window.Employment;
window.PublicSafety;
window.Wealth;
window.Health;
window.Popularity;
window.MAX_POINTS = 10;
window.MIN_POINTS = 0;

//Institutions
window.PrivateEnterprise;
window.NationalSecurity;
window.SocialWelfare;
window.MAX_INST = 3;

window.cubeIconClass = {};
window.cubeIconClass.Y ="cube cube-Y fa fa-coins";
window.cubeIconClass.B ="cube cube-B fa fa-user-shield";
window.cubeIconClass.K ="cube cube-K fa fa-credit-card";
window.cubeIconClass.R ="cube cube-R fa fa-bomb";
window.cubeIconClass.W ="cube cube-W fa fa-briefcase-medical";


window.cubeDrawTitle = {};
window.cubeDrawTitle.KK = "Economic Downturn";
window.cubeDrawTitle.BK = "Underfunded Police Force";
window.cubeDrawTitle.KR = "Political Corruption";
window.cubeDrawTitle.RY = "Anti-Austerity Protests";
window.cubeDrawTitle.RR = "Industrial Violations";
window.cubeDrawTitle.RW = "Welfare Cheats";
window.cubeDrawTitle.WW = "Back-to-Work Programme";
window.cubeDrawTitle.YY = "Budget Surplus";
window.cubeDrawTitle.KY = "Early Repayments";
window.cubeDrawTitle.BY = "Security Spending";
window.cubeDrawTitle.BB = "Falling Crime Rates";
window.cubeDrawTitle.BR = "Special Operations";
window.cubeDrawTitle.BW = "Welfare Cheat Crackdown";
window.cubeDrawTitle.WY = "Nationalised Healthcare Spending";
window.cubeDrawTitle.KW = "Welfare Budget Problems";

window.cubeDrawDescription = {};
window.cubeDrawDescription.KK = "Reduce Wealth by one and increase cuts on every institution by one";
window.cubeDrawDescription.BK = "Spend <i class='" + window.cubeIconClass.Y + "' /> or add <i class='" + window.cubeIconClass.R + "' /> (+ Cuts)";
window.cubeDrawDescription.KR = "Decrease Popularity by one (+ Cuts)";
window.cubeDrawDescription.RY = "Either Remove <i class='" + window.cubeIconClass.Y + "' /> and <i class='" + window.cubeIconClass.R + "' /> or increase Popularity by one and add <i class='" + window.cubeIconClass.K + "' />";
window.cubeDrawDescription.RR = "Decrease Public Safety by two";
window.cubeDrawDescription.RW = "Decrease Employment by one";
window.cubeDrawDescription.WW = "Increase Employment by two";
window.cubeDrawDescription.YY = "Increase Wealth by one; may spend both cubes to fund a single already-funded institution";
window.cubeDrawDescription.KY = "Optionally Spend <i class='" + window.cubeIconClass.Y + "' /> to Remove <i class='" + window.cubeIconClass.K + "' /> (or Cuts)";
window.cubeDrawDescription.BY = "Increase Popularity or Public Safety by one";
window.cubeDrawDescription.BB = "Increase Public Safety by two";
window.cubeDrawDescription.BR = "Either Remove <i class='" + window.cubeIconClass.B + "' /> and <i class='" + window.cubeIconClass.R + "' /> or reduce Public Safety by one";
window.cubeDrawDescription.BW = "Either Remove <i class='" + window.cubeIconClass.W + "' /> or increase Employment by one and decrease Popularity by one";
window.cubeDrawDescription.WY = "Increase Health by two";
window.cubeDrawDescription.KW = "Spend <i class='" + window.cubeIconClass.Y + "' /> or reduce Health by one. (+ Cuts)";

window.actionDescription = {};
window.actionDescription.KK = {};
window.actionDescription.KK.ReduceWealth = "Reduce Wealth by one";
window.actionDescription.KK.IncreaseCuts = "Increase cuts on every institution by one";
window.actionDescription.BK = {};
window.actionDescription.BK.SpendY = "Spend <i class='" + window.cubeIconClass.Y + "' />";
window.actionDescription.BK.AddR = "Add <i class='" + window.cubeIconClass.R + "' />";
window.actionDescription.KR = {};
window.actionDescription.KR.DecreasePopularity = "Decrease Popularity by one";
window.actionDescription.RY = {};
window.actionDescription.RY.RemoveYR = "Either Remove <i class='" + window.cubeIconClass.Y + "' /> and <i class='" + window.cubeIconClass.R + "' />";
window.actionDescription.RY.IncreasePopularityAddK = "Increase Popularity by one and add <i class='" + window.cubeIconClass.K + "' />";

window.actionDescription.IncreaseCuts = {};
window.actionDescription.IncreaseCuts.PE = "todo PE";
window.actionDescription.IncreaseCuts.NS = "todo NS";
window.actionDescription.IncreaseCuts.SW = "todo SW";


//alert
window.alertMsg = {};
window.alertMsg.NoIncome = "No Income available in Treasury";

//logic parameters
window.draw = "";
window.actionNeeded = false;
window.actionCompleted = false;
window.cutsNeeded = false;
window.cutsCompleted = false;
window.fundNeeded = false;
window.fundCompleted = false;

window.actionDiv = $('#actions');

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
    }
}

//function logBag()
//{
//    logArray("#bagContent", window.bag); 
//}

function logCubes()
{
    logArray("#bagContent", window.Bag); 
    logArray("#currentContent", window.Current); 
    logArray("#usedContent", window.Used); 
    logArray("#treasuryContent", window.Treasury); 
}

function defaultBagSetUp()
{
    /*
     4 Black/Debt 
     2 Red/Crime & Unrest 
     2 Blue/Security & Policing 
     1 White/Welfare 
     1 Yellow/Income
    
    addToArray("K", window.Bag);
    addToArray("K", window.Bag);
    addToArray("K", window.Bag);
    addToArray("K", window.Bag);
    addToArray("R", window.Bag);
    addToArray("R", window.Bag);
    addToArray("B", window.Bag);
    addToArray("B", window.Bag);
    addToArray("W", window.Bag);
    addToArray("Y", window.Bag);
*/

    //FOR DEBUG:
    addToArray("K", window.Bag);
    addToArray("B", window.Bag);
}

function defaultTrackSetUp()
{
    window.Employment = 5;
    window.PublicSafety = 5;
    window.Wealth = 5;
    window.Health = 5;
    window.Popularity = 5;
}

function defaultInstitutionsSetUp()
{
    window.PrivateEnterprise = 1;
    window.NationalSecurity = 1;
    window.SocialWelfare = 1;
}

function defaultSetUp()
{
    defaultBagSetUp();
    defaultTrackSetUp();
    defaultInstitutionsSetUp();
}

function newTurn()
{
    var c1 = drawCube(window.Bag);
    if(c1) {
        addToArray(c1,window.Current);
    }
    else {
        //No more cubes???
        //trig end year
    }
    var c2 = drawCube(window.Bag);
    if(c2) { 
        addToArray(c2,window.Current);
    }
    else {
        //No more cubes???
        //move one cube from current to used 
        if(window.Current && window.Current.length == 1) {
            addToArray(drawCube(window.Current),window.Used);
        }
        //and trig end year
     
    }
    
    cubeDrawResult(c1, c2);
    
    refreshUx();
}

function addButton(text, classBtn, btnNumber, logic)
{
    var btnAction = document.createElement("button");
    btnAction.type = "button"
    btnAction.classList.add("btn");
    btnAction.classList.add("btn-outline-dark");
    btnAction.classList.add(classBtn);
    btnAction.classList.add("col-" + 12 / parseInt(btnNumber));
    btnAction.innerHTML = text;
    $(btnAction).on("click", logic);
    
    window.actionDiv.append(btnAction);
}

function endAction()
{
    if(!window.actionNeeded || (window.actionNeeded && window.actionCompleted))
    {
        //$(".action-btn").addClass("disabled");
        //$(".action-btn").off("click");
        $(".action-btn").hide();

        refreshUx();

        if(window.cutsNeeded)
            createCuts();
        else if(window.fundNeeded)
            createFunds();
    }
}

function createCuts() 
{
    switch (window.draw) {
        case "KK":
            addButton(window.actionDescription.KK.IncreaseCuts, "cuts-btn", 1, function(){
                IncreaseCuts("PE");
                IncreaseCuts("NS");
                IncreaseCuts("SW");
                window.cutsCompleted = true;
                endCuts();
            });
            break;
        case "BK":
            addButton(window.actionDescription.IncreaseCuts.NS, "cuts-btn", 2, function(){
                IncreaseCuts("NS");
                window.cutsCompleted = true;
                endCuts();
            });
            addButton(window.actionDescription.IncreaseCuts.SW, "cuts-btn", 2, function(){
                IncreaseCuts("SW");
                window.cutsCompleted = true;
                endCuts();
            });
            break;
        case "KR":
            break;
        case "KY":
            break;
        case "KW":
            break;
        default:
            effect = "NON GESTITO: " + draw;
            break;
    }
    refreshUx();
}

function IncreaseCuts(inst) 
{
    switch(inst)
    {
        case "PE":
            if(window.PrivateEnterprise < window.MAX_INST)
            {
                window.PrivateEnterprise++;   
            }
            else
            {
                window.PrivateEnterprise = 1;
                //TODO ACTION
            }
        break;        
        case "NS":
            if(window.NationalSecurity < window.MAX_INST)
            {
                window.NationalSecurity++;   
            }
            else
            {
                window.NationalSecurity = 1;
                //TODO ACTION
            }
        break;    
        case "SW":
            if(window.SocialWelfare < window.MAX_INST)
            {
                window.SocialWelfare++;   
            }
            else
            {
                window.SocialWelfare = 1;
                //TODO ACTION
            }
        break;
    }
}

function endCuts()
{
    if(!window.cutsNeeded || (window.cutsNeeded && window.cutsCompleted))
    {
        $(".cuts-btn").hide();

        refreshUx();

        if(window.fundNeeded)
            createFunds();
    }
}

function createFunds() 
{
    alert("todo");
}

function endFunds()
{
    if(!window.fundNeeded || (window.fundNeeded && window.fundCompleted))
    {
        $(".fund-btn").hide();

        refreshUx();
    }
}


function cubeDrawResult(c1, c2)
{ 
    if(c1 < c2)
    {
        window.draw = c1 + c2;
    }
    else
    {
        window.draw = c2 + c1;
    }
    console.log("draw couple: " + draw);
    
    window.actionNeeded = true;
    window.actionCompleted = false;
    window.cutsNeeded = false;
    window.cutsCompleted = false;
    window.fundNeeded = false;
    window.fundCompleted = false;

    switch (window.draw) {
        case "KK":
            //Reduce Wealth by one
            addButton(window.actionDescription.KK.ReduceWealth, "action-btn", 1, function(){
                window.Wealth = Math.max(window.Wealth -1,window.MIN_POINTS);
                window.actionCompleted = true;
                endAction();});
            //window.Wealth = Math.max(window.Wealth -1,window.MIN_POINTS);
            //and increase cuts on every institution by one
            //TODO_INSTITUTIONS
            window.cutsNeeded = true;
            break;
        case "BK":
            //spend Y or add R
            addButton(window.actionDescription.BK.SpendY, "action-btn", 2, function(){
                var indexY = window.Treasury.indexOf("Y");
                if(indexY > -1) { 
                    window.Treasury.splice(indexY, 1); 
                    window.actionCompleted = true;}
                else { 
                    alert(window.alertMsg.NoIncome); 
                }
                endAction();
            });
            addButton(window.actionDescription.BK.AddR, "action-btn", 2, function(){
                addToArray("R", window.Bag);
                window.actionCompleted = true;
                endAction();
            });
            //TODO_CUTS
            window.cutsNeeded = true;
            break;
        case "KR":
            //Decrease Popularity by one 
            window.Popularity = Math.max(window.Popularity -1,window.MIN_POINTS);
            //(+ Cuts)
            //TODO_CUTS
            window.cutsNeeded = true;
            break;
        case "RY":
            //ither Remove Y and R or increase Popularity by one and add K
            //TODO_CHOISE
            break;
        case "RR":
            //Decrease Public Safety by two
            window.PublicSafety = Math.max(window.PublicSafety -2,window.MIN_POINTS);
            break;
        case "RW":
            //Decrease Employment by one
            window.Employment = Math.max(window.Employment -1,window.MIN_POINTS);
            break;
        case "WW":
            //Increase Employment by two
            window.Employment = Math.min(window.Employment + 2,window.MAX_POINTS);
            break;
        case "YY":
            //Increase Wealth by one; 
            window.Wealth = Math.min(window.Wealth + 1,window.MAX_POINTS);
            //may spend both cubes to fund a single already-funded institution
            //TODO_CHOISE
            break;
        case "KY":
            //Optionally Spend Y to Remove K (or Cuts)
            //TODO_CHOISE
            break;
        case "BY":
            //Increase Popularity or Public Safety by one
            //TODO_CHOISE
            break;
        case "BB":
            //Increase Public Safety by two
            window.PublicSafety = Math.min(window.PublicSafety + 2,window.MAX_POINTS);
            break;
        case "BR":
            //Either Remove B and R or reduce Public Safety by one
            //TODO_CHOISE
            break;
        case "BW":
            //Either Remove W or increase Employment by one and decrease Popularity by one
            //TODO_CHOISE
            break;
        case "WY":
            //Increase Health by two
            window.Health = Math.min(window.Health + 2,window.MAX_POINTS);
            break;
        case "KW":
            //Spend Y or reduce Health by one. 
            //TODO_CHOISE
            //(+ Cuts)
            //TODO_CUTS            
            window.cutsNeeded = true;
            break;
        default:
            effect = "NON GESTITO: " + draw;
            break;
    }

    //console.Log("Effect: " + effect);
    $('span#cubeDrawResult').html(window.cubeDrawTitle[draw]);
    $('span#cubeDrawResultEffect').html(window.cubeDrawDescription[draw]);
}

function endTurn()
{
    window.actionDiv.empty();
    while(window.Current && window.Current.length > 0) {
            addToArray(drawCube(window.Current),window.Used);
        }
    refreshUx();
}

function newYear()
{
    while(window.Used && window.Used.length > 0) {
            addToArray(drawCube(window.Used),window.Bag);
        }
    refreshUx();
}

function refreshUx()
{
    logCubes();

    document.getElementById("newTurn-btn").setAttribute('disabled',true);
    document.getElementById("endTurn-btn").setAttribute('disabled',true);
    document.getElementById("newYear-btn").setAttribute('disabled',true);

    if((!window.actionNeeded || (window.actionNeeded && window.actionCompleted)) &&
        (!window.cutsNeeded || (window.cutsNeeded && window.cutsCompleted)) &&
        (!window.fundNeeded || (window.fundNeeded && window.fundCompleted))) {

        if (window.Current && window.Current.length > 0) { 
            document.getElementById("newTurn-btn").setAttribute('disabled',true);
            document.getElementById("endTurn-btn").removeAttribute('disabled');
        } else { 
            document.getElementById("endTurn-btn").setAttribute('disabled',true);
            
            if(window.Bag && window.Bag.length === 1) {
                addToArray(drawCube(window.Bag), window.Used);
            }

            if (window.Bag && window.Bag.length > 0) { 
                document.getElementById("newTurn-btn").removeAttribute('disabled');
            } else { 
                document.getElementById("newYear-btn").removeAttribute('disabled');
            }
        }
    }

    $("td.points-cell").removeClass("current");    
    $("td.points-cell#emp-cell-"+ window.Employment).addClass("current");
    $("td.points-cell#pub-cell-"+ window.PublicSafety).addClass("current");
    $("td.points-cell#wea-cell-"+ window.Wealth).addClass("current");
    $("td.points-cell#hea-cell-"+ window.Health).addClass("current");
    $("td.points-cell#pop-cell-"+ window.Popularity).addClass("current");


    $("td.Institutions-cell").removeClass("current");
    $("td.Institutions-cell#pen-cell-"+ window.PrivateEnterprise).addClass("current");
    $("td.Institutions-cell#nas-cell-"+ window.NationalSecurity).addClass("current");
    $("td.Institutions-cell#sow-cell-"+ window.SocialWelfare).addClass("current");
}

function init()
{
    defaultSetUp();
    refreshUx();
}


//init
{
    if (window.addEventListener) {
        window.addEventListener('load', init);
    } 
    else if (window.attachEvent) {
        window.attachEvent('onload', init);
    } else { 
        window.onload = init;
    } 
}
    
