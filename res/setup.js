
function bagSetUp()
{
    /*
     4 Black/Debt 
     2 Red/Crime & Unrest 
     2 Blue/Security & Policing 
     1 White/Welfare 
     1 Yellow/Income
    */    
    main.Bag.content = [];
    main.Current.content = [];
    main.Used.content = [];
    main.Treasury.content = [];

    main.new_game_options.country_profile.split('').forEach(function(letter) {
        addToArray(letter, main.Bag.content);
    });
    
    main.new_game_options.difficulty.split('').forEach(function(letter) {
        addToArray(letter, main.Bag.content);    
    });
}


function defaultTrackSetUp()
{
    main.Tracks.Employment = 5;
    main.Tracks.PublicSafety = 5;
    main.Tracks.Wealth = 5;
    main.Tracks.Health = 5;
    main.Tracks.Popularity = 5;
}

function defaultInstitutionsSetUp()
{
    main.Institutions = [];

    main.Institutions.push({
                code: "PE", 
                founded: 0,
                value: 1,
                MAX_VALUE: 3,
                cubes_on_right: [['K','Y'], ['K','R'],['K','W']],
                run_effect: function() {main.Tracks.Employment = Math.max(main.Tracks.Employment -2,main.Tracks.MIN_POINTS);},
                run_action: function() {main.Tracks.Employment = Math.min(main.Tracks.Employment +1,main.Tracks.MAX_POINTS);}
            });
    main.Institutions.push({
                code: "NS", 
                founded: 0,
                value: 1,
                MAX_VALUE: 3,
                cubes_on_right: [['K','R'],['K','B']],
                run_effect: function() {addToArray("R", main.Used.content);},
                run_action: function() {addToArray("B", main.Used.content);}
            });
    main.Institutions.push({
                code: "SW", 
                founded: 0,
                value: 1,
                MAX_VALUE: 3,
                cubes_on_right: [['K','B'], ['K','Y'],['K','W']],
                run_effect: function() {main.Tracks.Health = Math.max(main.Tracks.Health -2,main.Tracks.MIN_POINTS);},
                run_action: function() {addToArray("W", main.Used.content);}
            });


    // main.fundedInst.PE = 0;
    // main.fundedInst.NS = 0;
    // main.fundedInst.SW = 0;
}

function defaultActions() {    

    main.StandardActions = [];

    main.StandardActions.push({ name: "borrow_money", click: function(){
            addToArray("Y",main.Used.content);
            addToArray("Y",main.Used.content);
            addToArray("K",main.Bag.content);

            endDefaultAction();
        }
    });
    main.StandardActions.push({ name: "raise_taxes", click: function(){
            addToArray("Y",main.Bag.content);
            addToArray("R",main.Bag.content);

            endDefaultAction();
        }
    });
    main.StandardActions.push({ name: "pay_loans", click: function(){
            let YToPay = 2;
            let KToPay = 1;

            YAvailable = 0;
            KAvailable = 0;

            YAvailable = getAllIndexes(main.Current.content,"Y").length + getAllIndexes(main.Used.content,"Y").length + getAllIndexes(main.Treasury.content,"Y").length;
            KAvailable = getAllIndexes(main.Current.content,"K").length + getAllIndexes(main.Used.content,"K").length + getAllIndexes(main.Treasury.content,"K").length;

            if(YAvailable < YToPay) {alert(window.alertMsg.NotEnoughY);return;}
            if(KAvailable < KToPay) {alert(window.alertMsg.NotEnoughK);return;}

            //first remove from Current
            while(YToPay > 0) {
                if(main.Current.content.indexOf("Y") > -1)
                {
                    drawSpecificCube(main.Current.content,"Y")
                    YToPay--;
                }
                else
                    break;
            }

            while(KToPay > 0) {
                if(main.Current.content.indexOf("K") > -1) {
                    drawSpecificCube(main.Current.content,"K")
                    KToPay--;
                }
                else
                    break;
            }

            while(YToPay > 0) {
                
                    if(main.Treasury.content.indexOf("Y") > -1) {
                        drawSpecificCube(main.Treasury.content,"Y");
                        YToPay--;
                    }
                    else if(main.Used.content.indexOf("Y") > -1) {
                        drawSpecificCube(main.Used.content,"Y");
                        YToPay--;
                    }
            }

            while(KToPay > 0) {
                if(main.Used.content.indexOf("K") > -1) {
                    drawSpecificCube(main.Used.content,"K")
                    KToPay--;
                }
                else
                    break;
            }

            endDefaultAction();
        }
    });

    main.actions_available = [];
    main.cuts_available = [];
    main.fund_available = [];
    main.fund_c_available = [];

    main.game_status_parameters.actionNeeded = false;
    main.game_status_parameters.actionCompleted = false;
    main.game_status_parameters.cutsNeeded = false;
    main.game_status_parameters.cutsCompleted = false;
    main.game_status_parameters.fundNeeded = false;
    main.game_status_parameters.fundCompleted = false;
    main.game_status_parameters.fundChoiceNeeded = false;
    main.game_status_parameters.fundChoiceCompleted = false;
    main.game_status_parameters.gameFinished = false;
    main.game_status_parameters.turnEnded = true;
}

function defaultSetUp()
{
    bagSetUp();
    defaultTrackSetUp();
    defaultInstitutionsSetUp();
    defaultActions();
    refreshUx();
}
