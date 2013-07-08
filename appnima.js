/* Appnima v0.8.0 - 2013/7/8
   http://tapquo.com
   Copyright (c) 2013 Tapquo S.L. - Licensed GPLv3 */
(function(){(function(n){var t,e,r,o,i;e=function(){this._callbacks=[];return this};o=function(n){var t,r,o,i,u,c,s;t=n.length;r=0;c=new e;o=[];s=[];u=function(n){return function(e,i){r+=1;o[n]=e;s[n]=i;if(r===t){return c.done(o,s)}}};i=0;while(i<t){n[i]().then(u(i));i++}return c};r=function(n,t,o,i){var u;u=new e;if(n.length===0||i!=null&&t!=null){u.done(t,o)}else{n[0](t,o).then(function(t,e){n.splice(0,1);return r(n,t,e,i).then(function(n,t){return u.done(n,t)})})}return u};i=function(n,t,e){return r(n,t,e,true)};e.prototype.then=function(n,t){var e;e=function(){return n.apply(t,arguments)};if(this._isdone){return e(this.error,this.result)}else{return this._callbacks.push(e)}};e.prototype.done=function(n,t){var e,r;this._isdone=true;this.error=n;this.result=t;e=0;r=this._callbacks.length;while(e<r){this._callbacks[e](n,t);e++}return this._callbacks=[]};t={Promise:e,join:o,chain:r,shield:i};if(typeof define==="function"&&define.amd){return define(function(){return t})}else{return n.Hope=t}})(this)}).call(this);(function(){var n;window.Appnima=n={};n.version="0.1.0507";n.key=null;n.token=null;n.production=true;n.Dom=typeof $$!=="undefined"&&$$!==null?$$:$;n.onError=null}).call(this);(function(){Appnima.connect=function(n,t,e,r){var o,i,u,c=this;if(r==null){r=false}i={};if(r&&Appnima.key!=null){i={Authorization:"basic "+Appnima.key}}if(!r&&Appnima.key){i={Authorization:"bearer "+Appnima.token}}u=new Hope.Promise;try{this.Dom.ajax({url:t,type:n,headers:i,data:e,dataType:"json",contentType:"application/x-www-form-urlencoded",success:function(n){if(n){return u.done(null,n)}else{return u.done("Unknown error",null)}},error:function(n,t,e){var r,o;if(typeof n!=="string"){t=n}o=t.response!=null?t.response:t.responseText;r={code:t.status,type:t.statusText,message:JSON.parse(o).message};u.done(r,null);if(Appnima.onError!=null){return Appnima.onError.call(c,r)}}})}catch(s){o=s;u.done(o,null)}return u}}).call(this);(function(){Appnima.Instance=function(n){var t,e;t={DEV:{user:"http://localhost:1337/",messenger:"http://localhost:1337/messenger/",location:"http://localhost:1337/location/",socket:"http://192.168.1.184:1337/",push:"http://localhost:1337/push/"},PRO:{user:"http://api.appnima.com/",messenger:"http://api.appnima.com/messenger/",location:"http://api.appnima.com/location/",socket:"http://ec2-54-245-167-216.us-west-2.compute.amazonaws.com/",push:"http://api.appnima.com/push/"}};e=function(e){return t[n.production?"PRO":"DEV"][e]};return{get:e}}(Appnima)}).call(this);(function(){Appnima.Location=function(n){var t,e,r,o,i,u,c,s,a;c=function(n,t,e,r){if(e==null){e=5e3}if(r==null){r=null}return s("places",n,t,e,r)};u=function(t,e){var r;r={id:t,reference:e};return n.connect("GET",""+a()+"place",r)};t=function(t,e,r,o,i,u,c,s,l,p){var f;f={name:t,address:e,locality:r,postal_code:o,country:i,latitude:u,longitude:c};if(s!=null){f.mail=s}if(l!=null){f.phone=l}if(p!=null){f.website=p}return n.connect("POST",""+a()+"place",f)};e=function(t,e){var r;r={id:t,reference:e};return n.connect("POST",""+a()+"checkin",r)};r=function(t){return n.connect("GET",""+a()+"checkin",{user:t})};o=function(n,t,e){if(e==null){e=5e3}return s("friends",n,t,e)};i=function(n,t,e){if(e==null){e=5e3}return s("people",n,t,e)};s=function(t,e,r,o){var i;if(o==null){o=5e3}i={latitude:e,longitude:r,radius:o};return n.connect("GET",""+a()+t,i)};a=function(){return n.Instance.get("location")};return{places:c,place:u,add:t,checkin:e,checkins:r,people:i,friends:o}}(Appnima)}).call(this);(function(){Appnima.Messenger=function(n){var t,e,r,o,i,u,c,s,a;r=function(t,e,r){var o;o={user:t,subject:e,message:r};return n.connect("POST",""+a()+"mail",o)};o=function(t,e,r){var o;o={user:t,message:e,subject:r};return n.connect("POST",""+a()+"message",o)};t=function(t,e){var r;r={user:t,message:e};return n.connect("POST",""+a()+"sms",r)};i=function(){return n.connect("GET",""+a()+"message/inbox",{})};u=function(){return n.connect("GET",""+a()+"message/outbox",{})};c=function(n){return s(n,"READ")};e=function(n){return s(n,"DELETED")};s=function(t,e){var r;r={message:t,state:e};return n.connect("PUT",""+a()+"message",r)};a=function(){return n.Instance.get("messenger")};return{mail:r,SMS:t,message:o,readMessage:c,deleteMessage:e,messageInbox:i,messageOutbox:u}}(Appnima)}).call(this);(function(){Appnima.Network=function(n){var t,e,r,o,i,u,c,s,a,l;i=function(t){var e;e=t?{user:t}:null;return n.connect("GET",""+l()+"network/stats",e)};o=function(t){var e;e=t?{user:t}:null;return n.connect("GET",""+l()+"network/following",e)};r=function(t){var e;e=t?{user:t}:null;return n.connect("GET",""+l()+"network/followers",e)};e=function(n){return a("POST","follow",n)};t=function(n){return a("GET","check",n)};c=function(n){return a("POST","unfollow",n)};u=function(t){return n.connect("GET",""+l()+"network/search",{query:t})};a=function(t,e,r){var o;o=new Hope.Promise;if(r){n.connect(t,""+l()+"network/"+e,{user:r}).then(function(n,t){return o.done(n,t)})}else{o.done({code:1,message:"Insuficient parameters",type:"Client"},null)}return o};s=function(n){return this};l=function(){return n.Instance.get("user")};return{info:i,following:o,followers:r,check:t,follow:e,unfollow:c,search:u}}(Appnima)}).call(this);(function(){Appnima.Push=function(n){var t,e,r;e=function(t,e,o){var i;i={user:t,alert:e,content:JSON.stringify(o)};return n.connect("POST",""+r()+"push",i)};t=function(){return this};r=function(){return n.Instance.get("push")};return{send:e,received:t}}(Appnima)}).call(this);(function(){var n,t,e=function(n,t){return function(){return n.apply(t,arguments)}},r={}.hasOwnProperty,o=function(n,t){for(var e in t){if(r.call(t,e))n[e]=t[e]}function o(){this.constructor=n}o.prototype=t.prototype;n.prototype=new o;n.__super__=t.prototype;return n};Appnima.Socket=function(){var n;function t(t){this.onMessage=e(this.onMessage,this);this.onError=e(this.onError,this);this.onConnect=e(this.onConnect,this);this.send=e(this.send,this);this.disallowUsers=e(this.disallowUsers,this);this.allowUsers=e(this.allowUsers,this);this.disconnect=e(this.disconnect,this);this.connect=e(this.connect,this);this.create=e(this.create,this);var r=this;this.socket=io.connect(n(),{"force new connection":true});if(t!=null){this.connect(t)}this.socket.on("connect",function(){return r.connected=true})}t.prototype.create=function(n,t,e,r,o){var i=this;if(e==null){e=true}if(r==null){r=""}if(o==null){o=[]}if(this.connected){return this.socket.emit("open",Appnima.token,n,r,t,e,o)}else{return this.socket.on("connect",function(){i.connected=true;return i.socket.emit("open",Appnima.token,n,r,t,e,o)})}};t.prototype.connect=function(n){var t=this;if(this.connected){return this.socket.emit("join",Appnima.token,n)}else{this.connected=true;return this.socket.on("connect",function(){return t.socket.emit("join",Appnima.token,n)})}};t.prototype.disconnect=function(){return this.socket.emit("leave")};t.prototype.allowUsers=function(n){if(n==null){n=[]}return this.socket.emit("allowUsers",n)};t.prototype.disallowUsers=function(n){if(n==null){n=[]}return this.socket.emit("disallowUsers",n)};t.prototype.send=function(n){return this.socket.emit("sendMessage",n)};t.prototype.broadcast=function(n){return this.socket.emit("sendBroadcast",n)};t.prototype.onConnect=function(n){return this.socket.on("onConnection",function(t){return n(t)})};t.prototype.onError=function(n){var t=this;return this.socket.on("onError",function(e){if(e.indexOf("[CONNECTION ERROR]")!==-1){t.disconnect()}return n(e)})};t.prototype.onMessage=function(n){return this.socket.on("onMessage",function(t){return n(t)})};t.prototype.api=function(t,e,r){return Appnima.connect(t,""+n()+e,r)};t.prototype.messages=function(n){return this};n=function(){return Appnima.Instance.get("socket")};return t}();Appnima.Socket.Group=function(t){o(e,t);function e(){n=e.__super__.constructor.apply(this,arguments);return n}e.prototype.create=function(n,t,r){if(t==null){t=[]}if(r==null){r=true}return e.__super__.create.call(this,null,"private",r,n,t)};e.prototype.list=function(){return this.api("GET","api/groups")};e.prototype.remove=function(n){return this.api("PUT","api/group",{id:n})};return e}(Appnima.Socket);Appnima.Socket.Chat=function(n){o(e,n);function e(){t=e.__super__.constructor.apply(this,arguments);return t}e.prototype.create=function(n,t){if(t==null){t=[]}return e.__super__.create.call(this,n,t,false)};return e}(Appnima.Socket.Group);Appnima.Socket.Emiter=function(n){o(t,n);function t(n){t.__super__.constructor.call(this,null);this.create(n,"public",false,n)}return t}(Appnima.Socket);Appnima.Socket.Listener=function(n){o(t,n);function t(n){t.__super__.constructor.apply(this,arguments)}return t}(Appnima.Socket);Appnima.Socket.Application=function(n){o(t,n);function t(){t.__super__.constructor.call(this,null);this.connect(null)}return t}(Appnima.Socket);Appnima.Socket.Inbox=function(n){o(t,n);function t(){t.__super__.constructor.call(this,null);this.create(null,"inbox",false)}return t}(Appnima.Socket);Appnima.Socket.User=function(n){o(t,n);function t(n){t.__super__.constructor.apply(this,arguments)}return t}(Appnima.Socket)}).call(this);(function(){Appnima.User=function(n){var t,e,r,o,i,u,c,s,a,l,p,f,h,m;c=function(t,e,r){var o,i,u=this;i=new Hope.Promise;o={password:e,username:r!=null?r:t};if(t!=null){o.mail=t}Hope.chain([function(){return n.connect("POST",""+m()+"user/signup",o,p)},function(t,e){var r;r=h(e);o.grant_type="password";return n.connect("POST",""+m()+"oauth2/token",o,true)}]).then(function(n,t){return f(i,n,t)});return i};p=function(){var t,e,r;e=new Hope.Promise;r=h();t={refresh_token:r.refresh_token,grant_type:"refresh_token"};n.connect("POST",""+m()+"oauth2/token",t,true).then(function(n,t){return f(e,n,t)});return e};u=function(){var t;t=JSON.parse(localStorage.getItem(n.key));if(t){Appnima.token=t.access_token;n.connect("GET",""+m()+"user/info").then(function(n,t){return h(t)})}return t};r=function(t,e,r){var o,i;i=new Hope.Promise;o={password:e,username:r!=null?r:null};if(t!=null){o.mail=t}n.connect("POST",""+m()+"user/login",o,true).then(function(n,t){return f(i,n,t)});return i};o=function(t,e,r){var o;o=new Hope.Promise;setTimeout(function(){localStorage.removeItem(n.key);return o.done(null,{status:"ok"})},300);return o};e=function(t){if(!t){return n.connect("GET",""+m()+"user/info")}else{return n.connect("PUT",""+m()+"user/info",t)}};t=function(t){return n.connect("POST",""+m()+"user/avatar",{avatar:t},false)};i=function(t){return n.connect("POST",""+m()+"user/password",{password:t},false)};a=function(t,e,r,o){var i,u;i="GET";u={};if(t!=null){i="POST";u={os:t,token:r,type:e,version:o}}return n.connect(i,""+m()+"user/terminal",u)};s=function(t){return n.connect("POST",""+m()+"user/subscription",{mail:t},true)};l=function(t,e){var r;r={type:t,question:e};return n.connect("POST",""+m()+"user/ticket",r)};m=function(){return n.Instance.get("user")};f=function(n,t,e){if(!t){return n.done(null,h(e))}else{return n.done(t,null)}};h=function(t){var e,r;r=JSON.parse(localStorage.getItem(n.key))||{};if(t){for(e in t){r[e]=t[e]}localStorage.setItem(n.key,JSON.stringify(r));if(r.access_token!=null){Appnima.token=r.access_token}}return r};return{signup:c,token:p,login:r,logout:o,session:u,info:e,avatar:t,password:i,terminal:a,subscribe:s,ticket:l}}(Appnima)}).call(this);