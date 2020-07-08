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

//logic parameters
window.draw = "";


window.actionDiv = $('#actions');


function newGame() {
    defaultSetUp();
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
    
    window.turnEnded = false;
    refreshUx();
}

function endTurn()
{
    $("#result-box").hide();

    //window.actionDiv.empty();
    while(window.Current && window.Current.length > 0) {
            addToArray(drawCube(window.Current),window.Used);
        }

    window.turnEnded = true;
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
    $("#newGame-btn-g").show();
}

function gameLosed() {
    alert(window.alertMsg.Lose);
    window.gameFinished = true;
    $("#newGame-btn-g").show();
}

function checkLose() {
    if(window.Employment == window.MIN_POINTS) gameLosed();
    if(window.PublicSafety == window.MIN_POINTS) gameLosed();
    if(window.Wealth == window.MIN_POINTS) gameLosed();
    if(window.Health == window.MIN_POINTS) gameLosed();
    if(window.Popularity == window.MIN_POINTS) gameLosed();
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
    
