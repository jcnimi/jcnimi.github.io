//Initialize the game
const cards = {'Ac': 'Ace_of_clubs', 
'Kc': 'king_of_clubs', 'Jc': 'jack_of_clubs', 'Qc': 'queen_of_clubs', '2c': '2_of_clubs', '3c': '3_of_clubs', 
'4c': '4_of_clubs', '5c': '5_of_clubs', '6c': '6_of_clubs', '7c': '7_of_clubs', '8c': '8_of_clubs', 
'9c': '9_of_clubs', '10c': '10_of_clubs', 'Ad': 'ace_of_diamonds', 'Kd': 'king_of_diamonds', 
'Jd': 'jack_of_diamonds', 'Qd': 'queen_of_diamonds', '2d': '2_of_diamonds', '3d': '3_of_diamonds', 
'4d': '4_of_diamonds', '5d': '5_of_diamonds', '6d': '6_of_diamonds', '7d': '7_of_diamonds', 
'8d': '8_of_diamonds', '9d': '9_of_diamonds', '10d': '10_of_diamonds', 'Ah': 'ace_of_hearts', 
'Kh': 'king_of_hearts', 'Jh': 'jack_of_hearts', 'Qh': 'queen_of_hearts', '2h': '2_of_hearts', 
'3h': '3_of_hearts', '4h': '4_of_hearts', '5h': '5_of_hearts', '6h': '6_of_hearts', 
'7h': '7_of_hearts', '8h': '8_of_hearts', '9h': '9_of_hearts', '10h': '10_of_hearts', 
'As': 'ace_of_spades', 'Ks': 'king_of_spades', 'Js': 'jack_of_spades', 'Qs': 'queen_of_spades', 
'2s': '2_of_spades', '3s': '3_of_spades', '4s': '4_of_spades', '5s': '5_of_spades', '6s': '6_of_spades', 
'7s': '7_of_spades', '8s': '8_of_spades', '9s': '9_of_spades', '10s': '10_of_spades'}

let user_cards_hand
let ai_cards_hand
let board_cards_hand


function get_random_card(p_cards_dict){
    rnd_num = Math.round(Math.random() * 52)
    let counter = 0
    let rnd_card
    for(var key in p_cards_dict){
        if(counter == rnd_num){
            rnd_card = {
                key: key,
                value: p_cards_dict[key]
            }
            break
        }
        counter++
    }
    return rnd_card
}

function give_out_cards(p_cards_dict, p_used_cards_list, p_nb_cards){
    res_card_list = []
    for (let i = 0; i < p_nb_cards; i++){
        while(1){
            temp_card = get_random_card(p_cards_dict)
            if(!p_used_cards_list.includes(temp_card["key"])){
                res_card_list.push(temp_card)
                break
            }
        }
    }
    return res_card_list
}


function set_hands_flop(p_cards_dict){
    // 7 random numbers will be used, 2 for user, 2 for AI and 3 for the board
    used_cards_list = []

    user_personal_cards = give_out_cards(p_cards_dict, used_cards_list, 2)
    used_cards_list = used_cards_list.concat(user_personal_cards)

    ai_personal_cards = give_out_cards(p_cards_dict, used_cards_list, 2)
    used_cards_list = used_cards_list.concat(ai_personal_cards)

    board_cards = give_out_cards(p_cards_dict, used_cards_list, 3)
    used_cards_list = used_cards_list.concat(board_cards)

    return {
        'user_personal_cards': user_personal_cards, 
        'ai_personal_cards': ai_personal_cards, 
        'board_cards': board_cards
    }
}

function init_game(){

    // get the fold_counter value
    let v_fold_counter = document.getElementById("fold_counter").value
    if(v_fold_counter == 0){
        alert("You've exceeded the fold limit");
        return;
    }

    let cards_hands = set_hands_flop(cards)
    //user cards
    user_cards_hand = cards_hands['user_personal_cards']
    document.getElementById("user1").src="image\\" + user_cards_hand[0]["value"] + ".png"
    document.getElementById("user2").src="image\\" + user_cards_hand[1]["value"] + ".png"
    //ai cards
    ai_cards_hand = cards_hands['ai_personal_cards']
    document.getElementById("ai1").src="image\\hidden.png"
    document.getElementById("ai2").src="image\\hidden.png"

    //boar cards
    board_cards_hand = cards_hands['board_cards']
    document.getElementById("board1").src="image\\" + board_cards_hand[0]["value"] + ".png"
    document.getElementById("board2").src="image\\" + board_cards_hand[1]["value"] + ".png"
    document.getElementById("board3").src="image\\" + board_cards_hand[2]["value"] + ".png"

    //final cards
    //user
    document.getElementById("user_fin1").src="image\\" + user_cards_hand[0]["value"] + ".png"
    document.getElementById("user_fin2").src="image\\" + user_cards_hand[1]["value"] + ".png"
    document.getElementById("user_fin3").src="image\\" + board_cards_hand[0]["value"] + ".png"
    document.getElementById("user_fin4").src="image\\" + board_cards_hand[1]["value"] + ".png"
    document.getElementById("user_fin5").src="image\\" + board_cards_hand[2]["value"] + ".png"
    //ai
    document.getElementById("ai_fin1").src="image\\hidden.png"
    document.getElementById("ai_fin2").src="image\\hidden.png"
    document.getElementById("ai_fin3").src="image\\hidden.png"
    document.getElementById("ai_fin4").src="image\\hidden.png"
    document.getElementById("ai_fin5").src="image\\hidden.png"

    document.getElementById("fold_counter").value = --v_fold_counter

}

function unhide_game(){
    //ai cards
    document.getElementById("ai1").src="image\\" + ai_cards_hand[0]["value"] + ".png"
    document.getElementById("ai2").src="image\\" + ai_cards_hand[1]["value"] + ".png"

    //final cards
    //ai
    document.getElementById("ai_fin1").src="image\\" + ai_cards_hand[0]["value"] + ".png"
    document.getElementById("ai_fin2").src="image\\" + ai_cards_hand[1]["value"] + ".png"
    document.getElementById("ai_fin3").src="image\\" + board_cards_hand[0]["value"] + ".png"
    document.getElementById("ai_fin4").src="image\\" + board_cards_hand[1]["value"] + ".png"
    document.getElementById("ai_fin5").src="image\\" + board_cards_hand[2]["value"] + ".png"
}


function get_card_kind_suit(p_card_key){
    return {
        "kind": p_card_key.slice(0,-1), 
        "suit": p_card_key.slice(-1)
    }
}

function get_kind_suit_stat(p_cards){
    kind_stat = {}
    suit_stat = {}
    // Get a dict of different kind and their occurrences
    for (let i in p_cards){
        let kind_suit = get_card_kind_suit(p_cards[i]["key"])
        let kind = kind_suit["kind"]
        let suit = kind_suit["suit"]
        // kind
        if (kind in kind_stat)
            kind_stat[kind] += 1
        else
            kind_stat[kind] = 1
        // suit
        if (suit in suit_stat)
            suit_stat[suit] += 1
        else
            suit_stat[suit] = 1
    }
    return {
        "kind_stat": kind_stat,
        "suit_stat": suit_stat
    }
}

function get_max_item_value(p_kind_suit_stat){
    max_stat = 0
    for (var key in p_kind_suit_stat) {
        if (p_kind_suit_stat.hasOwnProperty(key)) {
            if (p_kind_suit_stat[key] > max_stat) {
                max_stat = p_kind_suit_stat[key]
            }
        }
    }
    return max_stat
}

function get_min_item_value(p_kind_suit_stat){
    min_stat = 6
    for(var key in p_kind_suit_stat) {
        if(p_kind_suit_stat.hasOwnProperty(key)) {
            if (p_kind_suit_stat[key] < min_stat){
                min_stat = p_kind_suit_stat[key]
            }
        }
    }
    return min_stat
}

function compute_value_hands(p_cards){

    let kind_stat_dict = get_kind_suit_stat(p_cards)["kind_stat"]
    let suit_stat_dict = get_kind_suit_stat(p_cards)["suit_stat"]

    max_kind_value = get_max_item_value(kind_stat_dict)
    min_kind_value = get_min_item_value(kind_stat_dict)
    min_suit_value = get_max_item_value(suit_stat_dict)

    length = Object.keys(kind_stat_dict).length
    // Four of a kind All four cards of the same rank [“Js”, “Jh”, “Jd”, “Jc”, “7s”]
    if (max_kind_value == 4)
        return 6
    // Full house Three of a kind with a pair [“Js”, “Jh”, “Jd”, “7c”, “7s”]
    else if ((max_kind_value == 3) && (min_kind_value == 2))
        return 5
    // Flush Any five cards of the same suit, but not in a sequence [“Qs”, “10s”, “9s”, “7s”, “3s”]
    else if (min_suit_value == 5)
        return 4
    // Three of a kind Three cards of the same rank [“Js”, “Jh”, “Jd”, “9c”, “7s”]
    else if ((max_kind_value == 3) && (min_kind_value == 1) && (length == 3))
        return 3
    // Two Pair Two different pairs [“Js”, “Jh”, “9d”, “9c”, “7s”]
    else if ((max_kind_value == 2) && (min_kind_value == 1) && (length == 3))
        return 2
    // One Pair Two cards of the same rank [“Js”, “Jh”, “10d”, “9c”, “7s”]
    else if ((max_kind_value == 2) && (min_kind_value == 1) && (length == 4))
        return 1
    // High Card None of the hands above [“Js”, “10h”, “7d”, “5c”, “2s”]
    else
        return 0
}

function get_winner(p_user_cards, p_ai_cards, p_board_cards){
    // Compute score for user and AI
    // user
    let final_user_cards_hand = p_user_cards.concat(p_board_cards)
    // AI
    let final_ai_cards_hand = p_ai_cards.concat(p_board_cards)
    // value
    user_value = compute_value_hands(final_user_cards_hand)
    document.getElementById("user_score").value = user_value
    ai_value = compute_value_hands(final_ai_cards_hand)
    document.getElementById("ai_score").value = ai_value

    // check the winner
    if (user_value > ai_value)
        document.getElementById("winner").value = "User"
    else if (ai_value > user_value)
        document.getElementById("winner").value = "AI"
    else
        document.getElementById("winner").value = "No Winner"
}

function get_score(){
    document.getElementById("fold_counter").value = 0
    unhide_game()
    get_winner(user_cards_hand, ai_cards_hand, board_cards_hand)
}
