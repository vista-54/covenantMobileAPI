/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cvnt = {
    originalHost: null,
    host: null,
    version: 0,
    lastedit: 0,
    loclasedit: 0,
    readTitle: [],
    readMore: [],
    title: [],
    WhoWeAre: [],
    Location_info: [],
    Calendar: []
};
var store = window.localStorage;
function readHost() {
    var storedHost = store.getItem('host');
    if (storedHost) {
        cvnt.host = storedHost;
    } else {
        cvnt.host = cvnt.originalHost;
    }
    console.log('readhost');
}
$(document).ready(function () {
    console.log('doc.ready');
    readHost();
//    Refresh();

});

function Refresh() {
    var version = cvnt.version;
    addVersionToStore();
    var data = {};
    data.page = "News_and_Announcements";
    data.version = version;
    SendRequestToDataBase(data, afterRefresh);
    function afterRefresh(result) {
        console.log(result);
//        cvnt.version=obj.data.nid[0];
        for (var i in result.data)
        {
            var obj = result.data[i];

            var text = "<h1>" + obj.title + "</h1><br><button onclick=" + "ReadMore(" + i + ")" + ">Read More</button>";
            cvnt.readTitle.unshift(text);
            var optiizeText = "<h1>" + obj.title + "</h1><br>";
            cvnt.title.unshift(optiizeText);
            var body = "<p><span class=" + "body_value" + ">" + obj.body_value + "</span></p>";
            cvnt.readMore.unshift(body);
            cvnt.version = result.data[0].nid;

        }
        addVersionToStore();
        addReadTitleToStore();
        addReadMoreToStore();
        $("#list").html(cvnt.readTitle);
//        $("#list").html(body);
    }
}
function addVersionToStore() {
    store.setItem('nid', cvnt.version);
}
function ReadMore($var) {
//    var test=cvnt.readMore[$var];
    $('#start_page').load('readmore.html #body_read_page', function () {
        InsertDataToNewPage($var);

    });

}
function InsertDataToNewPage($var) {
//     $("#readmore").html();
    $("#readmore").html(cvnt.title[$var] + cvnt.readMore[$var]);
}
function addReadTitleToStore() {
    store.setItem('ReadTitle', cvnt.readTitle);
}
function addReadMoreToStore() {
    store.setItem('ReadMore', cvnt.readMore);
}
function loadStartPage() {

}
function lastEdit()
{
    var lastedit = cvnt.lastedit;
    var data = {};
    data.page = "Who_we_are";
    data.lastedit = lastedit;
    GetLastedit(data, afterResponse);
    function afterResponse(result) {
        console.log(result.data);
//        cvnt.lastedit=obj.data.changed[0];
        for (var i in result.data)
        {
            var obj = result.data[i];
//            var text = "<h1>" + obj.title + "</h1><br><button onclick=" + "ReadMore("+ i + ")" + ">Read More</button>";
//            cvnt.readTitle.push(text);
            var optiizeText = {title: "<h1>" + obj.title + "</h1><br>", body: "<p><span class=" + "body_value" + ">" + obj.body_value + "</span></p>", lastedit: obj.changed};
            cvnt.WhoWeAre.push(optiizeText);
            cvnt.lastedit = cvnt.WhoWeAre[0].lastedit;
        }
        $("#list-who").html(cvnt.WhoWeAre[0].title + cvnt.WhoWeAre[0].body);
    }
//    cvnt.WhoWeAre[0].title+cvnt.WhoWeAre[0].body
}
function lastEditLocation() {
    var lastedit = cvnt.loclasedit;
    var data = {};
    data.page = "location";
    data.lastedit = lastedit;
    GetLasteditloc(data, afterResponse);
    function afterResponse(result) {
        console.log(result);
//        cvnt.lastedit=obj.data.changed[0];
        for (var i in result.data)
        {
            var obj = result.data[i];
//            var text = "<h1>" + obj.title + "</h1><br><button onclick=" + "ReadMore("+ i + ")" + ">Read More</button>";
//            cvnt.readTitle.push(text);
            var optimizeText = {title: "<h1>" + obj.title + "</h1><br>", body: "<p><span class=" + "body_value" + ">" + obj.body_value + "</span></p>", lastedit: obj.changed};
            cvnt.Location_info.push(optimizeText);
            cvnt.lastedit = cvnt.Location_info[0].lastedit;

        }
        $("#list-loc").html(cvnt.Location_info[0].title + cvnt.Location_info[0].body);
    }
}
function RequestCalendarData() {
    
    cvnt.Calendar=[];
    var $calendarForm = $('#calendar');
    var date = $calendarForm.find('input[name=date]').val();
    var data = {};
    data.page = "calendar";
    data.date = date;
    GetEvent(data, afterResponse);
    function afterResponse(result) {
        console.log(result.data);
        
        for (var i in result.data)
        {
            var obj = result.data[i];
            var row = "<span class=\"calendar_date\">" + obj.field_date_value + "</span><br>" + "<span class=\"calendar_title\">" + obj.title + "</span><br></div>";
            cvnt.Calendar.push(row);
        }

        $("#list-cal").html(cvnt.Calendar);
    }

}
function loadContent(page) {
    if (page === 'home') {
        $('#start_page').load('index.html #index', function () {

        });

    }
    if (page === 'who_we_are') {
        $('#start_page').load('pages.html #who_we_are', function () {
            lastEdit();
        });

    }
    if (page === 'News_and_Announcements') {
        $('#start_page').load('pages.html #inner-body', function () {
            Refresh();
        });

    }
    if (page === 'location') {
        $('#start_page').load('pages.html #location', function () {
            lastEditLocation();
        });

    }
    if (page === 'Calendar') {
        $('#start_page').load('pages.html #calendar', function () {

        });

    }
}