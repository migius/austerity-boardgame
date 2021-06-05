// function newGame() {
//     defaultSetUp();
// }
/*

function newTurn()
{
    var c1 = drawCube(main.Bag.content);
    if(c1) {
        addToArray(c1,main.Current.content);
    }
    else {
        //No more cubes???
        //trig end year
    }
    var c2 = drawCube(main.Bag.content);
    if(c2) { 
        addToArray(c2,main.Current.content);
    }
    else {
        //No more cubes???
        //move one cube from current to used 
        if(main.Current.content && main.Current.content.length == 1) {
            addToArray(drawCube(main.Current.content),main.Used.content);
        }     
    }

    main.game_status_parameters.actionCompleted = false;
    main.game_status_parameters.fundChoiceCompleted = false;
    main.game_status_parameters.fundChoiceNeeded = false;
        
    refreshCubeDrawResult();
    
    main.game_status_parameters.turnEnded = false;    
}

function endTurn()
{
    $("#result-box").hide();

    while(main.Current.content && main.Current.content.length > 0) {
            addToArray(drawCube(main.Current.content),main.Used.content);
        }

    main.game_status_parameters.turnEnded = true;
}

function newYear()
{
    //Check to see if you have won - see Ending the Game below
    if(main.Used.content.indexOf("K") < 0) main.gameWin();

    main.Tracks.forEach(function(track){
        if(track.revenue.length != 0 && track.revenue[track.value].length != 0){
            track.revenue[track.value].forEach(function(rev){
                addToArray(rev[0], main.getSpaceByCode(rev[1]).content);
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
    while(main.Used.content && main.Used.content.length > 0) {
        addToArray(drawCube(main.Used.content),main.Bag.content);
    }

    main.Institutions.forEach(function(institution){
        while(institution.founded > 0) { addToArray("Y", main.Bag.content); institution.founded--;}
    });    
}
*/

