
const PlayerTablePrefab = "<tr onclick='deletePlayer(roomID, \"[P]\"); window.location.reload()' ><td>[P]</td><td>[E]</td></tr>"



const PlayerList = document.getElementById("PlayerList");
const resetState = PlayerList.innerHTML

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const roomID = parseInt(urlParams.get("room"));




var PlayerMap = new Object()

function putInPlayerElo(data, key)
{
    if (data == null) {return;}
    PlayerMap[key] = data
    OrderElo()
}

function resetDiv()
{
    PlayerList.innerHTML = resetState
}

function OrderElo()
{
    resetDiv()

    var List = Object.keys(PlayerMap).map(function(key) {
        return [key, PlayerMap[key]];
    });
    List.sort(function(first, second) {
        return second[1] - first[1];
    });

    for(player in List)
    {
        PlayerList.innerHTML += PlayerTablePrefab.replace(/\[P\]/g, List[player][0]).replace(/\[E\]/, List[player][1])
    }
}


loadAllPlayerElos(roomID, putInPlayerElo)