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
    Calendar: [],
    getDate: null
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
//ReadMore(" + i + ")
            var text = "<a onclick='ReadMore(" + i + ")'><h1>" + obj.title + "</h1><p>Read More</p></a>";
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

    cvnt.Calendar = [];
    var $calendarForm = $('#calendar');
    var date = $calendarForm.find('input[name=date]').val();
    var data = {};
    data.page = "calendar";
    data.date = cvnt.getDate;
    GetEvent(data, afterResponse);
    function afterResponse(result) {
        console.log(result.data);
//        var d =result.data.field_date_value.substring(8,11);
//        cvnt.Calendar.push(d);
        var lastDate = '';
        for (var i in result.data)
        {
            var obj = result.data[i];
            var date = obj.field_date_value.substring(8, 11);
            var time = obj.field_date_value.substring(10);
            console.log(date, time, lastDate);
            if (date != lastDate) {
                var Date = "<span class=\"calendar_date\">"+date+"</span>";
            }
            else {
                Date='';
            }
            var resultDate = "<span class=\"calendar_body\">"+time+"<span>";
            lastDate = date;

            var row = Date+" "+ resultDate + "  " + obj.title;
//            <br><span>"+obj.title+"</span><br>";
//            <span class=\"calendar_date\">" + obj.field_date_value.substring(8,11) + "</span><br>
//            + "<span class=\"calendar_title\">" + obj.title + "</span><br></div>"
//            alert(obj.field_date_value.charAt(10));

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
    if (page === 'Calendar_s') {
        $('#start_page').load('pages.html #calendar_s', function () {

            Calendar();
        });

    }
}
var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len)
                    val = "0" + val;
                return val;
            };
    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;
        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date))
            throw SyntaxError("invalid date");
        mask = String(dF.masks[mask] || mask || dF.masks["default"]);
        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d: d,
                    dd: pad(d),
                    ddd: dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m: m + 1,
                    mm: pad(m + 1),
                    mmm: dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy: String(y).slice(2),
                    yyyy: y,
                    h: H % 12 || 12,
                    hh: pad(H % 12 || 12),
                    H: H,
                    HH: pad(H),
                    M: M,
                    MM: pad(M),
                    s: s,
                    ss: pad(s),
                    l: pad(L, 3),
                    L: pad(L > 99 ? Math.round(L / 10) : L),
                    t: H < 12 ? "a" : "p",
                    tt: H < 12 ? "am" : "pm",
                    T: H < 12 ? "A" : "P",
                    TT: H < 12 ? "AM" : "PM",
                    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };
        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();
// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
    commentDate: "dd mmm yy  HH:MM"
};
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};
function Calendar() {


    $('#calendar').fullCalendar({
        header: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        viewRender: function (view, element) {
//                var date=new Date();
            var date = $('#calendar').fullCalendar('getDate');
            cvnt.getDate = dateFormat(date, 'isoDate'); //date.format();
//                alert(cvnt.getDate);
            RequestCalendarData();
        }
    });





}

var deviceIsReady = false;
function onDeviceReady() {
    log('Device is ready');
    StatusBar.overlaysWebView(false);
    
    deviceIsReady = true;
    navigator.splashscreen.hide();
    document.addEventListener('backbutton', function (e) {
        e.preventDefault();
        $('section:visible').find('.back-button').click();
    }, false);

    document.addEventListener('menubutton', function (e) {
        e.preventDefault();

        function onConfirm(buttonIndex) {
            if (buttonIndex === 2) {
                exitFromApp();
            }
        }

        navigator.notification.confirm(
                'Exit from app?',
                onConfirm,
                'Exit',
                'Cancel, Ok'
                );
    }, false);

}
