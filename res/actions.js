
function refreshCubeDrawResult()
{
    main.actions_available = [];
    main.cuts_available = [];
    main.fund_available = [];
    main.fund_c_available = [];

    //2 cubes
    if(main.Current.content.length == 2)
        cubeDrawResult(main.Current.content[0],main.Current.content[1]);
    else if(main.Current.content.length == 1) {
        endAction();
    }
    else {
        main.game_status_parameters.fundChoiceNeeded = false;
    }
}

function cubeDrawResult(c1, c2)
{ 
    if(c1 < c2)
    {
        main.draw = c1 + c2;
    }
    else
    {
        main.draw = c2 + c1;
    }
    
    if(main.game_status_actionNeeded && !main.game_status_parameters.actionCompleted)
    {
        main.Actions.forEach(function(action){
            if(main.draw == action.code){
                action.buttons.forEach(function(btn){
                    addButton("cube_draw." + main.draw + "." + btn.name, "action-btn", action.buttons.length, btn.action);
                });                
            }
        });
    }
    else
    {
        endAction();
    }

    $("#result-box").slideDown(700);
}

function endAction()
{
    main.checkLose();

    if(!main.game_status_actionNeeded || (main.game_status_actionNeeded && main.game_status_parameters.actionCompleted))
    {
        main.actions_available = [];

        if(main.game_status_cutsNeeded)
            createCuts();
        else if(main.game_status_fundNeeded)
            createFunds();
    }
}

function createCuts() 
{
    //cuts on all
    if(getAllIndexes(main.Current.content,"K").length == 2){
        addButton("cube_draw.KK.IncreaseCuts", "cuts-btn", 1, function(){
            main.Institutions.forEach(function(institution){IncreaseCuts(institution);});
            addToArray(drawSpecificCube(main.Current.content,"K"), main.Used.content);
            addToArray(drawSpecificCube(main.Current.content,"K"), main.Used.content);
            endCuts();
        });
        return;
    }
    
    let institutions_cuttable = [];

    if(main.Current.content.length === 1 && getAllIndexes(main.Current.content,"K").length == 1){
        main.Institutions.forEach(function(institution){
            institutions_cuttable.push(institution);
        });
    }
    else
    {
        main.Institutions.forEach(function(institution){
            institution.cubes_on_right.forEach(function(cubes){
                if(cubes.join("") === main.draw || [cubes[1],cubes[0]].join("") === main.draw )
                {
                    institutions_cuttable.push(institution);
                }
            });
        });
    }

    institutions_cuttable.forEach(function(institution){
        addButton("action_description.IncreaseCuts." + institution.code, "cuts-btn", institutions_cuttable.length, function(){
            IncreaseCuts(institution);
            addToArray(drawSpecificCube(main.Current.content,"K"), main.Used.content);
            endCuts();
        });        
    });
}

function IncreaseCuts(institution) 
{
    if(institution.value < institution.MAX_VALUE) {
        institution.value++;
    }
    else {
        institution.value = 1;
        institution.run_effect();
    }
}

function endCuts()
{
    main.checkLose();

    if(!main.game_status_cutsNeeded)
    {
        main.cuts_available = [];
        if(main.game_status_fundNeeded)
            createFunds();
    }
}

function createFunds() 
{
    //institution that can be funded
    let number = 0    

    main.Institutions.forEach(function(institution){
        if(institution.founded < institution.REQ_FOUND) number++;
    });

    let btnNum = 2;
    if(number) btnNum = 3;


    addButton("action_description.Funds.Discard", "fund-btn", btnNum, function(){
        addToArray(drawSpecificCube(main.Current.content,"Y"), main.Used.content);
        endFunds();
    });
    addButton("action_description.Funds.Treasury", "fund-btn", btnNum, function(){
        addToArray(drawSpecificCube(main.Current.content,"Y"), main.Treasury.content);
        endFunds();
    });
    if(number)
        addButton("action_description.Funds.Fund", "fund-btn", 3, function(){     
            drawSpecificCube(main.Current.content,"Y");   
            main.game_status_parameters.fundChoiceNeeded = true;
            main.game_status_parameters.fundChoiceCompleted = false;

            main.Institutions.forEach(function(institution){
                if(institution.founded < institution.REQ_FOUND) fundChoise(institution, number, 1);
            });
            endFunds();
        });
}

function fundChoise(institution, number, cubesNumber) 
{
    addButton('institution.' + institution.code + '.action', "fund-c-btn", number, function(){
                institution.founded += cubesNumber;
                //se ho raggiunto il numero di cubi richiesto (funziona solo con 1 o 2 ma è quanto basta)
                if(institution.founded%institution.REQ_FOUND === 0) institution.run_action();
                main.game_status_parameters.fundChoiceCompleted = true;
                endFundChoice();
            });  
}

function endFunds()
{
    main.checkLose();
    main.fund_available = [];

    if(main.game_status_fundNeeded && !main.game_status_parameters.fundChoiceNeeded)
        createFunds();
}

function endFundChoice()
{
    main.checkLose();

    if(!main.game_status_parameters.fundChoiceNeeded || (main.game_status_parameters.fundChoiceNeeded && main.game_status_parameters.fundChoiceCompleted))
    {
        main.fund_c_available = [];

        if(main.game_status_fundNeeded)
            createFunds();
    }
}


/*DEFAULT ACTIONS*/
function endDefaultAction() {
    //sistema eventuali pagamenti dovuti
    main.removePayStack();

    main.checkLose();

    refreshCubeDrawResult();
}
