
const PlayerTablePrefab = "<option>[P]</option>"



const Player1 = document.getElementById("Player1");
const Player2 = document.getElementById("Player2");

const Score1 = document.getElementById("Score1");
const Score2 = document.getElementById("Score2");

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
    Player1.innerHTML = ""
    Player2.innerHTML = ""
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
        Player1.innerHTML += PlayerTablePrefab.replace(/\[P\]/, List[player][0]).replace(/\[E\]/, List[player][1])
        Player2.innerHTML += PlayerTablePrefab.replace(/\[P\]/, List[player][0]).replace(/\[E\]/, List[player][1])
    }
}


function addMatch()
{
    const P1 = Player1.value;
    const P2 = Player2.value
    if (P1 == P2) {return; }

    const S1 = Math.max(parseInt(Score1.value), 1)
    const S2 = Math.max(parseInt(Score2.value), 1)

    createMatch(roomID, P1, S1)
    createMatch(roomID, P2, S2)

    addMatchPlayed(roomID, P1, P2)


    Score1.value = ""
    Score2.value = ""

}


function getWinner(P1, S1, P2, S2)
{
    if (S1 >= S2)
    {
        return P1
    }
    return P2
}

function getLoser(P1, S1, P2, S2)
{
    if (S1 >= S2)
    {
        return P2
    }
    return P1
}












loadAllPlayerElos(roomID, putInPlayerElo)

