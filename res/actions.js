
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
            //window.cutsNeeded = true;
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
                    return null;
                }
                endAction();
            });
            addButton(window.actionDescription.BK.AddR, "action-btn", 2, function(){
                addToArray("R", window.Used);
                window.actionCompleted = true;
                endAction();
            });
            //window.cutsNeeded = true;
            break;
        case "KR":
            //Decrease Popularity by one 
            addButton(window.actionDescription.KR.DecreasePopularity, "action-btn", 1, function(){
                window.Popularity = Math.max(window.Popularity -1,window.MIN_POINTS);
                window.actionCompleted = true;
                endAction();});
            //(+ Cuts)
            //window.cutsNeeded = true;
            break;
        case "RY":
            //ither Remove Y and R or increase Popularity by one and add K
            addButton(window.actionDescription.RY.RemoveYR, "action-btn", 2, function(){
                
                if(window.Current.indexOf("Y") < 0) {
                    alert(window.alertMsg.NotEnoughY); 
                    return null;
                }
                if(window.Current.indexOf("R") < 0) {
                    alert(window.alertMsg.NotEnoughR); 
                    return null;
                }


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
                    if(getAllIndexes(window.Current,"Y").length < 2)
                    {
                        //if I have less tha 2 Y I can't do it
                        alert(window.alertMsg.NotEnoughY); 
                        return null;
                    }


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
            break;
        case "KY":
            //Optionally Spend Y to Remove K (or Cuts)            
            addButton(window.actionDescription.KY.SpendYRemoveK, "action-btn", 2, function(){

                if(window.Current.indexOf("Y") < 0) {
                    alert(window.alertMsg.NotEnoughY); 
                    return null;
                }
                if(window.Current.indexOf("K") < 0) {
                    alert(window.alertMsg.NotEnoughK); 
                    return null;
                }


                drawSpecificCube(window.Current,"K");
                drawSpecificCube(window.Current,"Y");  //TODO: issue#1
                window.actionCompleted = true;
                endAction();});
            addButton(window.actionDescription.KY.Cuts, "action-btn", 2, function(){
                //window.cutsNeeded = true;
                window.actionCompleted = true;
                endAction();});
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

                if(window.Current.indexOf("B") < 0) {
                    alert(window.alertMsg.NotEnoughB); 
                    return null;
                }
                if(window.Current.indexOf("R") < 0) {
                    alert(window.alertMsg.NotEnoughR); 
                    return null;
                }

                drawSpecificCube(window.Current,"B");
                drawSpecificCube(window.Current,"R");
                window.actionCompleted = true;
                endAction();});
            addButton(window.actionDescription.BR.ReducePS, "action-btn", 2, function(){
                window.PublicSafety = Math.max(window.PublicSafety -1,window.MIN_POINTS);
                window.actionCompleted = true;
                endAction();});
            break;
        case "BW":
            //Either Remove W or increase Employment by one and decrease Popularity by one
            addButton(window.actionDescription.BW.RemoveW, "action-btn", 2, function(){
                if(window.Current.indexOf("W") < 0) {
                    alert(window.alertMsg.NotEnoughW); 
                    return null;
                }

                drawSpecificCube(window.Current,"W");
                window.actionCompleted = true;
                endAction();});
            addButton(window.actionDescription.BW.IncreaseEmploymentDecreasePopularity, "action-btn", 2, function(){
                window.Employment = Math.min(window.Employment +1,window.MAX_POINTS);
                window.Popularity = Math.max(window.Popularity -1,window.MIN_POINTS);
                window.actionCompleted = true;
                endAction();});
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
                    return null;
                }
                endAction();
            });
            addButton(window.actionDescription.KW.ReduceHealth, "action-btn", 2, function(){
                window.Health = Math.max(window.Health -1,window.MIN_POINTS);
                window.actionCompleted = true;
                endAction();
            });
            //(+ Cuts)       
            //window.cutsNeeded = true;
            break;
        default:
            effect = "NON GESTITO: " + draw;
            break;
    }

    //console.Log("Effect: " + effect);
    $('#cubeDrawResult').html(window.cubeDrawTitle[draw]);
    $('#cubeDrawResultEffect').html(window.cubeDrawDescription[draw]);
    $("#result-box").slideDown(700);
}

function endAction()
{
    if(!window.actionNeeded || (window.actionNeeded && window.actionCompleted))
    {
        //$(".action-btn").addClass("disabled");
        //$(".action-btn").off("click");
        $(".action-btn").remove();

        checkFunds();
        checkCuts();

        refreshUx();

        if(window.cutsNeeded)
            createCuts();
        else if(window.fundNeeded)
            createFunds();
    }
}

function checkCuts()
{
    window.cutsNeeded = window.Current.indexOf("K") > -1;
    window.cutsCompleted = !window.cutsNeeded;
}

function createCuts() 
{
    //cuts on all
    if(getAllIndexes(window.Current,"K").length == 2){
        addButton(window.actionDescription.KK.IncreaseCuts, "cuts-btn", 1, function(){
            IncreaseCuts("PE");
            IncreaseCuts("NS");
            IncreaseCuts("SW");
            window.cutsCompleted = true;
            endCuts();
        });
        return;
    }


    let IncreasePE = false;
    let IncreaseNS = false;
    let IncreaseSW = false;

    let number = 2;
    switch (window.draw) {
        case "KK":
            IncreasePE = true;
            IncreaseNS = true;
            IncreaseSW = true;
            number = 3;
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
        addButton(window.actionDescription.IncreaseCuts.PE, "cuts-btn", number, function(){
            IncreaseCuts("PE");
            window.cutsCompleted = true;
            endCuts();
        });

    if(IncreaseNS)
        addButton(window.actionDescription.IncreaseCuts.NS, "cuts-btn", number, function(){
            IncreaseCuts("NS");
            window.cutsCompleted = true;
            endCuts();
        });

    if(IncreaseSW)
        addButton(window.actionDescription.IncreaseCuts.SW, "cuts-btn", number, function(){
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
        
        checkFunds()
        if(window.fundNeeded)
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
            window.fundChoiceCompleted = false;
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
        checkFunds()

        if(window.fundNeeded && !window.fundChoiceNeeded)
            createFunds();
    }
}

function endFundChoice()
{
    if(!window.fundChoiceNeeded || (window.fundChoiceNeeded && window.fundChoiceCompleted))
    {
        $(".fund-c-btn").remove();
        refreshUx();
        checkFunds()

        if(window.fundNeeded)
            createFunds();
    }
}


/*DEFAULT ACTIONS*/

function borrowMoney() {
    addToArray("Y",window.Used);
    addToArray("Y",window.Used);
    addToArray("K",window.Bag);
}

function raiseTaxes() {
    addToArray("Y",window.Bag);
    addToArray("R",window.Bag);
}

function payLoans() {
    let YToPay = 2;
    let KToPay = 1;

    YAvailable = 0;
    KAvailable = 0;

    YAvailable = getAllIndexes(window.Current,"Y").length + getAllIndexes(window.Used,"Y").length + getAllIndexes(window.Treasury,"Y").length;
    KAvailable = getAllIndexes(window.Current,"K").length + getAllIndexes(window.Used,"K").length + getAllIndexes(window.Treasury,"K").length;

    if(YAvailable < YToPay) {alert(window.alertMsg.NotEnoughY);return;}
    if(KAvailable < KToPay) {alert(window.alertMsg.NotEnoughK);return;}

    //first remove from Current
    while(YToPay > 0) {
        if(window.Current.indexOf("Y") > -1)
        {
            drawSpecificCube(window.Current,"Y")
            YToPay--;
        }
        else
            break;
    }

    while(KToPay > 0) {
        if(window.Current.indexOf("K") > -1) {
            drawSpecificCube(window.Current,"K")
            KToPay--;
        }
        else
            break;
    }

    while(YToPay > 0) {
        /*
        if(window.Treasury.indexOf("Y") > -1 && window.Used.indexOf("Y") > -1 && YAvailable > YToPay){
            alert("todo: choose Treasury or Used");
            return;
        }
        else
            */
            if(window.Treasury.indexOf("Y") > -1) {
                drawSpecificCube(window.Treasury,"Y");
                YToPay--;
            }
            else if(window.Used.indexOf("Y") > -1) {
                drawSpecificCube(window.Used,"Y");
                YToPay--;
            }

    }

    while(KToPay > 0) {
        if(window.Used.indexOf("K") > -1) {
            drawSpecificCube(window.Used,"K")
            KToPay--;
        }
        else
            break;
    }
}