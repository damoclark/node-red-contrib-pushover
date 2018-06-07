
module.exports = function(RED) {
    "use strict";

    function PushoverNode(n) {
        RED.nodes.createNode(this,n);

        this.title = n.title;
        var credentials = this.credentials;
        if ((credentials) && (credentials.hasOwnProperty("token"))) { this.token = credentials.token; }
        else { this.error("No Pushover api token set"); }
        if ((credentials) && (credentials.hasOwnProperty("userKey"))) { this.userKey = credentials.userKey; }
        else { this.error("No Pushover user key set"); }

        var node = this;

        this.on("input",function(msg) {
            let token      = this.token;
            let user       = this.userKey;
            let message    = msg.payload;
            let attachment = null || null;
            let device     = msg.device;
            let title      = this.title || msg.topic || "Node-RED";
            let url        = msg.url || null;
            let url_title  = msg.url_title || null;
            let priority   = msg.priority || 0;
            let sound      = msg.sound || null;
            
            if (priority > 2 || priority < -2) { this.error("priority out of range")}
            if (typeof(message) === 'object') { message = JSON.stringify(message);}
            else { msg.payload = msg.payload.toString(); }

            this.warn(msg)
        });
    }
    RED.nodes.registerType("pushover",PushoverNode,{
        credentials: {
            userKey: {type:"text"},
            token: {type: "text"}
        }
    });
}