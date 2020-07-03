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

//number of cubes
window.fundedInst = {}
window.fundedInst.PE = 0;
window.fundedInst.NS = 0;
window.fundedInst.SW = 0;

//logic parameters
window.draw = "";
window.actionNeeded = false;
window.actionCompleted = false;
window.cutsNeeded = false;
window.cutsCompleted = false;
window.fundNeeded = false;
window.fundCompleted = false;
window.fundChoiceNeeded = false;
window.fundChoiceCompleted = false;
window.gameFinished = false;

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
*/    
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


    //FOR DEBUG:
    //addToArray("R", window.Bag);
    //addToArray("Y", window.Bag);
    addToArray("Y", window.Bag);
    addToArray("Y", window.Bag);
    addToArray("Y", window.Bag);
    addToArray("Y", window.Bag);
    addToArray("Y", window.Bag);
    addToArray("Y", window.Bag);
    addToArray("Y", window.Bag);
    addToArray("Y", window.Bag);
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
    btnAction.classList.add("choose-btn");
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
        $(".action-btn").remove();

        checkFunds();
        refreshUx();

        if(window.cutsNeeded)
            createCuts();
        else if(checkFunds())
            createFunds();
    }
}

function createCuts() 
{
    var IncreasePE = false;
    var IncreaseNS = false;
    var IncreaseSW = false;
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
            IncreaseNS = true;
            IncreaseSW = true;
            break;
        case "KR":
            IncreasePE = true;
            IncreaseNS = true;
            break;
        case "KY":
            IncreasePE = true;
            IncreaseSW = true;
            break;
        case "KW":
            IncreasePE = true;
            IncreaseSW = true;
            break;
        default:
            effect = "NON GESTITO: " + draw;
            break;
    }

    if(IncreasePE)
        addButton(window.actionDescription.IncreaseCuts.PE, "cuts-btn", 2, function(){
            IncreaseCuts("PE");
            window.cutsCompleted = true;
            endCuts();
        });

    if(IncreaseNS)
        addButton(window.actionDescription.IncreaseCuts.NS, "cuts-btn", 2, function(){
            IncreaseCuts("NS");
            window.cutsCompleted = true;
            endCuts();
        });

    if(IncreaseSW)
        addButton(window.actionDescription.IncreaseCuts.SW, "cuts-btn", 2, function(){
            IncreaseCuts("SW");
            window.cutsCompleted = true;
            endCuts();
        });

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
                window.Employment = Math.max(window.Employment -2,window.MIN_POINTS);
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
                addToArray("R", window.Used);
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
                window.Health = Math.max(window.Health -2,window.MIN_POINTS);
            }
        break;
    }
}

function endCuts()
{
    if(!window.cutsNeeded || (window.cutsNeeded && window.cutsCompleted))
    {
        $(".cuts-btn").remove();

        refreshUx();

        if(checkFunds())
            createFunds();
    }
}


function checkFunds()
{
    window.fundNeeded = window.Current.indexOf("Y") > -1;
    window.fundCompleted = !window.fundNeeded;

    return window.fundNeeded;
}

function createFunds() 
{
    //institution that can be funded
    let number = 0
    if(!window.fundedInst.PE) number++;
    if(!window.fundedInst.NS) number++;
    if(!window.fundedInst.SW) number++;

    let btnNum = 2;
    if(number) btnNum = 3;


    addButton(window.actionDescription.Funds.Discard, "fund-btn", btnNum, function(){
        addToArray(drawSpecificCube(window.Current,"Y"), window.Used);
        window.fundCompleted = true;
        endFunds();
    });
    addButton(window.actionDescription.Funds.Treasury, "fund-btn", btnNum, function(){
        addToArray(drawSpecificCube(window.Current,"Y"), window.Treasury);
        window.fundCompleted = true;
        endFunds();
    });
    if(number)
        addButton(window.actionDescription.Funds.Fund, "fund-btn", 3, function(){     
            drawSpecificCube(window.Current,"Y");   
            window.fundChoiceNeeded = true;
            if(!window.fundedInst.PE) fundChoise("PE", number);
            if(!window.fundedInst.NS) fundChoise("NS", number);
            if(!window.fundedInst.SW) fundChoise("SW", number);
                     
            window.fundCompleted = true;
            endFunds();
        });
}


function fundChoise(type, number) {
    switch(type) {
        case "PE":
            addButton(window.actionDescription.Funds.Choice.PE, "fund-c-btn", number, function(){
                window.Employment = Math.min(window.Employment +1,window.MAX_POINTS);
                window.fundedInst.PE++;
                window.fundChoiceCompleted = true;
                endFundChoice();
            });         
            break;
        case "NS":
            addButton(window.actionDescription.Funds.Choice.NS, "fund-c-btn", number, function(){
                addToArray("B", window.Used);
                window.fundedInst.NS++;
                window.fundChoiceCompleted = true;
                endFundChoice();
            });  
            break;
        case "SW":
            addButton(window.actionDescription.Funds.Choice.SW, "fund-c-btn", number, function(){
                addToArray("W", window.Used);
                window.fundedInst.SW++;
                window.fundChoiceCompleted = true;
                endFundChoice();
            });   
            break;
    }
}












function endFunds()
{
    if(!window.fundNeeded || (window.fundNeeded && window.fundCompleted))
    {
        $(".fund-btn").remove();

        refreshUx();

        if(checkFunds() && !window.fundChoiceNeeded)
            createFunds();
    }
}

function endFundChoice()
{
    if(!window.fundChoiceNeeded || (window.fundChoiceNeeded && window.fundChoiceCompleted))
    {
        $(".fund-c-btn").remove();
        refreshUx();

        if(checkFunds())
            createFunds();
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
    window.fundChoiceCompleted = false;
    window.fundChoiceNeeded = false;

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
                addToArray("R", window.Used);
                window.actionCompleted = true;
                endAction();
            });
            //TODO_CUTS
            window.cutsNeeded = true;
            break;
        case "KR":
            //Decrease Popularity by one 
            addButton(window.actionDescription.KR.DecreasePopularity, "action-btn", 1, function(){
                window.Popularity = Math.max(window.Popularity -1,window.MIN_POINTS);
                window.actionCompleted = true;
                endAction();});
            //(+ Cuts)
            //TODO_CUTS
            window.cutsNeeded = true;
            break;
        case "RY":
            //ither Remove Y and R or increase Popularity by one and add K
            //TODO_CHOISE
            addButton(window.actionDescription.RY.RemoveYR, "action-btn", 2, function(){
                drawSpecificCube(window.Current,"R");
                drawSpecificCube(window.Current,"Y");
                window.actionCompleted = true;
                endAction();});
            addButton(window.actionDescription.RY.IncreasePopularityAddK, "action-btn", 2, function(){
                window.Popularity = Math.min(window.Popularity +1,window.MAX_POINTS);
                addToArray("K", window.Used);
                window.actionCompleted = true;
                endAction();});
            break;
        case "RR":
            //Decrease Public Safety by two
            addButton(window.actionDescription.RR.DecreasePS2, "action-btn", 1, function(){
                window.PublicSafety = Math.max(window.PublicSafety -2,window.MIN_POINTS);
                window.actionCompleted = true;
                endAction();});
            break;
        case "RW":
            //Decrease Employment by one
            addButton(window.actionDescription.RW.DecreaseEmployment, "action-btn", 1, function(){
                window.Employment = Math.max(window.Employment -1,window.MIN_POINTS);
                window.actionCompleted = true;
                endAction();});            
            break;
        case "WW":
            //Increase Employment by two
            addButton(window.actionDescription.WW.IncreaseEmployment2, "action-btn", 1, function(){
                window.Employment = Math.min(window.Employment +2,window.MAX_POINTS);
                window.actionCompleted = true;
                endAction();});                      
            break;
        case "YY":
            //Increase Wealth by one; 
            addButton(window.actionDescription.YY.IncreaseWealth, "action-btn", 1, function(){
                window.Wealth = Math.min(window.Wealth +1,window.MAX_POINTS);
                //window.actionCompleted = true;
                $(".action-btn").remove();
                refreshUx();

                //let number = 0;
                //if(window.fundedInst.PE<2) number++;
                //if(window.fundedInst.NS<2) number++;
                //if(window.fundedInst.SW<2) number++;

                //let btnNum = 1;
                //if(number) btnNum = 2;

                //if(number)
                addButton(window.actionDescription.YY.SpendYY, "action-btn", 2, function(){
                    drawSpecificCube(window.Current,"Y");
                    drawSpecificCube(window.Current,"Y");
                    window.fundChoiceNeeded = true;
                    //if(window.fundedInst.PE<2) 
                    fundChoise("PE", 3);
                    //if(window.fundedInst.NS<2) 
                    fundChoise("NS", 3);
                    //if(window.fundedInst.SW<2) 
                    fundChoise("SW", 3);

                    window.actionCompleted = true;
                    endAction();});   
                addButton(window.actionDescription.YY.NO, "action-btn", 2, function(){
                    //do nothing
                    window.actionCompleted = true;
                    endAction();});   
            });  
            //may spend both cubes to fund a single already-funded institution
            //TODO_CHOISE
            break;
        case "KY":
            //Optionally Spend Y to Remove K (or Cuts)            
            addButton(window.actionDescription.KY.SpendYRemoveK, "action-btn", 2, function(){
                drawSpecificCube(window.Current,"K");
                drawSpecificCube(window.Current,"Y");
                window.actionCompleted = true;
                endAction();});
            addButton(window.actionDescription.KY.Cuts, "action-btn", 2, function(){
                window.cutsNeeded = true;
                window.actionCompleted = true;
                endAction();});
            break;
            //TODO_CHOISE
            break;
        case "BY":
            //Increase Popularity or Public Safety by one
            addButton(window.actionDescription.BY.IncreasePopularity, "action-btn", 2, function(){
                window.Popularity = Math.min(window.Popularity +1,window.MAX_POINTS);
                window.actionCompleted = true;
                endAction();});   
            addButton(window.actionDescription.BY.IncreasePS, "action-btn", 2, function(){
                window.PublicSafety = Math.min(window.PublicSafety +1,window.MAX_POINTS);
                window.actionCompleted = true;
                endAction();});   
            //TODO_CHOISE
            break;
        case "BB":
            //Increase Public Safety by two
            addButton(window.actionDescription.BB.IncreasePS, "action-btn", 1, function(){
                window.PublicSafety = Math.min(window.PublicSafety + 2,window.MAX_POINTS);
                window.actionCompleted = true;
                endAction();});                      
            break;
        case "BR":
            //Either Remove B and R or reduce Public Safety by one     
            addButton(window.actionDescription.BR.RemoveBR, "action-btn", 2, function(){
                drawSpecificCube(window.Current,"B");
                drawSpecificCube(window.Current,"R");
                window.actionCompleted = true;
                endAction();});
            addButton(window.actionDescription.BR.ReducePS, "action-btn", 2, function(){
                window.PublicSafety = Math.max(window.PublicSafety -1,window.MIN_POINTS);
                window.actionCompleted = true;
                endAction();});
            //TODO_CHOISE
            break;
        case "BW":
            //Either Remove W or increase Employment by one and decrease Popularity by one
            addButton(window.actionDescription.BW.RemoveW, "action-btn", 2, function(){
                drawSpecificCube(window.Current,"W");
                window.actionCompleted = true;
                endAction();});
            addButton(window.actionDescription.BW.IncreaseEmploymentDecreasePopularity, "action-btn", 2, function(){
                window.Employment = Math.min(window.Employment +1,window.MAX_POINTS);
                window.Popularity = Math.max(window.Popularity -1,window.MIN_POINTS);
                window.actionCompleted = true;
                endAction();});
            //TODO_CHOISE
            break;
        case "WY":
            //Increase Health by two
            addButton(window.actionDescription.WY.IncreaseHealth, "action-btn", 1, function(){
                window.Health = Math.min(window.Health + 2,window.MAX_POINTS);
                window.actionCompleted = true;
                endAction();});              
            break;
        case "KW":
            //Spend Y or reduce Health by one. 
            addButton(window.actionDescription.KW.SpendY, "action-btn", 2, function(){
                var indexY = window.Treasury.indexOf("Y");
                if(indexY > -1) { 
                    window.Treasury.splice(indexY, 1); 
                    window.actionCompleted = true;}
                else { 
                    alert(window.alertMsg.NoIncome); 
                }
                endAction();
            });
            addButton(window.actionDescription.KW.ReduceHealth, "action-btn", 2, function(){
                window.Health = Math.max(window.Health -1,window.MIN_POINTS);
                window.actionCompleted = true;
                endAction();
            });
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
    //Check to see if you have won - see Ending the Game below
    if(window.Used.indexOf("K") < 0) gameWin();

    //Add a number of yellow Income cubes to your Treasury equal to the number of Income icons printed in the current space on the Employment track (0, 1 or 2).
    if(window.Employment >= 9) {
        addToArray("Y", window.Used);
        addToArray("Y", window.Used);
    }
    else if(window.Employment >= 5) {
        addToArray("Y", window.Used);        
    }

    //Adjust Wealth one step up or down the track towards the level of Employment (e.g. if Employment is lower than Wealth, reduce Wealth by one step; if Employment is at the same level as Wealth, then leave Wealth where it is).
    if(window.Employment > window.Wealth) {
        window.Wealth++;
    }
    else if(window.Employment < window.Wealth) {
        window.Wealth--;
    }

    //Adjust Health one step up or down the track towards the level of Public Safety.
    if(window.PublicSafety > window.Health) {
        window.Health++;
    }
    else if(window.PublicSafety < window.Health) {
        window.Health--;
    }

    //Adjust Popularity one step up or down the track towards the level of Wealth, and then adjust Popularity a second time one step up or down the track towards the level of Health.
    if(window.Wealth > window.Popularity) {
        window.Popularity++;
    }
    else if(window.Wealth < window.Popularity) {
        window.Popularity--;
    }
    if(window.Health > window.Popularity) {
        window.Popularity++;
    }
    else if(window.Health < window.Popularity) {
        window.Popularity--;
    }

    //Put all the cubes from the Used area and Income cubes placed on Institutions back in the bag and start the next political year.
    while(window.Used && window.Used.length > 0) {
            addToArray(drawCube(window.Used),window.Bag);
        }

    //reset funded
    window.fundedInst.PE = 0;
    window.fundedInst.NS = 0;
    window.fundedInst.SW = 0;


    refreshUx();
}

function gameWin() {
    alert(window.alertMsg.Win);
    window.gameFinished = true;
}

function gameLosed() {
    alert(window.alertMsg.Lose);
    window.gameFinished = true;
}

function checkLose() {
    if(window.Employment == window.MIN_POINTS) gameLosed();
    if(window.PublicSafety == window.MIN_POINTS) gameLosed();
    if(window.Wealth == window.MIN_POINTS) gameLosed();
    if(window.Health == window.MIN_POINTS) gameLosed();
    if(window.Popularity == window.MIN_POINTS) gameLosed();
}

function refreshUx()
{
    checkLose();

    logCubes();

    document.getElementById("newTurn-btn").setAttribute('disabled',true);
    document.getElementById("endTurn-btn").setAttribute('disabled',true);
    document.getElementById("newYear-btn").setAttribute('disabled',true);

    if(!window.gameFinished &&
        (!window.actionNeeded || (window.actionNeeded && window.actionCompleted)) &&
        (!window.cutsNeeded || (window.cutsNeeded && window.cutsCompleted)) &&
        (!window.fundNeeded || (window.fundNeeded && window.fundCompleted)) &&
        (!window.fundChoiceNeeded || (window.fundChoiceNeeded && window.fundChoiceCompleted))) {

        if (window.Current && window.Current.length > 0) { 
            document.getElementById("newTurn-btn").setAttribute('disabled',true);
            document.getElementById("endTurn-btn").removeAttribute('disabled');
            endTurn();
            refreshUx();
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
    
