var request      = require('request')
, AlexaSkill = require('./AlexaSkill')
, API_ID = ''

var firstBook = null
var secondBook = null
var thirdBook = null

var url = function(list){
    return { url: "https://api.nytimes.com/svc/books/v3/lists.json",
    qs: {
    'api-key': "",
    'list': list
    },
    }
}

var getJsonFromNYT = function(list, callback){
  request.get(url(list), function(error, response, body){
        var d = JSON.parse(body);
        var result = d.results
        if (result.length > 0) {
            callback(result);
        } else {
            callback("ERROR");
        }
        
      
  });
};

var handleGenreRequest = function(intent, session, response){
    var list = findGenreList(intent.slots.Genre.value)
    getJsonFromNYT(list, function(data){
    if (data == "ERROR") {
        var text = "No list found. Try asking about another genre or topic. Perhaps fiction, travel, or parenthood books?"
        var heading = "No list found"
        cardText = text
        response.askWithCard(text, reprompt, heading, cardText);
    } else {
    var text = "The best-selling " + intent.slots.Genre.value + " book is " + 
    data[0].book_details[0].title.toTitleCase() + ". " 
    + data[0].book_details[0].description + 
    ". Other books include " + data[1].book_details[0].title.toTitleCase() + " and " +
    data[2].book_details[0].title.toTitleCase() + ". Do you want to hear more about the second or third book?"

    var cardText = text
    var heading = "Books about " + intent.slots.Genre.value.toTitleCase() + "!";
    var reprompt = "Do you want to hear more about the second or third book?"
    firstBook = data[0].book_details[0]
    secondBook = data[1].book_details[0]
    thirdBook = data[2].book_details[0]

    response.askWithCard(text, reprompt, heading, cardText);
}
    
});
};

function handleGeneralResponse(intent, session, response) {
     var list = "hardcover-fiction"
     getJsonFromNYT(list, function(data) {

        var text = "The best selling fiction book is " + 
        data[0].book_details[0].title.toTitleCase()
        + ". What genre are you interested in? I can look up best selling fiction, nonfiction, funny, and young adult books along with a bunch of others." 
        var reprompt = "What are you interested in?"
        var heading = "What are you interested in?"
        var cardText = "The best selling fiction book is " + 
        data[0].book_details[0].title.toTitleCase() + ". I can tell you about books in a variety of genres, such as fiction, nonfiction, humor, young adult, children's, animal, travel, crime, race, politics, history, food, diet, religion, romance, business, fashion, health, fitness, food, customs, advice, sports, and culture. Do you want to hear more about the first book?"
        
        firstBook =  data[0].book_details[0]

        response.askWithCard(text, reprompt, heading, cardText);
    })
}

function handleSpecificBookResponse(intent, session, response) {
        var bookNumber = intent.slots.Number.value

        var text = "We haven't talked about books in a while. Restart the skill by saying Start Book Finder."
        var heading = "Book not found"
            
            if ((bookNumber == "first" || bookNumber == "1st") && firstBook) {
                text = firstBook.title.toTitleCase() + ". " + firstBook.description + ". If this sounds interesting, add it to your shopping list or cart."
                heading = firstBook.title.toTitleCase()
            } else if ((bookNumber == "second" || bookNumber == "2nd") && secondBook) {
                text = secondBook.title.toTitleCase() + ". " + secondBook.description + ". If this sounds interesting, add it to your shopping list or cart."
                heading = secondBook.title.toTitleCase()
            } else if ((bookNumber == "third" || bookNumber == "3rd") && thirdBook) {
                text = thirdBook.title.toTitleCase() + ". " + thirdBook.description + ". If this sounds interesting, add it to your shopping list or cart."
                heading = thirdBook.title.toTitleCase()
            }

        var cardText = text

        response.tellWithCard(text, heading, cardText)
}

function handleFinishSessionRequest(intent, session, response) {
    // End the session with a custom closing statment when the user wants to quit the game
    response.tell("Thanks for using Book Finder!");
}


var findGenreList = function(genre) {
    var list = ""

    switch(genre) {
    case "fiction":
        list = "hardcover-fiction";
        break;
    case "drama":
        list = "hardcover-fiction";
        break;
    case "mystery":
        list = "hardcover-fiction";
        break;
    case "horror":
        list = "hardcover-fiction";
        break;
    case "satire":
        list = "hardcover-fiction";
        break;
    case "fantasy":
        list = "hardcover-fiction";
        break;
    case "action":
        list = "hardcover-fiction";
        break;
    case "adventure":
        list = "hardcover-fiction";
        break;
    case "nonfiction":
        list = "hardcover-nonfiction";
        break;
    case "science fiction":
        list = "science";
        break;
    case "sci-fi":
        list = "science";
        break;
    case "sci fi":
        list = "science";
        break;
    case "scifi":
        list = "science";
        break;
    case "syfy" :
        list = "science";
        break;
    case "sy fy" :
        list = "science";
        break;
    case "advice":
        list = "advice-how-to-and-miscellaneous"
        break;
    case "how-to":
        list = "advice-how-to-and-miscellaneous"
        break;
    case "miscellaneous":
        list = "advice-how-to-and-miscellaneous"
        break;
    case "how to":
        list = "advice-how-to-and-miscellaneous"
        break;
    case "children's":
        list = "paperback-books"
        break;
    case "children":
        list = "paperback-books"
        break;
    case "childrens":
        list = "paperback-books"
        break;
    case "child":
        list ="paperback-books"
        break;
    case "picture":
        list = "picture-books"
        break;
    case "illustration":
        list = "picture-books"
        break;
    case "business":
        list = "business-books"
        break;
    case "expeditions":
        list = "expeditions-disasters-and-adventures"
        break;
    case "expedition":
        list = "expeditions-disasters-and-adventures"
        break;
    case "fashion":
        list = "fashion-manners-and-customs"
        break;
    case "manners":
        list = "fashion-manners-and-customs"
        break;
    case "customs":
        list = "fashion-manners-and-customs"
        break;
    case "food":
        list = "food-and-fitness"
        break;
    case "diet":
        list = "food-and-fitness"
        break;
    case "fitness":
        list = "food-and-fitness"
        break;
    case "indigenous americans":
        list = "indigenous-americans"
        break;
    case "indigenous":
        list = "indigenous-americans"
        break;
    case "love":
        list = "relationships"
        break;
    case "relationship":
        list = "relationships"
        break;
    case "romance":
        list = "relationships"
        break;
    case "parenthood":
        list = "family"
        break;
    case "politics":
        list = "hardcover-political-books"
        break;
    case "history":
        list = "hardcover-political-books"
        break;
    case "historical":
        list = "hardcover-political-books"
        break;
    case "political":
        list = "hardcover-political-books"
        break;
    case "american history":
        list = "hardcover-political-books"
        break;
    case "religion":
        list = "religion-spirituality-and-faith"
        break;
    case "spirituality":
        list = "religion-spirituality-and-faith"
        break;
    case "spiritual":
        list = "religion-spirituality-and-faith"
        break;
    case "faith":
        list = "religion-spirituality-and-faith"
        break;
    case "young adult":
        list = "young-adult-paperback";
        break;
    case "graphic":
        list="manga";
        break;
    case "animal":
        list="animals";
        break;
    case "celebrity":
        list="celebrities";
        break;
    case "crime":
        list="crime-and-punishment";
        break;
    case "comedy":
        list="humor";
        break;
    case "funny":
        list="humor";
        break;
    case "punishment":
        list="crime-and-punishment";
        break;
    case "game":
        list="games-and-activities";
        break;
    case "activity":
        list="games-and-activities";
        break;
    case "race":
        list="race-and-civil-rights";
        break;
    case "civil rights":
        list="race-and-civil-rights";
        break;
    case "sports":
        list="sports"
        break;
    default:
        list=genre;
}
return list
}



function getWelcomeResponse(launchRequest, session, response) {
  var output = 'Welcome to Book Finder. I can help you find the best selling books in any genre such as childrens, sports, travel, or fiction overall. Remember to add your favorites to your shopping list after exiting the skill! What types of books are you interested in?';
  var reprompt = 'What types of books are you interested in?';
  var cardText = "I can tell you about books various genres, such as fiction, nonfiction, humor, young adult, children's, animal, travel, crime, race, politics, history, food, diet, religion, romance, business, fashion, health, fitness, food, customs, advice, sports, and culture. Remember to add your favorites to your shopping list after exiting the skill!"

  response.askWithCard(output, reprompt, "Welcome", cardText);
}

var BookFinder = function(){
  AlexaSkill.call(this, API_ID);
};

BookFinder.prototype = Object.create(AlexaSkill.prototype);
BookFinder.prototype.constructor = BookFinder;

BookFinder.prototype.eventHandlers.onLaunch = function(launchRequest, session, response){
    getWelcomeResponse(launchRequest, session, response)
};

BookFinder.prototype.intentHandlers = {
  GenreIntent: function(intent, session, response){
    handleGenreRequest(intent, session, response);
},

  GeneralIntent: function(intent, session, response){
    handleGeneralResponse(intent, session, response)
},
    SpecificBookIntent: function(intent, session, response) {
        handleSpecificBookResponse(intent, session, response)
    },
    HelpIntent: function(intent, session, response) {
        var text = "With Book Finder, you can find great books in general or ask for popular books in certain genres. Just say I need a book, or for instance, I need a travel book to get started. "
        var cardText = "I can tell you about books various genres, such as fiction, nonfiction, humor, young adult, children's, animal, travel, crime, race, politics, history, food, diet, religion, romance, business, fashion, health, fitness, food, customs, advice, sports, and culture. Remember to add your favorites to your shopping list after exiting the skill!"
        response.askWithCard(text, "What are you interested in?", "Book Finder Tips", cardText);
    },
    StopIntent: function(intent, session, response) {
        handleFinishSessionRequest(intent, session, response)
    },
    CancelIntent: function(intent, session, response) {
        handleFinishSessionRequest(intent, session, response)
    }

};

String.prototype.toTitleCase = function() {
  var i, j, str, lowers, uppers;
  str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  // Certain minor words should be left lowercase unless 
  // they are the first or last words in the string
  lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 
  'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
  for (i = 0, j = lowers.length; i < j; i++)
    str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), 
      function(txt) {
        return txt.toLowerCase();
      });

  // Certain words such as initialisms or acronyms should be left uppercase
  uppers = ['Id', 'Tv'];
  for (i = 0, j = uppers.length; i < j; i++)
    str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), 
      uppers[i].toUpperCase());

  return str;
}


exports.handler = function(event, context) {
    var skill = new BookFinder();
    skill.execute(event, context);
};







