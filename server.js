var TelegramBot = require('node-telegram-bot-api');
var token = '180217117:AAEof99xJ3m_gBeQsKMuNtae6Z00ALDGhiY';
var bot = new TelegramBot(token, {polling: true});
var play = false, us = 0;
var cities_arr = [];
var first_word;
var return_word = '';
var user_arr, return_words_arr;



bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    var echo_mess = msg.text;
    if (echo_mess == '/help') {
      sendMessageByBot(chatId, 'Привет ' + msg.chat.first_name +'!\nЧтобы сыграть со мной в города напиши /start.\nЧтобы закончить игру /end.');
    }
    if (echo_mess == '/start') {
      play = true;
      cities_arr = ['Киев','Харьков','Одесса', 'Днепропетровск', 'Донецк', 'Запорожье'     
      , 'Львов', 'Кривой Рог', 'Алма-Ата', 'Амарилло', 'Анапа', 'Асуан','Николаев', 'Мариуполь', 'Луганск', 'Севастополь', 'Винница'
      , 'Макеевка', 'Симферополь', 'Херсон', 'Полтава', 'Чернигов', 'Черкассы', 'Житомир'     
      , 'Сумы', 'Хмельницкий', 'Горловка', 'Ровно', 'Кировоград', 'Днепродзержинск', 'Черновцы'     
      , 'Кременчуг', 'Ивано-Франковск', 'Тернополь', 'Белая Церковь', 'Луцк', 'Краматорск', 'Мелитополь'     
      , 'Керчь', 'Никополь', 'Северодонецк', 'Славянск', 'Бердянск', 'Ужгород', 'Павлоград'     
      , 'Евпатория', 'Лисичанск', 'Каменец-Подольский', 'Александрия', 'Алупка', 'Алушта', 'Барановка'
      , 'Бахмач', 'Бердичев', 'Буча', 'Ватутино' , 'Верхнеднепровск', 'Глухов', 'Гребёнка', 'Дрогобыч'
      , 'Енакиево', 'Жашков', 'Жёлтые Воды', 'Збараж', 'Зоринск', 'Изюм', 'Ичня', 'Каменка'
      , 'Каховка', 'Красноперекопск', 'Лебедин', 'Лутугино', 'Малин', 'Мироновка', 'Мукачево', 'Немиров'
      , 'Носовка', 'Обухов', 'Острог', 'Павлоград', 'Прилуки', 'Припять', 'Рогатин', 'Рудки', 'Саки', 'Свердловск'
      , 'Семёновка', 'Судак', 'Тетиев', 'Торез', 'Украинка', 'Умань', 'Фастов', 'Хуст', 'Феодосия', 'Хотин'
      , 'Цюрупинск', 'Чернобыль', 'Чоп', 'Шостка', 'Щорс', 'Энергодар', 'Южное', 'Яворов', 'Яготин'];
      sendMessageByBot(chatId,'Ну, поехали, называй город!\nЯ пока незнаю всех городов и работаю на доверии, играй честно!\n\n Пример: Киев --> Воронеж --> Житомир ...');
      console.log('start game:'+ 'user = ' + msg.chat.first_name + ' ' + msg.chat.last_name);
      us=1;
      first_word = 0;
      user_arr = [];
      return_words_arr = [];
    }
    if (echo_mess == '/end') {
      play = false;
      sendMessageByBot(chatId,'Уже уходишь? Давай еще разок!');
      console.log('end game');
      us=0;
    }
    
    if (play === false && echo_mess!='/help' && echo_mess!='/start' && echo_mess!='/end') {
      sendMessageByBot(chatId, 'Чтобы узнать как со мной работать /help');
      
    } else {
      if (us != 0 && echo_mess!='/start') {
        var city = msg.text;
        
        if (city.length<3) {
          sendMessageByBot(chatId, 'Такого города точно нет!');
          return false;
        }
        
        first_word++;
        var cut_arr = cities_arr; 
        var city_len = city.length;
        city = city.toLowerCase();
        
        var last_lett = city[city_len-1];
        if (last_lett == 'ь' || last_lett == 'ы') {
          last_lett= city[city_len-2];
        }
        for (var p=0; p<user_arr.length; p++) {
            if (city == user_arr[p]) {
              sendMessageByBot(chatId, 'Не жульничай!\nЭто слово уже было!'+ city);
              return false;
            }
          }
          user_arr.push(city);
        if (first_word>1) {
          for (var e=0; e<return_words_arr.length; e++) {
            if (city == return_words_arr[e]) {
              sendMessageByBot(chatId, 'Не жульничай!\nЭто слово уже было!');
              return false;
            }
          }
          
          var return_word_len = return_word.length;
          var last_lett_ret = return_word[return_word_len-1];
          if (last_lett_ret == 'ь' || last_lett_ret == 'ы') {
          last_lett_ret= return_word[return_word_len-2];
          }
          if (last_lett_ret != city[0]) {
          sendMessageByBot(chatId, 'Не жульничай!\nТебе слово на букву ' +'"' + last_lett_ret + '"');
          return false;
          }
        }
        
        for (var k=0; k<cut_arr.length; k++) {
          for (var j=0; j<user_arr.length; j++) {
            var i_cut_arr = cut_arr[k].toLowerCase();
            if (i_cut_arr == user_arr[j]) {
              cut_arr[k] = '';
            } 
          }
        }
        
        for (var i=0; i<cut_arr.length; i++){
          var arr_i = cut_arr[i];
          arr_i = arr_i.toLowerCase(); 
          if (last_lett == arr_i[0]) {
            return_word = arr_i;
            cut_arr[i] = '';
            break;
          } else {
            return_word = 'Твоя взяла!\nПиши /start чтобы начать сначала или /end чтобы закончить игру.';
          }
        }
        console.log('us ='+user_arr);
        for (var r=0; r<user_arr.length; r++){
          if (return_word == user_arr[r]) {
            sendMessageByBot(chatId, 'Не жульничай!\nЭто слово уже было!');
            return false;
          }
        }
        for (var y=0; y<return_words_arr.length; y++) {
          if (return_word == return_words_arr[y]) {
            sendMessageByBot(chatId, 'Не жульничай!\nЭто слово уже было!');
            return false;
          }
        }
        sendMessageByBot(chatId, return_word);
        return_words_arr.push(return_word);
      } else {
        
      }
    }
});

function sendMessageByBot(chatId, message){
    bot.sendMessage(chatId, message, { caption: 'Я бот Макса.' });
}