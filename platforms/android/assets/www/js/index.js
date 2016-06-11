/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var counterLoader = 1;
var totalImages = 102;
var current=1;

var char = [ 1, 191, 164, 6 ];
var charLoad = 'ci';

var initanim, loopAnim, exitAnim;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        loadImage();
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();





function reLoadImage(){ counterLoader++; loadImage(); }
function loadImage(){
    if(counterLoader <= totalImages){
     $('<img src="img/bg/bg-'+counterLoader+'.png" />').load(function(){
       var path = $(this).attr('src');
        $('.background').append('<div id="img'+counterLoader+'" style="background-image:url('+path+')"></div>');
        reLoadImage();
     });
    } else {
        allReady();
        charLoadImgs();
    }
}



function reCharLoadImgs(){char[0]++; charLoadImgs();}
function charLoadImgs(){
    switch(charLoad){
        case 'ci':
            if( char[0]<= char[1] ){
                $('<img src="img/char/'+charLoad+'-'+char[0]+'.png" />').load(function(){
                    $('.character').append('<div class="'+charLoad+'" id="'+charLoad+char[0]+'" style="background-image:url('+$(this).attr('src')+')"></div>');
                    reCharLoadImgs();
                });
            } else { char[0]=0; charLoad='cl'; reCharLoadImgs(); }
            break;
        case 'cl':
            if( char[0]<= char[2] ){
                $('<img src="img/char/'+charLoad+'-'+char[0]+'.png" />').load(function(){
                    $('.character').append('<div class="'+charLoad+'" id="'+charLoad+char[0]+'" style="background-image:url('+$(this).attr('src')+')"></div>');
                    reCharLoadImgs();
                });
            } else { char[0]=0; charLoad='ce'; $('.instrucciones').removeClass('outside'); $('.loader').addClass('hider');  reCharLoadImgs(); }
            break;
        case 'ce':
            if( char[0]<= char[3] ){
                $('<img src="img/char/'+charLoad+'-'+char[0]+'.png" />').load(function(){
                    $('.character').append('<div class="'+charLoad+'" id="'+charLoad+char[0]+'" style="background-image:url('+$(this).attr('src')+')"></div>');
                    reCharLoadImgs();
                });
            } else { char[0]=parseInt(1); charLoad=false; $('.botones').addClass('visible');}
            break;
    }
}


function characterInit(){
    char[0] = parseInt(1);
    
    initAnim = setInterval(function(){      
        $('.ci').hide();  
        $('#ci'+char[0]).show();
        if(char[0]>1){
            $('#ci'+(char[0]-1)).hide();
        } else {
             $('#ci'+char[1]).hide(); 
        }
        if(char[0]<char[1]){char[0]++;}else{ characterLoop(); clearInterval(initAnim); $('.ci').hide(); }
    }, 36);
}

function characterLoop(){
     char[0] = parseInt(1);
    //ANIM
    loopAnim = setInterval(function(){ 
        $('#cl'+char[0]).show();
        if(char[0]>1){
            $('#cl'+(char[0]-1)).hide();
        } else {
             $('#cl'+char[2]).hide(); 
        }
        if(char[0]<char[2]){char[0]++;}else{ char[0] = parseInt(1); }
    }, 36);  
       
}


function allReady(){
    //HIDE VIEW
    
    $('.background').addClass('playing');
     
    //ANIM
    setInterval(function(){
        $('#img'+current).show();
        if(current>1){
            $('#img'+(current-1)).hide();
        } else {
             $('#img'+totalImages).hide(); 
        }
        if(current<totalImages){current++;}else{current=1;}
    }, 36);  
    
    
    //BUTTONS
    $('.botones .btn').click(function(){
        var view = $(this).attr('id');
        view = view.replace('#', '');
        $('.info').hide();
        $('.info[data="'+view+'"]').show();
        $('.textbox').addClass('open');
        $('.character').addClass('run');
        $('.botones img, .instrucciones').addClass('outside');
        characterInit();
        
    });
    $('.close').click(function(){
        $('.textbox').removeClass('open');
        $('.botones .btn, .instrucciones').removeClass('outside');
        
        
        
        
        clearInterval(initAnim);
        clearInterval(loopAnim);
        
        char[0] = parseInt(1);
        exitAnim = setInterval(function(){  
            console.log('#ce'+char[0]);    
            $('.ce').hide();
            $('#ce'+char[0]).show();
            $('.ci, .cl').hide();
            if(char[0]>1){
                $('#ce'+(char[0]-1)).hide();
            }
            if(char[0]<char[3]){char[0]++;}else{ clearInterval(exitAnim); $('.character').removeClass('run'); $('.ce').hide(); }
        }, 120);
    
    
        
    });
    
}














$(window).load(function() {    
    loadImage();
});



