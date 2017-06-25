// Google Map
var map;

//prewiew photo on map
var infoBubbles = [];

// execute when the DOM is fully loaded
$(function() {

    // styles for map
    var styles = [
        {
            stylers: [
                { hue: "#00bbff" },
                { saturation: -20 }
            ]
        },{
            featureType: "road",
            elementType: "geometry",
            stylers: [
                { lightness: 100 },
                { visibility: "simplified" }
            ]
        },{
            featureType: "road",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];
    // options for map
    // https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var options = {
        center: {lat: 49, lng: 31},
        zoom: 6,
        styles: styles,
        mapTypeControl: false,
        disableDefaultUI: true,
        zoomControl: true,
        streetViewControl: true
    };
    // get DOM node in which map will be instantiated
    var canvas = $("#map-canvas").get(0);

    // instantiate map
    map = new google.maps.Map(canvas, options);

    

});

// add prewiew on map
function addMarker(place, file){
    var myLatlng = new google.maps.LatLng(place.latitude, place.longitude);
    // console.log(place);
    //var infowindow = new google.maps.InfoWindow({
    //content: file,
    //position: myLatlng,
    //disableAutoPan: true
    //});
    //infowindow.open(map);

    //setting infoBuble prewiew on map
    infoBubble = new InfoBubble({
      map: map,
      content: file,
      position: myLatlng,
      shadowStyle: 1,
      padding: 0,
      backgroundColor: '#a5a5a5',
      borderRadius: 3,
      arrowSize: 15,
      borderWidth: 3,
      borderColor: '#a5a5a5',
      disableAutoPan: true,
      hideCloseButton: false,
      arrowPosition: 30,
      backgroundClassName: 'transparent',
      arrowStyle: 2,
      closeSrc: '/static/photolocation_map/image/close.png',
      draggable: true,
    });
    infoBubble.bubble_.children[2].style.overflow="hidden";
    //console.log(infoBubble);
    infoBubble.open(map);
    map.setCenter(myLatlng);
    map.setZoom(16);
    
    infoBubbles.push(infoBubble);

    google.maps.event.addDomListener(infoBubble.bubble_.children[2], 'click', function() {
        map.setCenter(myLatlng);
        map.setZoom(16);
        if ((map.getZoom() < 19) & (map.getZoom() > 8))
        {

            for (var i=0;i<infoBubbles.length;i++) {
                infoBubbles[i].contentContainer_.children[0].children[0].children[0].style['width']=(map.getZoom() - 6) * 10 + 'px';
                infoBubbles[i].contentContainer_.children[0].children[0].children[0].style['height']=(map.getZoom() - 6) * 10 + 'px';
                infoBubbles[i].contentContainer_.style['width']=(map.getZoom() - 6) * 10 + 'px';
                infoBubbles[i].contentContainer_.style['height']=(map.getZoom() - 6) * 10 + 'px';
            }
        }
    });

    google.maps.event.addListener(map, "zoom_changed", function() {

        if ((map.getZoom() < 19) & (map.getZoom() > 8))
        {
            for (var i=0;i<infoBubbles.length;i++) {
                infoBubbles[i].contentContainer_.children[0].children[0].children[0].style['width']=(map.getZoom() - 6) * 10 + 'px';
                infoBubbles[i].contentContainer_.children[0].children[0].children[0].style['height']=(map.getZoom() - 6) * 10 + 'px';
                infoBubbles[i].contentContainer_.style['width']=(map.getZoom() - 6) * 10 + 'px';
                infoBubbles[i].contentContainer_.style['height']=(map.getZoom() - 6) * 10 + 'px';
            }
        }
    });
    
    //google.maps.event.addDomListener(infoBubble.bubble_.children[2], 'mousedown', function (evt) {
    //    console.log('mousedown');
    //});
  
    function addInfoBubble(map) 
    {
    var group = new H.map.Group();
    map.addObject(group);
    // add 'tap' event listener, that opens info bubble, to the group
    group.addEventListener('tap', function(evt) {
        console.log('mousedown');
    // event target is the marker itself, group is a parent event target
    // for all objects that it contains
    var bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
    // read custom data
    content: evt.target.getData()
    });
    //remove infobubbles
    var previousBubbles = ui.getBubbles();
    previousBubbles.forEach(function(bubs) {
             ui.removeBubble(bubs);
    });
    // show info bubble
    ui.addBubble(bubble);
    }, false);
    }

    
    
      
}

// connect dropzonejs to map
$(document).ready(function() {
    Dropzone.autoDiscover = false;
    $("#map-canvas").dropzone(
    {
        url: '/search/',
        addRemoveLinks : true,
        sending: function(file, xhr, formData) {
            formData.append("csrfmiddlewaretoken", $("[name=csrfmiddlewaretoken]").val())},
        success: function(file, data) {
            //console.log(data, file.previewElement.childNodes[1]);
            // $("#progressbars")[0].style.display = "none";
            if (data.longitude != null)
            addMarker(data, file.previewElement.childNodes[1]);
            else $('body').append('<div class="sf-flash">No GPS information</div>');
        },
        accept: function(file, done) {
            if (file.type != "image/jpeg") {
                $('body').append('<div class="sf-flash">It is not JPEG</div>');
                //done("Error! Files of this type are not accepted");
                //console.log('invalid file');
            }
            else { done(); }
        },
        // uploadprogress: function(data) {
        //     //console.log(data);
        //     $("#progressbars")[0].style.display = "initial";
        //     $("#progressbars")[0].style.width = data.upload.progress + '%';
        // }
    });
});
// connect dropzonejs to button 'addPhoto'
// $(document).ready(function() {
//     Dropzone.autoDiscover = false;
//     $("#upload-file-btn").dropzone(
//         {
//
//             url: '/search/',
//             clickable: true,
//             acceptedFiles: 'image/jpeg',
//             sending: function(file, xhr, formData) {
//                 formData.append("csrfmiddlewaretoken", $("[name=csrfmiddlewaretoken]").val())},
//             //previewsContainer: false,
//             //previewTemplate: '<div class="dz-preview dz-file-preview"><img data-dz-thumbnail /></div>',
//             success: function(file, data) {
//                 // $("#progressbars")[0].style.display = "none";
//                 if (data.longitude != null)
//                     addMarker(data, file.previewElement.childNodes[1]);
//                 else $('body').append('<div class="sf-flash">No GPS information</div>');
//             },
//             accept: function(file, done) {
//                 if (file.type != "image/jpeg") {
//                     done("Error! Files of this type are not accepted");
//                     //console.log('invalid file');
//                 }
//                 else { done(); }
//             },
//             // uploadprogress: function(data) {
//             //     $("#progressbars")[0].style.display = "initial";
//             //     $("#progressbars")[0].style.width = data.upload.progress + '%';
//             // }
//         });
// });

$(document).ready(function() {
    Dropzone.autoDiscover = false;
    $("#upload-file-btn").dropzone(
        {

            url: '/addphoto/',
            clickable: true,
            acceptedFiles: 'image/jpeg',
            sending: function(file, xhr, formData) {
                formData.append("csrfmiddlewaretoken", $("[name=csrfmiddlewaretoken]").val())},
            //previewsContainer: false,
            //previewTemplate: '<div class="dz-preview dz-file-preview"><img data-dz-thumbnail /></div>',
            success: function(file, data) {
                // $("#progressbars")[0].style.display = "none";
                 $('body').append('<div class="sf-flash">Success</div>');
            },
            accept: function(file, done) {
                if (file.type != "image/jpeg") {
                    done("Error! Files of this type are not accepted");
                    //console.log('invalid file');
                }
                else { done(); }
            },
            // uploadprogress: function(data) {
            //     $("#progressbars")[0].style.display = "initial";
            //     $("#progressbars")[0].style.width = data.upload.progress + '%';
            // }
        });
});

// Flash massage
$(document).ready(function () {
    $('.sf-flash').sfFlash();

});

// function ajaxPost(file)
// {
//     //console.log(file);
//     var form_data = new FormData(file);
//     $.ajax({
//         type: 'POST',
//         url: '/search/',
//         data: form_data,
//         contentType: false,
//         cache: false,
//         processData: false,
//         //async: false,
//         success: function(data) {
//
//             //console.log('Success!');
//             //console.log(data);
//         },
//     })
//     .done(function( data ) {addMarker(data, $("#file").val())});
// }



