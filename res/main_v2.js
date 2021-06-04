
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
        draw: "",
        actions_available: [],
        cuts_available: [],
        fund_available: [],
        fund_c_available: [],
        game_status_parameters: {       
            actionCompleted: false,
            turnEnded: true,
            fundChoiceNeeded: false,
            fundChoiceCompleted: false,
            gameFinished: true
        },
        StandardActions: [],
        Institutions: [],
        extra_institutions: [],
        Actions: [],
        toPayStack: [],
        trackValues: [10,9,8,7,6,5,4,3,2,1,0],
    },
    computed: {
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
            return (!this.game_status_actionNeeded || this.game_status_parameters.actionCompleted) && !this.game_status_cutsNeeded && !this.game_status_fundNeeded && (!this.game_status_parameters.fundChoiceNeeded || this.game_status_parameters.fundChoiceCompleted);
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
                        run_effect: function() {addToArray("R", main.Used.content);},
                        run_action: function() {addToArray("B", main.Used.content);}
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
                            run_effect: function() {addToArray("K", main.Used.content);},
                            run_action: function() {addToArray("Y", main.Used.content);}
                        });
                this.extra_institutions.push({
                            code: "HE", 
                            founded: 0,
                            REQ_FOUND: 1,
                            value: 1,
                            MAX_VALUE: 3,
                            cubes_on_right: [['K','Y']],
                            run_effect: function() {addToArray("R", main.Used.content);},
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

                    endDefaultAction();
                }
            });
            this.StandardActions.push({ name: "raise_taxes", click: function(){
                    main.Bag.content.push("Y");
                    main.Bag.content.push("R");

                    endDefaultAction();
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

                    endDefaultAction();
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


            ////////////////////////////////////////// ACTION SETUP

            this.Actions = [];
            this.Actions.push({code: "KK", buttons: [
                {name: "ReduceWealth", action: function(){
                    main.incrementTrack(undefined, "W", -1);
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
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
                    endAction();
                }},
                {name: "AddR", action: function(){
                    addToArray("R", main.Used.content);
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
                }}
                ]});

            this.Actions.push({code: "KR", buttons: [
                {name: "DecreasePopularity", action: function(){
                    main.incrementTrack(undefined, "P", -1);
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
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
                    drawSpecificCube(main.Current.content,"R");
                    drawSpecificCube(main.Current.content,"Y"); 
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
                }},
                {name: "IncreasePopularityAddK", action: function(){
                    main.incrementTrack(undefined, "P", 1);
                    addToArray("K", main.Used.content);
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
                }},
                ]});

            this.Actions.push({code: "RR", buttons: [
                {name: "DecreasePS2", action: function(){
                    main.incrementTrack(undefined, "S", -2);
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
                }}]});

            this.Actions.push({code: "RW", buttons: [
                {name: "DecreaseEmployment", action: function(){
                    main.incrementTrack(undefined, "E", -1);
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
                }}]});

            this.Actions.push({code: "WW", buttons: [
                {name: "IncreaseEmployment2", action: function(){
                    main.incrementTrack(undefined, "E", 2);
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
                }}]});

            this.Actions.push({code: "YY", buttons: [
                {name: "IncreaseWealth", action: function(){
                    main.incrementTrack(undefined, "W", 1);
                    main.actions_available = [];
                    //refreshUx();

                    addButton("cube_draw.YY.SpendYY", "action-btn", 2, function(){
                        if(getAllIndexes(main.Current.content,"Y").length < 2)
                        {
                            //if I have less tha 2 Y I can't do it
                            bootbox.alert(main.$t("game_interface.alert.NotEnoughY")); 
                            return null;
                        }

                        drawSpecificCube(main.Current.content,"Y");
                        drawSpecificCube(main.Current.content,"Y");
                        main.game_status_parameters.fundChoiceNeeded = true;

                        main.Institutions.forEach(function(institution){
                            fundChoise(institution, main.Institutions.length, 2);
                        });

                        main.game_status_parameters.actionCompleted = true;
                        endAction();});   
                    addButton("cube_draw.YY.NO", "action-btn", 2, function(){
                        //do nothing
                        main.game_status_parameters.actionCompleted = true;
                        endAction();});  
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
                    drawSpecificCube(main.Current.content,"K");
                    drawSpecificCube(main.Current.content,"Y");  //TODO: issue#1
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
                }},
                {name: "Cuts", action: function(){
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
                }},
                ]});

            this.Actions.push({code: "BY", buttons: [
                {name: "IncreasePopularity", action: function(){    
                    main.incrementTrack(undefined, "P", 1);
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
                }},
                {name: "IncreasePS", action: function(){
                    main.incrementTrack(undefined, "S", 1);
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
                }},
                ]});

            this.Actions.push({code: "BB", buttons: [
                {name: "IncreasePS", action: function(){
                    main.incrementTrack(undefined, "S", 2);
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
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
                    drawSpecificCube(main.Current.content,"B");
                    drawSpecificCube(main.Current.content,"R");
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
                }},
                {name: "ReducePS", action: function(){
                    main.incrementTrack(undefined, "S", -1);
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
                }},
                ]});

            this.Actions.push({code: "BW", buttons: [
                {name: "RemoveW", action: function(){    
                    if(main.Current.content.indexOf("W") < 0) {
                        bootbox.alert(main.$t("game_interface.alert.NotEnoughW")); 
                        return null;
                    }

                    drawSpecificCube(main.Current.content,"W");
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
                }},
                {name: "IncreaseEmploymentDecreasePopularity", action: function(){
                    main.incrementTrack(undefined, "E", 1);
                    main.incrementTrack(undefined, "P", -1);
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
                }},
                ]});

            this.Actions.push({code: "WY", buttons: [
                {name: "IncreaseHealth", action: function(){
                    main.incrementTrack(undefined, "H", 2);
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
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
                    endAction();
                }},
                {name: "ReduceHealth", action: function(){
                    main.incrementTrack(undefined, "H", -1);
                    main.game_status_parameters.actionCompleted = true;
                    endAction();
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
                    endDefaultAction();
                }
            });
        },
        canPay: function(type, number, spacesForPay, showAlert){
            let result = false;

            let available = 0;

            spacesForPay.forEach(function(s){
                available += getAllIndexes(s.content,type).length;
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
                refreshCubeDrawResult();
                return;
            }

            var type = this.toPayStack[0].type;
            var spacesForPay = this.toPayStack[0].spaces;
            this.toPayStack.shift();

            let available = 0;

            spacesWithAvailability = [];
            spacesForPay.forEach(function(s){
                let number = getAllIndexes(s.content,type).length;
                available += number;
                if(number > 0) spacesWithAvailability.push(s);
            });

            //se ho solo quanto serve non scelgo
            if(available == 1 || spacesWithAvailability.length == 1)
            {
                drawSpecificCube(spacesWithAvailability[0].content,type);
                main.removePayStack();
            }
            else
            {
                let btns = [];
                spacesWithAvailability.forEach(function(s){
                    btns.push({label: s.name, className: 'btn-info space-' + s.code + ' type-' + type, callback: function(event){ 
                        //pesco il cubo da pagare
                        drawSpecificCube(main.getSpaceByCode(event.currentTarget.classList[2].substring(6)).content,event.currentTarget.classList[3].substring(5)); 
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
            this.engGameTriggered("Lose");
        },
        gameWin:  function() {
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
    