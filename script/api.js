const gun = Gun(['https://gun-manhattan.herokuapp.com/gun']);
const gameName = "basket"
const basePointGain = 100
const eloSurpressConst = 500

function setPlayer(roomID, PlayerName, StartingElo)
{   
    gun.get(gameName + "/rooms/").get(roomID).get("players").get(PlayerName).put(StartingElo);
}

function deletePlayer(roomID, PlayerName)
{   
    gun.get(gameName + "/rooms/").get(roomID).get("players").get(PlayerName).put(null);
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
                Points = elo2 - 1
            }
            gun.get(gameName + "/rooms/").get(roomID).get("players").get(looser).put(elo2-Points)
        })
    })
}

