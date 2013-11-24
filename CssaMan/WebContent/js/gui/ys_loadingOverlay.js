
var YS_PAGE_OVERLAY;
require(["dojo/_base/declare","dojo/dom","dojo/dom-style","dojo/_base/fx","ready!"],
    function(declare, dom, domStyle, fx){
        var pageOverlayObj = declare(null, {
            overlayNode:null,
            constructor:function(){
                // save a reference to the overlay
                this.overlayNode = dom.byId("loadingOverlay");
            },
            // called to hide the loading overlay
            endLoading:function(){
//                domStyle.set(this.overlayNode,'display','none');
                fx.fadeOut({
                    node: this.overlayNode,
                    onEnd: function(node){
                        domStyle.set(node, 'display', 'none');
                    }
                }).play();
            }
        });
        YS_PAGE_OVERLAY = new pageOverlayObj();
    });