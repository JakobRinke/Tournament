const gun = Gun(['https://gun-manhattan.herokuapp.com/gun']);
const gameName = "basket"
const basePointGain = 200
const eloSurpressConst = -100
const matchdamper = 30


function setPlayer(roomID, PlayerName, StartingElo)
{   
    gun.get(gameName + "/rooms/").get(roomID).get("players").get(PlayerName).put(StartingElo);
}

function deletePlayer(roomID, PlayerName)
{   
    gun.get(gameName + "/rooms/").get(roomID).get("players").get(PlayerName).put(null);
    console.log(PlayerName)
    gun.get(gameName + "/rooms/").get(roomID).get("matches").get(PlayerName).map().once((data1, key1) => {
        gun.get(gameName + "/rooms/").get(roomID).get("matches").get(PlayerName).get(key1).put(null)
        console.log(key1 + " deleted")
    })
}

function loadAllPlayerElos(roomID,callback)
{
    gun.get(gameName + "/rooms/").get(roomID).get("players").map().on(callback)
}

function createMatch(roomID, winner, looser, val)
{
    gun.get(gameName + "/rooms/").get(roomID).get("players").get(winner).once((elo1, key)=>{
        gun.get(gameName + "/rooms/").get(roomID).get("players").get(looser).once((elo2, key2)=>{
            var Points = parseInt(basePointGain * ((elo2+eloSurpressConst) / (elo1+eloSurpressConst)) * val)
            gun.get(gameName + "/rooms/").get(roomID).get("players").get(winner).put(elo1+Points)
            if (elo2-Points<=0)
            {
                Points = elo2 - Math.max((1-eloSurpressConst), 1)
            }
            gun.get(gameName + "/rooms/").get(roomID).get("players").get(looser).put(elo2-Points)
        })
    })
}

function addMatchPlayed(roomID, P1, P2)
{
    gun.get(gameName + "/rooms/").get(roomID).get("matches").get(P1).set(P2);
    gun.get(gameName + "/rooms/").get(roomID).get("matches").get(P2).set(P1);
}


function getAllMatches(roomID, callback)
{
    gun.get(gameName + "/rooms/").get(roomID).get("matches").once().map().once((data1, key1) => {
        for(element in data1){
            if (data1[element] == null)
            {
                continue;
            }
            callback(key1, data1[element])
        }  
    })
}

