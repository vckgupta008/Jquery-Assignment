$('document').ready(function() {
    $("#add").hide();
    var temp = {};

    function read(data) {
        if (data[0]) {
            $("<thead></thead>", {
                class: 'thead-inverse'
            }).appendTo("#tcontent");

            $("<tr></tr>").appendTo("#tcontent>thead");

            var key = Object.keys(data[0])
                //console.log(key);
            for (var i = 0; i < key.length; i++) {
                $("<th>" + key[i] + "</th>").appendTo("#tcontent>thead>tr");
            }
            $("<th colspan=" + "'2'" + ">Operations</th>").appendTo("#tcontent>thead>tr");
            //console.log(data);
        }
        $("<tbody></tbody>").appendTo("#tcontent");
        for (var i = 0; i < data.length; i++) {
            //console.log(key.id);
            var htm = "<tr id=" + data[i].id + "><td>" + data[i].id + "</td><td>" + data[i].name + "</td><td>" + data[i].email + "</td><td>" + data[i].phone + "</td> <td><a href=" + "'#myModal'" + "role=" + "'button'" + "class=" + "'btn btn-warning'" + "data-toggle=" + "'modal'" + ">Update</a><button id=" + "'delete'" + " class=" + "'btn btn-danger'" + ">Delete</button></td></tr>";
            $("#tcontent>tbody").append(htm);


        } //end for
    } //end read function
    $("#read").on('click', function() {
        $("#add").hide();
        $("#tcontent").empty();
        $("#tcontent").show();


        $.ajax({
            type: "GET",
            url: "http://localhost:8080/player",


            success: function(data) {

                read(data);
            }, //end success function   
            error: function(err) {
                alert("fail to load");
            }
        }); //end ajax

    }); //end read
    $('#tcontent')
        .delegate('#delete', 'click', function() {
            var $this = $(this).parent().parent();
            var id = $this.children("td:first").text();
            //console.log(id);
            $.ajax({

                url: "http://localhost:8080/player/" + id,
                method: "DELETE",
                success: function(data) {
                    alert("successfully deleted");
                    $this.fadeOut(600, function() {
                        $this.remove();
                    })

                },
                error: function(err) {
                    alert("fail to delete");
                }
            }); //end ajax
        }); //end delegate delete

    $('#tcontent').delegate('a', 'click', function() {
        var $this = $(this).parent().parent();
        var id = $this.children("td:first").text();
        var name = $this.children("td").eq(1).text();
        var email = $this.children("td").eq(2).text();
        var phone = $this.children("td").eq(3).text();
        //alert(name);  
        $('div#myModal div.modal-body input#id').val(id);
        $('div#myModal div.modal-body input#inputName').val(name);
        $('div#myModal div.modal-body input#email').val(email);
        $('div#myModal div.modal-body input#phone').val(phone);

        $('#mbody').submit(function(e) {
            //alert("after submit");
            temp = {};
            id = $('div#myModal div.modal-body input#id').val()
            name = $('div#myModal div.modal-body input#inputName').val();
            email = $('div#myModal div.modal-body input#email').val();
            phone = $('div#myModal div.modal-body input#phone').val();
            temp["id"] = id;
            temp["name"] = name;
            temp["email"] = email;
            temp["phone"] = phone;
            $.ajax({
                type: "PATCH",
                //dataType: 'json', 
                url: "http://localhost:8080/player/" + id,
                data: JSON.stringify(temp),
                contentType: "application/json"

            }); //end ajax
            $('#myModal').modal('hide');
            // var row = $("#tcontent tbody tr#" + id);
            $this.children("td").eq(1).text(name);
            $this.children("td").eq(2).text(email);
            $this.children("td").eq(3).text(phone);
            e.preventDefault();
        }); //end update



    }); //end #tcontent
    $("#b_add").click(function() {
        $("#add").show();
        $("#tcontent").hide();
    });
    $('#add').submit(function(e) {
        temp = {};
        //var id = $('#add').find('input[name="id"]').val();
        var name = $('form#add input#inputName').val();
        var email = $('form#add input#email').val();
        var phone = $('form#add input#phone').val();
        temp["name"] = name;
        temp["email"] = email;
        temp["phone"] = phone;
        // json.push(temp);
        // alert(json);

        $.ajax({
            type: "POST",
            // dataType: 'json', 
            url: "http://localhost:8080/player",
            data: JSON.stringify(temp),
            contentType: "application/json",
            success: function(data, text) {
                alert("Successfully added");
            },
            error: function(request, status, error) {
                alert("failed to load" + request.responseText);
            }

        });

        $('#add').hide();
        $('#add input').val('');
        e.preventDefault();
    });
    $('#searchbutton').click(function() {
        var search = $("#search").val();
        $("#tcontent").empty();
        //$("#tcontent").html("");

        $.ajax({
            method: "GET",

            url: "http://localhost:8080/player?q=" + search,

            error: function() {
                alert("failed to load");
            },
            success: function(data) {
                    //console.log("yo"+data);
                    if (data == "") {

                        alert("No records found");
                    } else
                    // 
                        read(data);
                } //end success

        }); //end ajax
        // alert(search);
    }); //end search button
    $("#filter").click(function() {
        $("#tcontent").empty();
        var select = $("#myselect option:selected").text();
        var order = $("#order option:selected").text();
        alert(select + " " + order);

        $.ajax({
            method: "GET",

            url: "http://localhost:8080/player?_sort=" + select + "&_order=" + order,

            error: function() {
                alert("failed to load");
            },
            success: function(data) {
                //console.log("yo"+data);
                if (data == "") {

                    alert("No records found");
                } else
                // 
                    read(data);
            }

        }); //end ajax        


    }); //end filter

}); //end document
