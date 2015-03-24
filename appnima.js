/* appnima v2.3.24 - 2015/3/24
   http://appnima.tapquo.com
   Copyright (c) 2015  - Licensed  */
(function(){!function(n){var t,e,r,i,u;return e=function(){return this._callbacks=[],this},i=function(n){var t,r,i,u,o,s,l;for(t=n.length,r=0,s=new e,i=[],l=[],o=function(n){return function(e,u){return r+=1,i[n]=e,l[n]=u,r===t?s.done(i,l):void 0}},u=0;t>u;)n[u]().then(o(u)),u++;return s},r=function(n,t,i,u){var o;return o=new e,0===n.length||null!=u&&null!=t?o.done(t,i):n[0](t,i).then(function(t,e){return n.splice(0,1),r(n,t,e,u).then(function(n,t){return o.done(n,t)})}),o},u=function(n,t,e){return r(n,t,e,!0)},e.prototype.then=function(n,t){var e;return e=function(){return n.apply(t,arguments)},this._isdone?e(this.error,this.result):this._callbacks.push(e)},e.prototype.done=function(n,t){var e,r;for(this._isdone=!0,this.error=n,this.result=t,e=0,r=this._callbacks.length;r>e;)this._callbacks[e](n,t),e++;return this._callbacks=[]},t={Promise:e,join:i,chain:r,shield:u},"function"==typeof define&&define.amd?define(function(){return t}):n.Hope=t}(this)}).call(this),function(){var Appnima,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}},__hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child};window.Appnima=Appnima={version:"2.3.24",key:null,token:null,host:{main:"https://api.appnima.com",socket:"http://socket.appnima.com",rtc:"http://rtc.appnima.com",storage:"http://storage.appnima.com"},Dom:"undefined"!=typeof $$&&null!==$$?$$:$,onError:null},Appnima.Calendar=function(app){var activityCalendar,activityEvent,assistentEvent,create,deleteEvent,event,guestEvent,list,listEvents,remove,searchEvent,shared,update,updateEvent,_url;return list=function(){return app.connect("GET",""+_url(),{})},create=function(parameters){return app.connect("POST",""+_url(),parameters)},update=function(parameters){return app.connect("PUT",""+_url(),parameters)},shared=function(parameters){return app.connect("PUT",""+_url()+"/shared",parameters)},activityCalendar=function(id){var data;return data={id:id},app.connect("GET",""+_url()+"/activity",data)},remove=function(calendar){var data;return data={id:calendar},app.connect("DELETE",""+_url(),data)},event=function(parameters){return app.connect("POST",""+_url()+"/event",parameters)},updateEvent=function(parameters){return app.connect("PUT",""+_url()+"/event",parameters)},listEvents=function(data){return app.connect("GET",""+_url()+"/event",data)},guestEvent=function(data){return app.connect("PUT",""+_url()+"/event/guest",data)},assistentEvent=function(data){return app.connect("PUT",""+_url()+"/event/assistent",data)},searchEvent=function(query){var data;return data={query:query},app.connect("GET",""+_url()+"/event/search",data)},activityEvent=function(id){var data;return data={id:id},app.connect("GET",""+_url()+"/event/activity",data)},deleteEvent=function(event){var data;return data={id:event},app.connect("DELETE",""+_url()+"/event",data)},_url=function(){return app.host.main+"/calendar"},{list:list,create:create,update:update,shared:shared,activityCalendar:activityCalendar,remove:remove,event:event,updateEvent:updateEvent,listEvents:listEvents,guestEvent:guestEvent,assistentEvent:assistentEvent,searchEvent:searchEvent,activityEvent:activityEvent,deleteEvent:deleteEvent}}(Appnima),Appnima.connect=function(type,url,parameters,token,multipart){var attributes,error,headers,promise;null==token&&(token=!1),null==multipart&&(multipart=!1),headers={},token&&null!=Appnima.key&&(headers={Authorization:"basic "+Appnima.key}),!token&&Appnima.key&&(headers={Authorization:"bearer "+Appnima.token}),promise=new Hope.Promise;try{attributes={url:url,type:type,headers:headers,data:parameters,success:function(){return function(response){return response?promise.done(null,response):promise.done("Unknown error",null)}}(this),error:function(_this){return function(type,xhr){var error,response;return"string"!=typeof type&&(xhr=type),response=null!=xhr.response?xhr.response:xhr.responseText,error={code:xhr.status,type:xhr.statusText,message:JSON.parse(response).message},promise.done(error,null),null!=Appnima.onError?Appnima.onError.call(_this,error):void 0}}(this)},multipart===!0?(attributes.processData=!1,attributes.contentType=!1):(attributes.dataType="json",attributes.contentType="application/x-www-form-urlencoded"),this.Dom.ajax(attributes)}catch(_error){error=_error,promise.done(error,null)}return promise},Appnima.connectMultipart=function(type,url,parameters,callbacks){var formData,name,onLoadComplete,promise,value,xhr;null==callbacks&&(callbacks={}),promise=new Hope.Promise,formData=new FormData;for(name in parameters)value=parameters[name],formData.append(name,value);return xhr=new XMLHttpRequest,xhr.responseType="json",onLoadComplete=function(){return promise.done(null,this.response)},xhr.addEventListener("load",onLoadComplete,!1),callbacks.progress&&xhr.upload.addEventListener("progress",callbacks.progress,!1),callbacks.error&&xhr.addEventListener("error",callbacks.error,!1),callbacks.abort&&xhr.addEventListener("abort",callbacks.abort,!1),xhr.open("POST",url),xhr.setRequestHeader("Authorization","bearer "+Appnima.token),xhr.send(formData),promise},Appnima.Location=function(app){var add,checkin,checkins,friends,people,place,places,user,_find,_url;return places=function(parameters){return app.connect("GET",""+_url()+"places",parameters)},place=function(parameters){return app.connect("GET",""+_url()+"place",parameters)},add=function(parameters){return app.connect("POST",""+_url()+"place",parameters)},checkin=function(id){return app.connect("POST",""+_url()+"checkin",{id:id})},checkins=function(user){return app.connect("GET",""+_url()+"checkin",{user:user})},friends=function(parameters){return parameters.radius||(parameters.radius=5e3),_find("friends",parameters)},people=function(parameters){return parameters.radius||(parameters.radius=5e3),_find("people",parameters)},user=function(parameters){return null!=(null!=parameters?parameters.latitude:void 0)&&null!=(null!=parameters?parameters.longitude:void 0)?app.connect("POST",""+_url()+"user",parameters):app.connect("GET",""+_url()+"user")},_find=function(method,parameters){return app.connect("GET",""+_url()+method,parameters)},_url=function(){return app.host.main+"/location/"},{add:add,checkin:checkin,checkins:checkins,friends:friends,people:people,places:places,place:place,user:user}}(Appnima),Appnima.Messenger=function(app){var SMS,conversation,deleteMessage,mail,message,messageInbox,messageOutbox,readMessage,search,summary,_messageState,_url;return mail=function(parameters){return app.connect("POST",""+_url()+"mail",parameters)},message=function(parameters){return app.connect("POST",""+_url()+"message",parameters)},SMS=function(parameters){return app.connect("POST",""+_url()+"sms",parameters)},messageInbox=function(){return app.connect("GET",""+_url()+"message/inbox",{})},messageOutbox=function(){return app.connect("GET",""+_url()+"message/outbox",{})},summary=function(){return app.connect("GET",""+_url()+"summary")},search=function(query){var parameters;return parameters={query:query},app.connect("GET",""+_url()+"search",parameters)},conversation=function(username){var parameters;return parameters={username:username},app.connect("GET",""+_url()+"conversation",parameters)},readMessage=function(message){return _messageState(message,"READ")},deleteMessage=function(message){return _messageState(message,"DELETED")},_messageState=function(message,state){var parameters;return parameters={message:message,state:state},app.connect("PUT",""+_url()+"message",parameters)},_url=function(){return app.host.main+"/messenger/"},{mail:mail,SMS:SMS,message:message,readMessage:readMessage,deleteMessage:deleteMessage,messageInbox:messageInbox,messageOutbox:messageOutbox,summary:summary,conversation:conversation,search:search}}(Appnima),Appnima.Network=function(app){var check,follow,followers,following,friends,search,shieldFollow,unfollow,_errorParameters,_relationship,_url;return following=function(parameters){return app.connect("GET",""+_url()+"following",parameters)},followers=function(parameters){return app.connect("GET",""+_url()+"followers",parameters)},friends=function(user){var parameters;return parameters=null!=user?{user:user}:void 0,app.connect("GET",""+_url()+"friends",parameters)},follow=function(user_id){return _relationship("POST","follow",user_id)},shieldFollow=function(user_id){var parameters;return parameters={},parameters.user=user_id,parameters.shield=!0,app.connect("POST",""+_url()+"follow",parameters)},check=function(user_id){return _relationship("GET","check",user_id)},unfollow=function(user_id){return _relationship("POST","unfollow",user_id)},search=function(query){return app.connect("GET",""+_url()+"search",{query:query})},_relationship=function(type,method,user_id){var promise;return promise=new Hope.Promise,user_id?app.connect(type,""+_url()+method,{user:user_id}).then(function(error,result){return promise.done(error,result)}):promise.done({code:1,message:"Insuficient parameters",type:"Client"},null),promise},_errorParameters=function(){return this},_url=function(){return app.host.main+"/network/"},{following:following,followers:followers,friends:friends,check:check,follow:follow,unfollow:unfollow,search:search,shieldFollow:shieldFollow}}(Appnima),Appnima.Payments=function(app){var confirm,createCreditCard,deleteCreditCard,getCreditCards,getPurchases,purchase,searchPurchases,updateCreditCard,_errorParameters,_url;return getCreditCards=function(){return app.connect("GET",""+_url()+"creditcard")},createCreditCard=function(parameters){return app.connect("POST",""+_url()+"creditcard",parameters)},deleteCreditCard=function(parameters){return app.connect("DELETE",""+_url()+"creditcard",parameters)},updateCreditCard=function(parameters){return app.connect("PUT",""+_url()+"creditcard",parameters)},purchase=function(parameters){return app.connect("POST",""+_url()+"purchase",parameters)},getPurchases=function(parameters){return app.connect("GET",""+_url()+"purchase",parameters)},confirm=function(parameters){return app.connect("POST",""+_url()+"confirm",parameters)},searchPurchases=function(parameters){return app.connect("GET",""+_url()+"purchase/search",parameters)},_errorParameters=function(){return this},_url=function(){return app.host.main+"/payments/"},{getCreditCards:getCreditCards,createCreditCard:createCreditCard,deleteCreditCard:deleteCreditCard,updateCreditCard:updateCreditCard,purchase:purchase,confirm:confirm,getPurchases:getPurchases,searchPurchase:searchPurchases}}(Appnima),Appnima.Network.Post=function(app){var comments,counter,create,createComment,deleteComment,get,like,likeUsers,remove,search,timeline,update,updateComment,userLike,_url;return create=function(parameters){return app.connect("POST",""+_url()+"post",parameters)},update=function(parameters){return app.connect("PUT",""+_url()+"post",parameters)},remove=function(id){return app.connect("DELETE",""+_url()+"post",{id:id})},get=function(id){return app.connect("GET",""+_url()+"post",{id:id})},search=function(parameters){return app.connect("GET",""+_url()+"post/search",parameters)},counter=function(id){var parameters;return parameters={},id&&(parameters.user=id),app.connect("GET",""+_url()+"post/user",parameters)},timeline=function(parameters){return app.connect("GET",""+_url()+"post/timeline",parameters)},comments=function(id){return app.connect("GET",""+_url()+"post/comment",{id:id})},createComment=function(parameters){return app.connect("POST",""+_url()+"post/comment",parameters)},updateComment=function(parameters){return app.connect("PUT",""+_url()+"post/comment",parameters)},deleteComment=function(id){return app.connect("DELETE",""+_url()+"post/comment",{id:id})},likeUsers=function(post){return app.connect("GET",""+_url()+"post/like/users",{post:post})},userLike=function(parameters){return app.connect("GET",""+_url()+"post/user/like",parameters)},like=function(post){return app.connect("POST",""+_url()+"post/like",{post:post})},_url=function(){return app.host.main+"/network/"},{create:create,update:update,remove:remove,search:search,counter:counter,get:get,timeline:timeline,comments:comments,createComment:createComment,deleteComment:deleteComment,likeUsers:likeUsers,userLike:userLike,like:like}}(Appnima),Appnima.Push=function(app){var received,send,_url;return send=function(parameters){return app.connect("POST",_url(),parameters)},received=function(){return this},_url=function(){return app.host.main+"/push"},{send:send,received:received}}(Appnima),Appnima.Socket=function(){function Socket(id,type){var parameters;null==type&&(type=null),this.onMessage=__bind(this.onMessage,this),this.onDisconnect=__bind(this.onDisconnect,this),this.onError=__bind(this.onError,this),this.onDisallow=__bind(this.onDisallow,this),this.onConnect=__bind(this.onConnect,this),this.broadcast=__bind(this.broadcast,this),this.send=__bind(this.send,this),this.disallowUsers=__bind(this.disallowUsers,this),this.allowUsers=__bind(this.allowUsers,this),this.disconnect=__bind(this.disconnect,this),this.connect=__bind(this.connect,this),this.create=__bind(this.create,this),parameters={"force new connection":!0,port:3e3},this.socket=io.connect(_url(),parameters),null!=id&&this.connect(id,type),this.socket.on("connect",function(_this){return function(){return _this.connected=!0}}(this))}var _url;return Socket.prototype.create=function(id,type,persistent,name,allowedUsers){return null==persistent&&(persistent=!0),null==name&&(name=""),null==allowedUsers&&(allowedUsers=[]),this.connected?this.socket.emit("open",Appnima.token,id,name,type,persistent,allowedUsers):this.socket.on("connect",function(_this){return function(){return _this.connected=!0,_this.socket.emit("open",Appnima.token,id,name,type,persistent,allowedUsers)}}(this))},Socket.prototype.connect=function(id,type){return null==type&&(type=null),this.connected?this.socket.emit("join",Appnima.token,id,type):(this.connected=!0,this.socket.on("connect",function(_this){return function(){return _this.socket.emit("join",Appnima.token,id,type)}}(this)))},Socket.prototype.disconnect=function(){return this.socket.emit("leave")},Socket.prototype.allowUsers=function(users){return null==users&&(users=[]),this.socket.emit("allowUsers",users)},Socket.prototype.disallowUsers=function(users){return null==users&&(users=[]),this.socket.emit("disallowUsers",users)},Socket.prototype.send=function(message,type){return null==type&&(type=0),this.socket.emit("sendMessage",{content:message,type:type})},Socket.prototype.broadcast=function(message,type){return null==type&&(type=0),this.socket.emit("broadcastMessage",{content:message,type:type})},Socket.prototype.onConnect=function(callback){return this.socket.on("onConnect",function(message){return callback(message)})},Socket.prototype.onDisallow=function(callback){return this.socket.on("onDisallowUsers",function(users){return callback(users)})},Socket.prototype.onError=function(callback){return this.socket.on("onError",function(){return function(message){return callback(message)}}(this))},Socket.prototype.onDisconnect=function(callback){return this.socket.on("disconnect",callback)},Socket.prototype.onMessage=function(callback){return this.socket.on("onMessage",function(message){return callback(message)})},Socket.prototype.api=function(type,method,parameters){return Appnima.connect(type,""+Appnima.host.main+method,parameters)},_url=function(){return""+Appnima.host.socket+"/socket/"},Socket}(),Appnima.Socket.Group=function(_super){function Group(){return Group.__super__.constructor.apply(this,arguments)}return __extends(Group,_super),Group.prototype.create=function(name,users,persistent){return null==users&&(users=[]),null==persistent&&(persistent=!0),Group.__super__.create.call(this,null,"private",persistent,name,users)},Group.prototype.list=function(){return this.api("GET","/socket/room")},Group.prototype.remove=function(id){return this.api("DELETE","/socket/room",{id:id})},Group.prototype.rename=function(id,name){return this.api("PUT","/socket/room",{id:id,name:name})},Group.prototype.deleteUnreadCount=function(room){return this.api("DELETE","/socket/message/unread",{room:room})},Group.prototype.messages=function(room,page){return this.api("GET","/socket/message",{room:room,page:page})},Group}(Appnima.Socket),Appnima.Socket.Chat=function(_super){function Chat(){return Chat.__super__.constructor.apply(this,arguments)}return __extends(Chat,_super),Chat.prototype.create=function(name,users){return null==users&&(users=[]),Chat.__super__.create.call(this,name,users,!1)},Chat}(Appnima.Socket.Group),Appnima.Socket.Emiter=function(_super){function Emiter(id){Emiter.__super__.constructor.call(this,null),this.create(id,"public",!1,id)}return __extends(Emiter,_super),Emiter}(Appnima.Socket),Appnima.Socket.Listener=function(_super){function Listener(id){Listener.__super__.constructor.call(this,id,"public")}return __extends(Listener,_super),Listener}(Appnima.Socket),Appnima.Socket.Application=function(_super){function Application(){Application.__super__.constructor.call(this,null),this.connect(null,"application")}return __extends(Application,_super),Application}(Appnima.Socket),Appnima.Socket.Inbox=function(_super){function Inbox(){Inbox.__super__.constructor.call(this,null),this.create(null,"inbox",!1)}return __extends(Inbox,_super),Inbox.prototype.unreadCounts=function(){return this.api("GET","socket/message/unread")},Inbox.prototype.onOnlineFriends=function(callback){return null!=callback&&this.socket.on("onOnlineFriends",function(users){return callback(users)}),this.socket.emit("onlineFriends",Appnima.token)},Inbox.prototype.onFriendStatusChange=function(callback){return this.socket.on("friendStatusChange",function(user){return callback(user)})},Inbox.prototype.sendToUser=function(id,data){return this.socket.emit("sendToUser",Appnima.token,id,data)},Inbox}(Appnima.Socket),Appnima.Storage=function(app){var activityFile,allowAccessFile,createFolder,deleteFile,deleteFolder,denyAccessFile,dir,download,publicURLFile,renameFile,renameFolder,search,sharedFiles,upload,_url;return dir=function(folder){var parameters;return parameters=folder?{folder:folder}:null,app.connect("GET",""+_url()+"folder",parameters)},createFolder=function(parameters){return app.connect("POST",""+_url()+"folder",parameters)},renameFolder=function(parameters){return app.connect("PUT",""+_url()+"folder",parameters)},deleteFolder=function(path){return app.connect("DELETE",""+_url()+"folder",{path:path})},upload=function(parameters,callbacks){return null==callbacks&&(callbacks={}),parameters.path||(parameters.path="/"),app.connectMultipart("POST",""+_url()+"file",parameters,callbacks)},download=function(file_id){return window.location=""+_url()+"file/"+file_id+"_"+Appnima.token},activityFile=function(id_file){return app.connect("GET",""+_url()+"activity",{id_file:id_file})},renameFile=function(parameters){return app.connect("PUT",""+_url()+"file",parameters)},deleteFile=function(id){return app.connect("DELETE",""+_url()+"file",{id:id})},search=function(term){return app.connect("POST",""+_url()+"search",{term:term})},publicURLFile=function(parameters){return app.connect("POST",""+_url()+"file/share",parameters)},allowAccessFile=function(parameters){return app.connect("PUT",""+_url()+"file/allow",parameters)},denyAccessFile=function(parameters){return app.connect("PUT",""+_url()+"file/disallow",parameters)},sharedFiles=function(){return app.connect("GET",""+_url()+"shared")},_url=function(){return""+app.host.storage+"/"},{upload:upload,download:download,renameFile:renameFile,deleteFile:deleteFile,search:search,publicURLFile:publicURLFile,createFolder:createFolder,renameFolder:renameFolder,deleteFolder:deleteFolder,dir:dir,allowAccessFile:allowAccessFile,denyAccessFile:denyAccessFile,activityFile:activityFile,sharedFiles:sharedFiles}}(Appnima),Appnima.User=function(app){var avatar,changePassword,deleteTicket,getTicket,info,login,logout,rememberPassword,resetPassword,searchTickets,session,signup,subscribe,terminal,ticket,token,update,updateTicket,_credentials,_storage,_url;return signup=function(mail,password,username){var parameters,promise;return promise=new Hope.Promise,parameters={password:password},mail&&(parameters.mail=mail),username?parameters.username=username:mail&&(parameters.username=mail),app.connect("POST",""+_url()+"signup",parameters,token).then(function(error,profile){var storage;return storage=_storage(profile),_credentials(promise,error,profile)}),promise},token=function(){var parameters,promise,storage;return promise=new Hope.Promise,storage=_storage(),parameters={refresh_token:storage.refresh_token,grant_type:"refresh_token"},app.connect("POST",""+_url()+"token",parameters,!0).then(function(error,token){return _credentials(promise,error,token)}),promise},session=function(){var storage;return storage=JSON.parse(localStorage.getItem(app.key)),storage&&(Appnima.token=storage.access_token,app.connect("GET",""+_url()+"info").then(function(error,result){return _storage(result)})),storage},login=function(mail,password,username){var parameters,promise;return promise=new Hope.Promise,parameters={password:password},mail&&(parameters.mail=mail),username&&(parameters.username=username),app.connect("POST",""+_url()+"login",parameters,!0).then(function(error,profile){return _credentials(promise,error,profile)}),promise},logout=function(){var promise;return promise=new Hope.Promise,setTimeout(function(){return localStorage.removeItem(app.key),promise.done(null,{status:"ok"})},300),promise},info=function(id){return id?app.connect("GET",""+_url()+"info",{id:id}):app.connect("GET",""+_url()+"info")},update=function(data){return app.connect("PUT",""+_url()+"info",data)},avatar=function(data){return app.connect("POST",""+_url()+"avatar",{avatar:data},!1)},changePassword=function(old_password,new_password){var parameters;return parameters={old_password:old_password,new_password:new_password},app.connect("PUT",""+_url()+"password",parameters)},rememberPassword=function(mail,application,url){var parameters;return parameters={},parameters.application=application,parameters.mail=mail,url&&(parameters.url=url),app.connect("POST",""+_url()+"remember/password",parameters)},resetPassword=function(code,password){var parameters;return parameters={code:code,password:password},app.connect("POST",""+_url()+"reset/password",parameters)},terminal=function(parameters){var method;return method="GET",parameters&&(method="POST"),app.connect(method,""+_url()+"terminal",parameters)},subscribe=function(mail){return app.connect("POST",""+_url()+"subscription",{mail:mail},!0)},ticket=function(parameters){return app.connect("POST",""+_url()+"ticket",parameters)},updateTicket=function(parameters){return app.connect("PUT",""+_url()+"ticket",parameters)},getTicket=function(parameters){return app.connect("GET",""+_url()+"ticket",parameters)},deleteTicket=function(id){return app.connect("DELETE",""+_url()+"ticket",{id:id})},searchTickets=function(parameters){return app.connect("GET",""+_url()+"ticket/search",parameters)},_url=function(){return app.host.main+"/user/"},_credentials=function(promise,error,result){return error?promise.done(error,null):promise.done(null,_storage(result))},_storage=function(extend){var attribute,storage;if(storage=JSON.parse(localStorage.getItem(app.key))||{},extend){for(attribute in extend)storage[attribute]=extend[attribute];localStorage.setItem(app.key,JSON.stringify(storage)),null!=storage.access_token&&(Appnima.token=storage.access_token)}return storage},{signup:signup,token:token,login:login,logout:logout,session:session,info:info,update:update,avatar:avatar,changePassword:changePassword,rememberPassword:rememberPassword,resetPassword:resetPassword,terminal:terminal,subscribe:subscribe,ticket:ticket,updateTicket:updateTicket,getTicket:getTicket,searchTickets:searchTickets}}(Appnima),Appnima.Peer=function(){function Peer(){this.trigger=__bind(this.trigger,this),this.on=__bind(this.on,this),this.onAddStream=__bind(this.onAddStream,this),this.onAnswer=__bind(this.onAnswer,this),this.onOffer=__bind(this.onOffer,this),this.answer=__bind(this.answer,this),this.createAnswer=__bind(this.createAnswer,this),this.offer=__bind(this.offer,this),this.createOffer=__bind(this.createOffer,this),this.onCandidate=__bind(this.onCandidate,this),this.candidate=__bind(this.candidate,this),this.onIceCandidate=__bind(this.onIceCandidate,this),this.onToken=__bind(this.onToken,this),this.onHangUp=__bind(this.onHangUp,this),this.readyToCall=__bind(this.readyToCall,this),this.token=__bind(this.token,this),this.join=__bind(this.join,this),this.stream=__bind(this.stream,this),this.onConnect=__bind(this.onConnect,this),this.onFriend=__bind(this.onFriend,this);var session;Appnima.Signaling=io.connect(Appnima.host.rtc+"/rtc/"),this.callbacks={},session=JSON.parse(localStorage.getItem(Appnima.key)),Appnima.Signaling.emit("connected",null!=session?session.access_token:void 0),Appnima.Signaling.on("connected",this.onConnect),Appnima.Signaling.on("friend",this.onFriend),Appnima.Signaling.on("hangUp",this.onHangUp)}var configuration;return configuration={iceServers:[{url:"stun:stun.l.google.com:19302"},{url:"stun:23.21.150.121"},{url:"stun:stun01.sipphone.com"},{url:"stun:stun.ekiga.net"},{url:"stun:stun.fwdnet.net"},{url:"stun:stun.ideasip.com"},{url:"stun:stun.iptel.org"},{url:"stun:stun.rixtelecom.se"},{url:"stun:stun.schlund.de"},{url:"stun:stun.l.google.com:19302"},{url:"stun:stun1.l.google.com:19302"},{url:"stun:stun2.l.google.com:19302"},{url:"stun:stun3.l.google.com:19302"},{url:"stun:stun4.l.google.com:19302"},{url:"stun:stunserver.org"},{url:"stun:stun.softjoys.com"},{url:"stun:stun.voiparound.com"},{url:"stun:stun.voipbuster.com"},{url:"stun:stun.voipstunt.com"},{url:"stun:stun.voxgratia.org"},{url:"stun:stun.xten.com"},{url:"turn:numb.viagenie.ca",credential:"muazkh",username:"webrtc@live.com"},{url:"turn:192.158.29.39:3478?transport=udp",credential:"JZEOEt2V3Qb0y27GRntt2u2PAYA=",username:"28224511:1379330808"},{url:"turn:192.158.29.39:3478?transport=tcp",credential:"JZEOEt2V3Qb0y27GRntt2u2PAYA=",username:"28224511:1379330808"},{url:"turn:numb.viagenie.ca",credential:"webrtcdemo",username:"louis%40mozilla.com"}]},Peer.prototype.onFriend=function(friends){return this.trigger("friend",friends)},Peer.prototype.onConnect=function(friends){return this.trigger("connected",friends)},Peer.prototype.stream=function(stream){return this.localStream=stream},Peer.prototype.join=function(){var session;return session=JSON.parse(localStorage.getItem(Appnima.key)),Appnima.Signaling.emit("join",session.access_token),Appnima.Signaling.on("ready",this.readyToCall),Appnima.Signaling.on("offer",this.onOffer)},Peer.prototype.token=function(){return Appnima.Signaling.on("token",this.onToken(this.createOffer)),Appnima.Signaling.emit("token")},Peer.prototype.readyToCall=function(friend_id){return this.trigger("ready",friend_id)},Peer.prototype.onHangUp=function(value){return this.trigger("hangUp",value)},Peer.prototype.onToken=function(callback){return function(_this){return function(){_this.peerConnection=new RTCPeerConnection({iceServers:configuration.iceServers}),_this.peerConnection.addStream(_this.localStream),_this.peerConnection.onicecandidate=_this.onIceCandidate,_this.peerConnection.onaddstream=_this.onAddStream,Appnima.Signaling.on("candidate",_this.onCandidate),Appnima.Signaling.on("answer",_this.onAnswer),callback()}}(this)},Peer.prototype.onIceCandidate=function(event){return event.candidate?this.trigger("candidate",event.candidate):void 0},Peer.prototype.candidate=function(candidate,user){return Appnima.Signaling.emit("candidate",user,JSON.stringify(candidate))},Peer.prototype.onCandidate=function(candidate){var rtcCandidate;return rtcCandidate=new RTCIceCandidate(JSON.parse(candidate)),this.peerConnection.addIceCandidate(rtcCandidate)},Peer.prototype.createOffer=function(){return this.trigger("offer")},Peer.prototype.offer=function(user){return this.peerConnection.createOffer(function(_this){return function(offer){return _this.peerConnection.setLocalDescription(offer),Appnima.Signaling.emit("offer",user,JSON.stringify(offer))}}(this))},Peer.prototype.createAnswer=function(offer){return this.trigger("answer",offer)},Peer.prototype.answer=function(offer,user){return function(_this){return function(){var rtcOffer;rtcOffer=new RTCSessionDescription(JSON.parse(offer)),_this.peerConnection.setRemoteDescription(rtcOffer),_this.peerConnection.createAnswer(function(answer){_this.peerConnection.setLocalDescription(answer),Appnima.Signaling.emit("answer",user,JSON.stringify(answer))},function(error){console.log("error",error)})}}(this)},Peer.prototype.onOffer=function(offer){return Appnima.Signaling.on("token",this.onToken(this.createAnswer(offer))),Appnima.Signaling.emit("token")},Peer.prototype.onAnswer=function(answer){var rtcAnswer;return rtcAnswer=new RTCSessionDescription(JSON.parse(answer)),this.peerConnection.setRemoteDescription(rtcAnswer)},Peer.prototype.onAddStream=function(event){return this.trigger("onAddStream",event)},Peer.prototype.on=function(event,callback){return this.callbacks[event]=callback},Peer.prototype.trigger=function(event,data){return this.callbacks[event]?this.callbacks[event].call(this.callbacks[event],data):void 0},Peer}()}.call(this);
