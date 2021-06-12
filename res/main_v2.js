
//##########################
// vue
//##########################
const statTime = (new Date()).getTime();

var main = new Vue({
    i18n,
    el: '#main',
    data: {
        new_game_options: {
            country_profile: "KKKKWBBRRY",
            country_profile_CUSTOM: "KKKKWBBRRY",
            difficulty: "",
            extra_inst: false,
        },
        Spaces: [],
        Tracks: [],
        actions_available: [],
        cuts_available: [],
        fund_available: [],
        fund_c_available: [],
        game_status_parameters: {       
            actionCompleted: false,
            turnEnded: true,
            fundChoiceNeeded: false,
            fundChoiceCompleted: false,
            gameFinished: true,
            gameWin: false,
            gameLose: false,
        },
        StandardActions: [],
        Institutions: [],
        extra_institutions: [],
        Actions: [],
        toPayStack: [],
        trackValues: [10,9,8,7,6,5,4,3,2,1,0],
    },
    computed: {        
        draw: function(){            
            if(this.Current && this.Current.content.length == 2) {
                let c1 = this.Current.content[0];
                let c2 = this.Current.content[1];
                if(c1 < c2)
                {
                    return c1 + c2;
                }
                else
                {
                    return c2 + c1;
                }
            }
            else
                return "";
        },
        game_status_actionNeeded: function(){
            return this.Current && this.Current.content.length === 2;
        },
        game_status_cutsNeeded: function(){
            return this.Current && this.Current.content.indexOf("K") > -1;
        },
        game_status_fundNeeded: function(){
            return this.Current && this.Current.content.indexOf("Y") > -1;
        },
        game_status_canEndTurn: function(){
            return this.game_status_canPlay && (!this.game_status_actionNeeded || this.game_status_parameters.actionCompleted) && !this.game_status_cutsNeeded && !this.game_status_fundNeeded && (!this.game_status_parameters.fundChoiceNeeded || this.game_status_parameters.fundChoiceCompleted);
        },
        game_status_canPlay: function(){
            return !(this.game_status_parameters.gameWin || this.game_status_parameters.gameLose || this.game_status_parameters.gameFinished);
        },
        Bag: function(){
            return this.getSpaceByCode("B");
        },
        Current: function(){
            return this.getSpaceByCode("C");
        },
        Used: function(){
            return this.getSpaceByCode("U");
        },
        Treasury: function(){
            return this.getSpaceByCode("T");
        },
    },
    methods: { 
        getSpaceByCode: function(code){            
            return this.Spaces.find(s => s.code === code);
        },
        incrementTrack: function(track, code, value){
            if(track === undefined) track = main.Tracks.find(t => t.code === code);

            if(value > 0)
                track.value = Math.min(track.value + value, track.MAX_VALUE);
            else                
                track.value = Math.max(track.value + value, track.MIN_VALUE);

        },
        newGame: function()
        {
            ////////////////////////////////////////// BAG SETUP
            /*
             4 Black/Debt 
             2 Red/Crime & Unrest 
             2 Blue/Security & Policing 
             1 White/Welfare 
             1 Yellow/Income
            */    
            this.Spaces = [];

            this.Spaces.push({code: "B", name: "Bag", visible: true, hidable: true, hide_content: true, content: []});
            this.Spaces.push({code: "C", name: "Current", visible: true, hidable: false, hide_content: false, content: []});
            this.Spaces.push({code: "U", name: "Used", visible: true, hidable: false, hide_content: false, content: []});
            this.Spaces.push({code: "T", name: "Treasury", visible: true, hidable: false, hide_content: false, content: []});

            if(this.new_game_options.country_profile === "CUSTOM") {
                this.new_game_options.country_profile_CUSTOM.split('').forEach(function(letter) {
                    main.Bag.content.push(letter);
                });
            }
            else {      
                this.new_game_options.country_profile.split('').forEach(function(letter) {
                    main.Bag.content.push(letter);
                });          
            }
            
            this.new_game_options.difficulty.split('').forEach(function(letter) {
                main.Bag.content.push(letter);
            });

            ////////////////////////////////////////// TRACKS SETUP
            // this.Tracks.Employment = 5;
            // this.Tracks.PublicSafety = 5;
            // this.Tracks.Wealth = 5;
            // this.Tracks.Health = 5;
            // this.Tracks.Popularity = 5;
            this.Tracks = [];

            this.Tracks.push({code: "E", name: "employment", MIN_VALUE: 0, MAX_VALUE: 10, value: 5, revenue: [
                [],[],[],[],[],[["Y","T"]],[["Y","T"]],[["Y","T"]],[["Y","T"]],[["Y","T"],["Y","T"]],[["Y","T"],["Y","T"]]],
                LOSE_VALUE: 0, affected_by: []});            
            this.Tracks.push({code: "S", name: "public_safety", MIN_VALUE: 0, MAX_VALUE: 10, value: 5, revenue: [], LOSE_VALUE: 0, affected_by: []});
            this.Tracks.push({code: "W", name: "wealth", MIN_VALUE: 0, MAX_VALUE: 10, value: 5, revenue: [], LOSE_VALUE: 0, affected_by: ["E"]});
            this.Tracks.push({code: "H", name: "health", MIN_VALUE: 0, MAX_VALUE: 10, value: 5, revenue: [], LOSE_VALUE: 0, affected_by: ["S"]});
            this.Tracks.push({code: "P", name: "popularity", MIN_VALUE: 0, MAX_VALUE: 10, value: 5, revenue: [], LOSE_VALUE: 0, affected_by: ["W","H"]});

            this.tracksMin = 0;
            this.tracksMax = 10;            

            ////////////////////////////////////////// Institutions SETUP
            this.Institutions = [];

            this.Institutions.push({
                        code: "PE", 
                        founded: 0,
                        REQ_FOUND: 1,
                        value: 1,                        
                        MAX_VALUE: 3,
                        cubes_on_right: [['K','Y'], ['K','R'],['K','W']],
                        run_effect: function() {main.incrementTrack(undefined, "E", -2);},
                        run_action: function() {main.incrementTrack(undefined, "E", 1);}
                    });
            this.Institutions.push({
                        code: "NS", 
                        founded: 0,
                        REQ_FOUND: 1,
                        value: 1,
                        MAX_VALUE: 3,
                        cubes_on_right: [['K','R'],['K','B']],
                        run_effect: function() {main.addToArray("R", main.Used.content);},
                        run_action: function() {main.addToArray("B", main.Used.content);}
                    });
            this.Institutions.push({
                        code: "SW", 
                        founded: 0,
                        REQ_FOUND: 1,
                        value: 1,
                        MAX_VALUE: 3,
                        cubes_on_right: [['K','B'], ['K','Y'],['K','W']],
                        run_effect: function() {main.incrementTrack(undefined, "H", -2);},
                        run_action: function() {main.Used.content.push("W");}
                    });

            ////////////////////////////////////////// Extra Institutions SETUP
            if(this.new_game_options.extra_inst) {
                this.extra_institutions = [];
                this.extra_institutions.push({
                            code: "IF", 
                            founded: 0,
                            REQ_FOUND: 1,
                            value: 1,
                            MAX_VALUE: 3,
                            cubes_on_right: [['K','B']],
                            run_effect: function() {main.incrementTrack(undefined, "H", -1);},
                            run_action: function() {main.incrementTrack(undefined, "W", 1);}
                        });
                this.extra_institutions.push({
                            code: "IN", 
                            founded: 0,
                            REQ_FOUND: 2,
                            value: 1,
                            MAX_VALUE: 3,
                            cubes_on_right: [['K','R']],
                            run_effect: function() {main.addToArray("K", main.Used.content);},
                            run_action: function() {main.addToArray("Y", main.Used.content);}
                        });
                this.extra_institutions.push({
                            code: "HE", 
                            founded: 0,
                            REQ_FOUND: 1,
                            value: 1,
                            MAX_VALUE: 3,
                            cubes_on_right: [['K','Y']],
                            run_effect: function() {main.addToArray("R", main.Used.content);},
                            run_action: function() {main.incrementTrack(undefined, "E", 1);
                                                    main.incrementTrack(undefined, "W", -1);}
                        });
            }

            ////////////////////////////////////////// StandardActions SETUP

            this.StandardActions = [];

            this.StandardActions.push({ name: "borrow_money", click: function(){
                    main.Used.content.push("Y");
                    main.Used.content.push("Y");
                    main.Bag.content.push("K");

                    main.endDefaultAction();
                }
            });
            this.StandardActions.push({ name: "raise_taxes", click: function(){
                    main.Bag.content.push("Y");
                    main.Bag.content.push("R");

                    main.endDefaultAction();
                }
            });
            this.StandardActions.push({ name: "pay_loans", click: function(){

                    let YToPay = 2;
                    let KToPay = 1;

                    var spacesForPay = [main.Current, main.Used, main.Treasury];

                    if(!main.canPay("Y", YToPay, spacesForPay, true)) return;
                    if(!main.canPay("K", KToPay, spacesForPay, true)) return; 

                    main.doPay("Y", YToPay, spacesForPay);
                    main.doPay("K", KToPay, spacesForPay);

                    main.endDefaultAction();
                }
            });

            this.actions_available = [];
            this.cuts_available = [];
            this.fund_available = [];
            this.fund_c_available = [];

            this.game_status_parameters.actionCompleted = false;
            this.game_status_parameters.turnEnded = true;
            this.game_status_parameters.fundChoiceNeeded = false;
            this.game_status_parameters.fundChoiceCompleted = false;
            this.game_status_parameters.gameFinished = false;
            this.game_status_parameters.gameWin = false;
            this.game_status_parameters.gameLose = false;


            ////////////////////////////////////////// ACTION SETUP

            this.Actions = [];
            this.Actions.push({code: "KK", buttons: [
                {name: "ReduceWealth", action: function(){
                    main.incrementTrack(undefined, "W", -1);
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }}]});

            this.Actions.push({code: "BK", buttons: [
                {name: "SpendY", action: function(){
                    var indexY = main.Treasury.content.indexOf("Y");
                    if(indexY > -1) { 
                        main.Treasury.content.splice(indexY, 1); 
                        main.game_status_parameters.actionCompleted = true;}
                    else { 
                        bootbox.alert(main.$t("game_interface.alert.NoIncome")); 
                        return null;
                    }
                    main.endGenericAction();
                }},
                {name: "AddR", action: function(){
                    main.addToArray("R", main.Used.content);
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }}
                ]});

            this.Actions.push({code: "KR", buttons: [
                {name: "DecreasePopularity", action: function(){
                    main.incrementTrack(undefined, "P", -1);
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }}]});

            this.Actions.push({code: "RY", buttons: [
                {name: "RemoveYR", action: function(){           
                    if(main.Current.content.indexOf("Y") < 0) {
                        bootbox.alert(main.$t("game_interface.alert.NotEnoughY")); 
                        return null;
                    }
                    if(main.Current.content.indexOf("R") < 0) {
                        bootbox.alert(main.$t("game_interface.alert.NotEnoughR")); 
                        return null;
                    }
                    main.drawSpecificCube(main.Current.content,"R");
                    main.drawSpecificCube(main.Current.content,"Y"); 
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }},
                {name: "IncreasePopularityAddK", action: function(){
                    main.incrementTrack(undefined, "P", 1);
                    main.addToArray("K", main.Used.content);
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }},
                ]});

            this.Actions.push({code: "RR", buttons: [
                {name: "DecreasePS2", action: function(){
                    main.incrementTrack(undefined, "S", -2);
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }}]});

            this.Actions.push({code: "RW", buttons: [
                {name: "DecreaseEmployment", action: function(){
                    main.incrementTrack(undefined, "E", -1);
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }}]});

            this.Actions.push({code: "WW", buttons: [
                {name: "IncreaseEmployment2", action: function(){
                    main.incrementTrack(undefined, "E", 2);
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }}]});

            this.Actions.push({code: "YY", buttons: [
                {name: "IncreaseWealth", action: function(){
                    main.incrementTrack(undefined, "W", 1);
                    main.actions_available = [];
                    //refreshUx();

                    main.addButton("cube_draw.YY.SpendYY", "action-btn", 2, function(){
                        if(main.getAllIndexes(main.Current.content,"Y").length < 2)
                        {
                            //if I have less tha 2 Y I can't do it
                            bootbox.alert(main.$t("game_interface.alert.NotEnoughY")); 
                            return null;
                        }

                        main.drawSpecificCube(main.Current.content,"Y");
                        main.drawSpecificCube(main.Current.content,"Y");
                        main.game_status_parameters.fundChoiceNeeded = true;

                        main.Institutions.forEach(function(institution){
                            main.fundChoise(institution, main.Institutions.length, 2);
                        });

                        main.game_status_parameters.actionCompleted = true;
                        main.endGenericAction();});   
                    main.addButton("cube_draw.YY.NO", "action-btn", 2, function(){
                        //do nothing
                        main.game_status_parameters.actionCompleted = true;
                        main.endGenericAction();});  
                }}]});

            this.Actions.push({code: "KY", buttons: [
                {name: "SpendYRemoveK", action: function(){         

                    if(main.Current.content.indexOf("Y") < 0) {
                        bootbox.alert(main.$t("game_interface.alert.NotEnoughY")); 
                        return null;
                    }
                    if(main.Current.content.indexOf("K") < 0) {
                        bootbox.alert(main.$t("game_interface.alert.NotEnoughK")); 
                        return null;
                    }
                    main.drawSpecificCube(main.Current.content,"K");
                    main.drawSpecificCube(main.Current.content,"Y");  //TODO: issue#1
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }},
                {name: "Cuts", action: function(){
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }},
                ]});

            this.Actions.push({code: "BY", buttons: [
                {name: "IncreasePopularity", action: function(){    
                    main.incrementTrack(undefined, "P", 1);
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }},
                {name: "IncreasePS", action: function(){
                    main.incrementTrack(undefined, "S", 1);
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }},
                ]});

            this.Actions.push({code: "BB", buttons: [
                {name: "IncreasePS", action: function(){
                    main.incrementTrack(undefined, "S", 2);
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }}]});

            this.Actions.push({code: "BR", buttons: [
                {name: "RemoveBR", action: function(){    
                    if(main.Current.content.indexOf("B") < 0) {
                        bootbox.alert(main.$t("game_interface.alert.NotEnoughB")); 
                        return null;
                    }
                    if(main.Current.content.indexOf("R") < 0) {
                        bootbox.alert(main.$t("game_interface.alert.NotEnoughR")); 
                        return null;
                    }
                    main.drawSpecificCube(main.Current.content,"B");
                    main.drawSpecificCube(main.Current.content,"R");
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }},
                {name: "ReducePS", action: function(){
                    main.incrementTrack(undefined, "S", -1);
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }},
                ]});

            this.Actions.push({code: "BW", buttons: [
                {name: "RemoveW", action: function(){    
                    if(main.Current.content.indexOf("W") < 0) {
                        bootbox.alert(main.$t("game_interface.alert.NotEnoughW")); 
                        return null;
                    }

                    main.drawSpecificCube(main.Current.content,"W");
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }},
                {name: "IncreaseEmploymentDecreasePopularity", action: function(){
                    main.incrementTrack(undefined, "E", 1);
                    main.incrementTrack(undefined, "P", -1);
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }},
                ]});

            this.Actions.push({code: "WY", buttons: [
                {name: "IncreaseHealth", action: function(){
                    main.incrementTrack(undefined, "H", 2);
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }}]});

            this.Actions.push({code: "KW", buttons: [
                {name: "SpendY", action: function(){    
                    var indexY = main.Treasury.content.indexOf("Y");
                    if(indexY > -1) { 
                        main.Treasury.content.splice(indexY, 1); 
                        main.game_status_parameters.actionCompleted = true;}
                    else { 
                        bootbox.alert(main.$t("game_interface.alert.NoIncome")); 
                        return null;
                    }
                    main.endGenericAction();
                }},
                {name: "ReduceHealth", action: function(){
                    main.incrementTrack(undefined, "H", -1);
                    main.game_status_parameters.actionCompleted = true;
                    main.endGenericAction();
                }},
                ]});




            //TODO: remove
            //refreshUx();

        },
        addExtraInstitutionDialog: function(){
            let options = [];

            var spacesForPay = [main.Current, main.Used, main.Treasury];
            if(!this.canPay("Y", 2, spacesForPay, true)) return; 

            this.extra_institutions.forEach(function(inst){
                options.push({text: main.$t('institution.' + inst.code + '.title'), value: inst.code});
            });

            bootbox.prompt({
                title: main.$t("game_interface.alert.buy_extra_inst"),
                inputType: 'select',
                inputOptions: options,
                callback: function (result) {
                    main.doPay("Y", 2, [main.Current, main.Used, main.Treasury]);
                    main.extra_institutions.forEach(function(inst){
                        if(inst.code === result) {
                            var index = main.extra_institutions.indexOf(inst);
                            if(index > -1){
                                var selected_inst = main.extra_institutions[index];
                                main.extra_institutions.splice(index,1);
                                main.Institutions.push(selected_inst);
                            }
                        }
                    });
                    main.endDefaultAction();
                }
            });
        },
        canPay: function(type, number, spacesForPay, showAlert){
            let result = false;

            let available = 0;

            spacesForPay.forEach(function(s){
                available += main.getAllIndexes(s.content,type).length;
            });

            result = available >= number;

            if(!result && showAlert) bootbox.alert(main.$t("game_interface.alert.NotEnough" + type)); 

            return result;
        },
        //aggiunge a un array le cose da pagare
        addToPayStack: function(type, number, spacesForPay){
            while(number > 0) {
                this.toPayStack.push({type: type, spaces: spacesForPay});            
                number--;
            }
        },
        //paga il primo della lista ecc...
        removePayStack: function(){

            if(this.toPayStack.length === 0) {
                this.refreshCubeDrawResult();
                return;
            }

            var type = this.toPayStack[0].type;
            var spacesForPay = this.toPayStack[0].spaces;
            this.toPayStack.shift();

            let available = 0;

            spacesWithAvailability = [];
            spacesForPay.forEach(function(s){
                let number = main.getAllIndexes(s.content,type).length;
                available += number;
                if(number > 0) spacesWithAvailability.push(s);
            });

            //se ho solo quanto serve non scelgo
            if(available == 1 || spacesWithAvailability.length == 1)
            {
                main.drawSpecificCube(spacesWithAvailability[0].content,type);
                main.removePayStack();
            }
            else
            {
                let btns = [];
                spacesWithAvailability.forEach(function(s){
                    btns.push({label: s.name, className: 'btn-info space-' + s.code + ' type-' + type, callback: function(event){ 
                        //pesco il cubo da pagare
                        main.drawSpecificCube(main.getSpaceByCode(event.currentTarget.classList[2].substring(6)).content,event.currentTarget.classList[3].substring(5)); 
                        //pago il rimanente
                        main.removePayStack();
                    }});
                });

                var dialog = bootbox.dialog({
                    title: main.$t("game_interface.alert.cube_choice"),
                    message: main.$t("game_interface.alert.ask_cube_choice." + type),
                    buttons: btns,                        
                });
            }
        },
        //aggiunge le cose da pagare e avvia i pagamenti
        doPay: function(type, number, spacesForPay){
            this.addToPayStack(type, number, spacesForPay);
        },
        checkLose: function() {
            main.Tracks.forEach(function(t){
                if(t.value <= t.LOSE_VALUE) main.gameLosed();
            });
        },
        gameLosed: function() {
            this.game_status_parameters.gameLose = true;
            this.engGameTriggered("Lose");
        },
        gameWin:  function() {
            this.game_status_parameters.gameWin = true;
            this.engGameTriggered("Win");
        },
        endCurrentGame:  function() {
            this.engGameTriggered("EndGame");
        },
        engGameTriggered: function(reason){

            var dialog = bootbox.dialog({
                title: main.$t("game_interface.alert." + reason + ".title"),
                message: main.$t("game_interface.alert." + reason + ".ask"),
                buttons: [
                    {label: main.$t("game_interface.look_to_curr_game"), className: 'btn-secondary', callback: function(){return;}},
                    {label: main.$t("game_interface.new_game"), className: 'btn-info', callback: main.finishCurrentGame}],                        
            });
        },
        finishCurrentGame: function(){            
            main.game_status_parameters.gameFinished = true;
            $("#result-box").hide();
            $(".newGame-btn-g").show();

            main.actions_available = [];
            main.cuts_available = [];
            main.fund_available = [];
            main.fund_c_available = [];


            main.game_status_parameters.actionCompleted = true;
            main.game_status_parameters.turnEnded = true;
            main.game_status_parameters.fundChoiceNeeded = false;
            main.game_status_parameters.fundChoiceCompleted = true;
        },
        newTurn: function() {
            var c1 = this.drawCube(this.Bag.content);
            if(c1) {
                main.addToArray(c1,this.Current.content);
            }
            else {
                //No more cubes???
                //trig end year
            }            
            if(this.Bag && this.Bag.content.length > 0) { 
                var c2 = this.drawCube(this.Bag.content);
                main.addToArray(c2,this.Current.content);
            }
            else {
                //No more cubes???
                //move one cube from current to used 
                if(this.Current.content && this.Current.content.length == 1) {
                    main.addToArray(this.drawCube(this.Current.content),this.Used.content);
                }     
            }

            this.game_status_parameters.actionCompleted = false;
            this.game_status_parameters.fundChoiceCompleted = false;
            this.game_status_parameters.fundChoiceNeeded = false;
                
            this.refreshCubeDrawResult();
            
            this.game_status_parameters.turnEnded = false;    
        },
        endTurn: function() {
            $("#result-box").hide();

            while(this.Current.content && this.Current.content.length > 0) {
                    main.addToArray(this.drawCube(this.Current.content),this.Used.content);
                }

            this.game_status_parameters.turnEnded = true;
        },
        newYear: function() {
            //Check to see if you have won - see Ending the Game below
            if(this.Used.content.indexOf("K") < 0) this.gameWin();

            this.Tracks.forEach(function(track){
                if(track.revenue.length != 0 && track.revenue[track.value].length != 0){
                    track.revenue[track.value].forEach(function(rev){
                        main.addToArray(rev[0], main.getSpaceByCode(rev[1]).content);
                    });
                }

                if(track.affected_by.length != 0){
                    track.affected_by.forEach(function(aff){
                        sourceTrack = main.Tracks.find(t => t.code === aff)
                        if(sourceTrack.value > track.value)
                            main.incrementTrack(track,track.code,1);
                        else if(sourceTrack.value < track.value)
                            main.incrementTrack(track,track.code,-1);
                    });
                }

            });

            //Put all the cubes from the Used area and Income cubes placed on Institutions back in the bag and start the next political year.
            while(this.Used.content && this.Used.content.length > 0) {
                main.addToArray(this.drawCube(this.Used.content),this.Bag.content);
            }

            this.Institutions.forEach(function(institution){
                while(institution.founded > 0) { main.addToArray("Y", main.Bag.content); institution.founded--;}
            });    
        },                
        refreshCubeDrawResult: function() {
            this.actions_available = [];
            this.cuts_available = [];
            this.fund_available = [];
            this.fund_c_available = [];

            //2 cubes
            if(this.Current.content.length == 2) {

                if(main.game_status_actionNeeded && !main.game_status_parameters.actionCompleted)
                {
                    main.Actions.forEach(function(action){
                        if(main.draw === action.code){
                            action.buttons.forEach(function(btn){
                                main.addButton("cube_draw." + main.draw + "." + btn.name, "action-btn", action.buttons.length, btn.action);
                            });        
                            return;        
                        }
                    });
                }
                else
                {
                    console.log('\x1b[33m%s\x1b[0m', "USELESS? refreshCubeDrawResult EndAction");
                    main.endGenericAction();
                }

                $("#result-box").slideDown(700);
            }           
            else if(main.Current.content.length == 1) {
                console.log('\x1b[33m%s\x1b[0m', "USELESS? refreshCubeDrawResult EndAction");
                main.endGenericAction();
            }
            else {
                main.game_status_parameters.fundChoiceNeeded = false;
            }
        },
        endGenericAction: function(){                    
            main.checkLose();


            main.actions_available = [];
            main.cuts_available = [];
            main.fund_available = [];

            //verifico se ho completato le azioni
            if(main.game_status_actionNeeded && !main.game_status_parameters.actionCompleted)
                return;

            //verifico se ho completato i tagli
            if(main.game_status_cutsNeeded)
            {
                this.createCuts();
                return;
            }


            if(main.game_status_parameters.fundChoiceNeeded && !main.game_status_parameters.fundChoiceCompleted)
            {
                return;
            }

            main.fund_c_available = [];

            //verifico se ho completato i finanziamenti
            if(main.game_status_fundNeeded){
                main.createFunds();
                return;
            }
        },        
        endDefaultAction: function() {
            //sistema eventuali pagamenti dovuti
            main.removePayStack();

            main.checkLose();

            main.refreshCubeDrawResult();
        },
        createCuts: function() 
        {
            //cuts on all
            if(this.getAllIndexes(main.Current.content,"K").length == 2){
                this.addButton("cube_draw.KK.IncreaseCuts", "cuts-btn", 1, function(){
                    main.Institutions.forEach(function(institution){
                        main.IncreaseCuts(institution);});
                        main.addToArray(main.drawSpecificCube(main.Current.content,"K"), main.Used.content);
                        main.addToArray(main.drawSpecificCube(main.Current.content,"K"), main.Used.content);
                        main.endGenericAction();
                    });
                return;
            }
            
            let institutions_cuttable = [];

            if(this.Current.content.length === 1 && this.getAllIndexes(main.Current.content,"K").length == 1){
                this.Institutions.forEach(function(institution){
                    institutions_cuttable.push(institution);
                });
            }
            else
            {
                this.Institutions.forEach(function(institution){
                    institution.cubes_on_right.forEach(function(cubes){
                        if(cubes.join("") === main.draw || [cubes[1],cubes[0]].join("") === main.draw )
                        {
                            institutions_cuttable.push(institution);
                        }
                    });
                });
            }

            institutions_cuttable.forEach(function(institution){
                main.addButton("action_description.IncreaseCuts." + institution.code, "cuts-btn", institutions_cuttable.length, function(){
                        main.IncreaseCuts(institution);
                        main.addToArray(main.drawSpecificCube(main.Current.content,"K"), main.Used.content);
                        main.endGenericAction();
                    });        
            });
        },
        IncreaseCuts: function(institution) 
        {
            if(institution.value < institution.MAX_VALUE) {
                institution.value++;
            }
            else {
                institution.value = 1;
                institution.run_effect();
            }
        },
        createFunds: function() 
        {
            //institution that can be funded
            let number = 0    

            this.Institutions.forEach(function(institution){
                if(institution.founded < institution.REQ_FOUND) number++;
            });

            let btnNum = 2;
            if(number) btnNum = 3;


            this.addButton("action_description.Funds.Discard", "fund-btn", btnNum, function(){
                main.addToArray(main.drawSpecificCube(main.Current.content,"Y"), main.Used.content);
                main.endGenericAction();
            });
            this.addButton("action_description.Funds.Treasury", "fund-btn", btnNum, function(){
                main.addToArray(main.drawSpecificCube(main.Current.content,"Y"), main.Treasury.content);
                main.endGenericAction();
            });
            if(number)
                this.addButton("action_description.Funds.Fund", "fund-btn", 3, function(){     
                    main.drawSpecificCube(main.Current.content,"Y");   
                    main.game_status_parameters.fundChoiceNeeded = true;
                    main.game_status_parameters.fundChoiceCompleted = false;

                    main.Institutions.forEach(function(institution){
                        if(institution.founded < institution.REQ_FOUND) main.fundChoise(institution, number, 1);
                    });
                    main.endGenericAction();
                });
        },
        fundChoise: function(institution, number, cubesNumber) 
        {
            this.addButton('institution.' + institution.code + '.action', "fund-c-btn", number, function(){
                        institution.founded += cubesNumber;
                        //se ho raggiunto il numero di cubi richiesto (funziona solo con 1 o 2 ma è quanto basta)
                        if(institution.founded%institution.REQ_FOUND === 0) institution.run_action();
                        main.game_status_parameters.fundChoiceCompleted = true;
                        main.endGenericAction();
                    });  
        },
        addToArray: function(cube, array) 
        {
            array.push(cube);
        },
        drawCube: function(array) 
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
                console.log('\x1b[33m%s\x1b[0m', "USELESS? Empty " + array + "!");
            } 
            return cube;
         },
        drawSpecificCube: function(array, type)
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
                        console.log('\x1b[33m%s\x1b[0m', "USELESS? no " + type + " in " + array + "!");
                }
            else
            {
                console.log('\x1b[33m%s\x1b[0m', "USELESS? Empty " + array + "!");
            } 
            return cube;    
        },
        addButton: function(text, classBtn, btnNumber, logic)
        {
            switch(classBtn) {
                case "action-btn": 
                    this.actions_available.push({text: text, click: logic});
                    break;
                case "cuts-btn": 
                    this.cuts_available.push({text: text, click: logic});
                    break;
                case "fund-btn": 
                    this.fund_available.push({text: text, click: logic});
                    break;
                case "fund-c-btn": 
                    this.fund_c_available.push({text: text, click: logic});
                    break;
            }
        },
        getAllIndexes: function(arr, val) {
            var indexes = [], i = -1;
            while ((i = arr.indexOf(val, i+1)) != -1){
                indexes.push(i);
            }
            return indexes;
        },
    },
    beforeCreate: function(){
        console.log("beforeCreate: " + ((new Date()).getTime() - statTime).toString());
    },
    created: function(){
        console.log("created: " + ((new Date()).getTime() - statTime).toString());
        console.log("end created: " + ((new Date()).getTime() - statTime).toString());
    },
    mounted: function(){
        console.log("mounted: " + ((new Date()).getTime() - statTime).toString());
        //after all loaded
        this.$nextTick(function() {
            console.log("nextTick: " + ((new Date()).getTime() - statTime).toString());
            console.log("end nextTick: " + ((new Date()).getTime() - statTime).toString());



            //last to do
            $("#result-box").hide();
            $('div.container').removeClass("loading");
            $('div.loader').hide();

        });
    }
});

Vue.directive('visible', (el, bind) => {el.style.visibility=(!!bind.value) ? 'visible' : 'hidden';});





//init
{

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) { return new bootstrap.Tooltip(tooltipTriggerEl)});

}
    