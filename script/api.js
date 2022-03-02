const gun = Gun(['https://gun-manhattan.herokuapp.com/gun']);
const gameName = "basket"
const basePointGain = 200


function setPlayer(roomID, PlayerName, StartingElo)
{   
    gun.get(gameName + "/rooms/").get(roomID).get("players").get(PlayerName).put(StartingElo);
}

function deletePlayer(roomID, PlayerName)
{   
    gun.get(gameName + "/rooms/").get(roomID).get("players").get(PlayerName).put(null);
    console.log(PlayerName)
}

function deleteAll(roomID)
{
    gun.get(gameName + "/rooms/").get(roomID).get("matches").once().map().once((data1, key1) => {
        for(element in data1){
            if (data1[element] == null || typeof data1[element] == Object)
            {
                continue;
            }
            gun.get(gameName + "/rooms/").get(roomID).get("matches").get(key1).put(null)
            console.log("deleted: " + key1)
        }  
    })
}


function loadAllPlayerElos(roomID,callback)
{
    gun.get(gameName + "/rooms/").get(roomID).get("players").map().once(callback)
}

function createMatch(roomID, player, score)
{
    gun.get(gameName + "/rooms/").get(roomID).get("players").get(player).once((elo1, key)=>{
        elo = elo1 || 0
        gun.get(gameName + "/rooms/").get(roomID).get("players").get(player).put(elo1+score)
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

