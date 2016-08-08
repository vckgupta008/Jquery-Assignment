var myApp = angular.module('myModule', []);

myApp.controller("myController", function($scope, $http) {
    $scope.start = 0;
    $scope.start2 = 0;
    $scope.IsVisible = false;
     // $scope.IsVisible2 = false;
    $scope.showhide = function(val) {
        
         // $scope.IsVisible2 = false;
         $scope.Name="";
         $scope.Company="";
          $scope.Email="";
          $scope.IsVisible = $scope.IsVisible ? false : true; 
         if(val==1)
         {
         $scope.showButton=true;
     }

    }

    
    $scope.StartI=function(start1){
    	$scope.start += start1;
            if ($scope.start >= 0) 
            {
            	if($scope.type=="read")
            	{
            		$scope.read($scope.start);
            	}
            	else
            	{
            		$scope.sort($scope.start);
            	}
            }
            else
            {
            	$scope.start += 50;
            	alert("Already at the beginning");
            }
    }
    $scope.read = function(start1) 
    {	$scope.type="read";
            $scope.IsVisible = false;
            $scope.IsVisible2 = false;
            
                $http({

                        method: "GET",
                        url: "http://localhost:8081/player?_start=" + start1 + "&_limit=50",
                    })
                    .success(function(response) {
                        console.log(response);
                        $scope.players = response;
                    })
                    .error(function(response) {
                        alert("Failed to load");

                    });
             
        } //end read



    $scope.delete = function(id, index) {
            $http({

                    method: "DELETE",
                    url: "http://localhost:8081/player/" + id
                })
                .success(function(response) {
                    $scope.players.splice(index, 1);
                    alert("Successfully deleted");
                })
                .error(function(response) {
                    alert("Failed to delete");
                    $scope.error = response.statusText;
                });
        } //end delete
    $scope.add = function() 
    {	
    		$scope.start = 0;
            $scope.IsVisible = false;
            
            var player = { name: $scope.Name, company: $scope.Company, email: $scope.Email };
            console.log(player);
            $http({
                    method: "POST",
                    url: "http://localhost:8081/player",
                    data: player
                })
                .success(function(response) {
                    //$scope.players.push(response.data);
                    console.log(response);
                    // $scope.players=$scope.players.push(response);
                    alert("Successfully");
                })
                .error(function(response) {
                    alert("Failed to add");
                    $scope.error = response.statusText;
                });

        } //end add
    $scope.search = function(value) 
    {		
    	$scope.start = 0;			
            $scope.IsVisible = false;
          
            alert(value);
            $http({
                    method: "GET",
                    url: "http://localhost:8081/player?q=" + value,

                })
                .success(function(response) {
                    if (response == "") {

                        alert("No records found");
                    } else {
                        alert(response.length + " No of records are found");
                        $scope.players = response;
                    }
                })
                .error(function(response) {
                    alert("Failed to Search");

                });
        } //end search

$scope.sort = function(start1) 
{
$scope.type="sort";		

            $scope.IsVisible = false;
            
           
                $http({

                        method: "GET",
                        url: "http://localhost:8081/player?_sort=" + $scope.sortVal + "&_order=" + $scope.orderVal + "&_start=" + start1 + "&_limit=50",
                        //url: "http://localhost:8081/player?_start=" + $scope.start + "&_limit=50",
                    })
                    .success(function(response) {
                        console.log(response);
                        $scope.players = response;
                    })
                    .error(function(response) {
                        alert("Failed to load");

                    });
            
        } //end sort
     $scope.update = function(player,index) 
     {
        $scope.IsVisible = $scope.IsVisible ? false : true;
        $scope.showButton=false;
        //$scope.player=player;
        $scope.Id=player.id;
        $scope.Name=player.name;
        $scope.Company=player.company;
        $scope.Email=player.email;
        $scope.index=index;
    }
    $scope.save=function(){
    	$scope.IsVisible=false;
    	var player = { name: $scope.Name, company: $scope.Company, email: $scope.Email };
    	 $http({
                method: "PUT",
                url: "http://localhost:8081/player/" + $scope.Id,
                headers: { 'Content-Type': 'application/json' },
                data: player
            }).then(function mySucces(response) {
                
                $scope.IsVisible2 = false;

                $scope.players[$scope.index].id=$scope.Id;
                $scope.players[$scope.index].name=$scope.Name;
                $scope.players[$scope.index].company=$scope.Company;
                $scope.players[$scope.index].email=$scope.Email;
                alert('successfully updated');
            }, function myError(response) {
                alert('Failed to update');
            });
    }//end save

    // $scope.open = function(size, selectedPlayer) {

    //     var modalInstance = $modal.open({
    //         animation: $scope.animationsEnabled,
    //         templateUrl: 'edit.html',
    //         controller: function($scope, $modalInstance, player) {
    //             $scope.player = player;
    //         },
    //         size: size,
    //         resolve: {
    //             player: function() {
    //                 return $scope.selectedPlayer;
    //             }
    //         }
    //     });

    //     modalInstance.result.then(function(selectedItem) {
    //         $scope.selected = selectedItem;
    //     }, function() {
    //         $log.info('Modal dismissed at: ' + new Date());
    //     });
    // };//end open


}); //end controller
