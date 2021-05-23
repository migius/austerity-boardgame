
function defaultBagSetUp()
{
    /*
     4 Black/Debt 
     2 Red/Crime & Unrest 
     2 Blue/Security & Policing 
     1 White/Welfare 
     1 Yellow/Income
    */    
    window.Bag = [];
    window.Current = [];
    window.Used = [];
    window.Treasury = [];

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

    var radios = document.getElementsByName('DifficultyRadios');

    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        switch(radios[i].value) {
            case "easy":
                addToArray("Y", window.Bag);
                addToArray("Y", window.Bag);
                break;
            case "normal":
                break;
            case "hard":
                addToArray("K", window.Bag);
                break;
            case "veryHard":
                addToArray("K", window.Bag);
                addToArray("K", window.Bag);
                break;
        }
      }
    }



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

    window.fundedInst.PE = 0;
    window.fundedInst.NS = 0;
    window.fundedInst.SW = 0;
}

function defaultActions() {    
    window.actionNeeded = false;
    window.actionCompleted = false;
    window.cutsNeeded = false;
    window.cutsCompleted = false;
    window.fundNeeded = false;
    window.fundCompleted = false;
    window.fundChoiceNeeded = false;
    window.fundChoiceCompleted = false;
    window.gameFinished = false;
    window.turnEnded = true;
}

function defaultSetUp()
{
    defaultBagSetUp();
    defaultTrackSetUp();
    defaultInstitutionsSetUp();
    defaultActions();
    refreshUx();
    $(".newGame-btn-g").hide();
    $("#result-box").hide();
}

function removeLoader() {
    $('div.container').removeClass("loading");
    $('div.loader').hide();
}