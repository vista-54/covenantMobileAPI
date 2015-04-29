/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cvnt = {
    originalHost: null,
    host: null,
    version: 0,
    readTitle: [],
    readMore: [],
    title:[]
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
    Refresh();
    
});

function Refresh() {
    var version = cvnt.version;
    addVersionToStore();
    var data = {};
    data.version = version;
    SendRequestToDataBase(data, afterRefresh);
    function afterRefresh(result) {
        console.log(result.data);
//        cvnt.version=obj.data.nid[0];
        for (var i in result.data)
        {
            var obj = result.data[i];
           
            var text = "<h1>" + obj.title + "</h1><br><button onclick=" + "ReadMore("+ i + ")" + ">Read More</button>";
            cvnt.readTitle.push(text);
            var optiizeText="<h1>" + obj.title + "</h1><br>";
            cvnt.title.push(optiizeText);
            var body = "<p><span class=" + "body_value" + ">" + obj.body_value + "</span></p>";
            cvnt.readMore.push(body);
             cvnt.version=result.data[0].nid;
            
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
    $('#start_page').load('readmore.html #body_read_page', function(){
            InsertDataToNewPage($var);
           
        });
    
}
function InsertDataToNewPage($var){
//     $("#readmore").html();
            $("#readmore").html(cvnt.title[$var]+cvnt.readMore[$var]);
}
function addReadTitleToStore() {
    store.setItem('ReadTitle', cvnt.readTitle);
}
function addReadMoreToStore() {
    store.setItem('ReadMore', cvnt.readMore);
}
function loadStartPage(){
    
}
function reload() {}

function loadContent(page) {
    if (page === 'home') {
        $('#start_page').load('index.html #index', function () {

        });

    }
    if (page === 'who_we_are') {
        $('#body').load('main.html #inner-body', function () {
            Complete_form();

            scrollbugfixed();
        });

    }
    if (page === 'News_and_Announcements') {
        $('#start_page').load('news_and_announcements.html #inner-body', function () {
        Refresh();
        });

    }
    if (page === 'location') {
        $('#body').load('main.html #inner-body', function () {
            Complete_form();

            scrollbugfixed();
        });

    }
    if (page === 'Calendar') {
        $('#body').load('main.html #inner-body', function () {
            Complete_form();

            scrollbugfixed();
        });

    }
    }