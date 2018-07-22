var socket = io();

socket.on('connect', function () {
    console.log("Connected to Server");
});

socket.on('disconnect', function () {
    console.log("Disconnected from server");
});

socket.on('newMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#message-template').html();

    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);

    // console.log("New Message", message);
    // var formattedTime = moment(message.createdAt).format('h:mm a');

    // var li = jQuery('<li></li>');

    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    console.log("New Message", message);

    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#location-message-template').html();

    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);

    // var formattedTime = moment(message.createdAt).format('h:mm a');

    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Current location</a>');


    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});

jQuery('#message-form').on('click', function (e) {

    e.preventDefault();

    var messageTextBox = jQuery('[name=message');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });


});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser");
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (location) {
        console.log(location);
        socket.emit('createLocationMessage', {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude

        });

        locationButton.removeAttr('disabled').text('Send location');
    }, function (error) {
        alert("Unable to fetch location");
        locationButton.removeAttr('disabled').text('Send location');
    });
});