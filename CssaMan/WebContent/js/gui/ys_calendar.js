function ys_calendar_in_calendar_management_init(){

    require(["dojo/ready", "dijit/registry","dojox/calendar/Calendar", "dojo/_base/Deferred", "dojo/store/Observable","dojo/store/Memory"],
        function(ready, reg, Calendar, Deferred, Observable, Memory){
            ready(function(){

                    //TODO:


                var someData = [
                        {
                            id: 0,
                            summary: "事件1",
                            startTime:  new Date(2013,11, 1, 10),
                            endTime: new Date(2013,5, 11, 12),
                            calendar: "cal1",
                            allDay:false
                        },
                        {
                            id: 1,
                            summary: "事件2",
                            startTime:  new Date(2013,11, 1, 14),
                            endTime: new Date(2013,11, 1, 15),
                            calendar: "cal2",
                            allDay:false
                        }
                 ];

                var store = new Observable(new Memory({data: someData}));


                var calendar = reg.byId("calendar_mgt_calendar_holder");
                if(!reg.byId("calendar_mgt_calendar_holder")){
                     calendar = new Calendar({
                            dateInterval: "week",
                            dateIntervalSteps:1,
                            //startTimeAttr: "begin",
                            //endTimeAttr: "end",
                            store: store,
                            columnViewProps:{minHours:0, maxHours: 24, hourSize:50},
                            cssClassFunc: function(item){
                                return item.calendar;
                            },
                            //columnViewProps:{},
                            style: "position:relative; width:100%; height:100%"
                        },
                        "calendar_mgt_calendar_holder");
                }



                //Deferred.when(calendar.set("store", store), function onOk() {}, function onFail() {});
                    calendar.createOnGridClick=true;
                    //var id = 3;
                    var createItem = function(view, d, e){

                        console.log("create click ? ");
                        // create item by maintaining control key
                        if(!e.ctrlKey || e.shiftKey || e.altKey){
                            return;
                        }


                        console.log("create click ! with ctrl key ");

                        //console.log("colView ", colView);
                        //console.log("calendar ", calendar);


                        //var cal = calendar.dateFuncObj;
                        // create a new event
                        var start, end;
                        var colView = calendar.columnView;
                        var cal = calendar.dateModule;

                        if(view == colView){
                            start = calendar.floorDate(d, "minute", colView.timeSlotDuration);
                            end = cal.add(start, "minute", colView.timeSlotDuration);
                            //end= date.add(start, "minute", colView.timeSlotDuration);
                        }else{
                            start = calendar.floorToDay(d);
                            end = cal.add(start, "day", 1);
                        }

                        var id = 200 + Math.random();

                        //just demo
                        var item = {
                            id: id,
                            summary: "New event " + id,
                            startTime: start,
                            endTime: end,
                            calendar: "cal2",
                            allDay: view.viewKind == "matrix"
                        };

                        //id++;

                        //calendar.store.put(item);

                        return item;
                    };

                    //calendar.set("createOnGridClick", true);
                    calendar.set("createItemFunc", createItem);

                    calendar.on("itemClick", function(e){
                        console.log("Item clicked", e.item.summary);
                    });


                    gc_calendar_left_pane_in_calendar_management_init(calendar);

                }
            )}
    );


}

function gc_calendar_left_pane_in_calendar_management_init(calendar){

    //https://github.com/dojo/demos/blob/master/calendar/MainProperties.js

     

    require(["dijit/registry","dojo/_base/array","dojo/_base/lang", "dojo/store/Memory"], function(reg, arr, lang, Memory){

         var calendar_picker = reg.byId("calendar_mgt_calendar_picker");

         calendar_picker.set("value", calendar.get("date"));


        // Synchronize date picker.
         calendar_picker.on("change", function(e){

             //console.log("onChange",e);
             var d = this.get("value");
             //link to calendar
             calendar.set("date",d);
         });



        var updateDatePicker = function(startTime, endTime){
            console.log(startTime,endTime);
            calendar_picker.set("currentFocus", startTime, false);
            calendar_picker.set("minDate", startTime);
            calendar_picker.set("maxDate", endTime);
            calendar_picker._populateGrid();

        };


        // configure item properties panel
        calendar.on("timeIntervalChange", function(e){
            updateDatePicker(e.startTime, e.endTime);
        });

        //console.log("1");

        calendar_picker.getClassForDate = function(date, locale){

            if(this.minDate && this.maxDate){
                var cal = this.dateModule;
                if(cal.compare(date, this.minDate) >= 0 && cal.compare(date, this.maxDate) <= 0){
                    return "Highlighted";
                }
            }
            return null;
        };


        //console.log("2");
        
        var teamCheckbox = reg.byId("calendar_mgt_calendar_team_checkbox");
        var publicCheckbox = reg.byId("calendar_mgt_calendar_public_checkbox");


        //console.log("3");
        var summary = reg.byId("calendar_mgt_summery_text");
        var startDate = reg.byId("calendar_mgt_time_start_date");
        var startTime = reg.byId("calendar_mgt_time_start_time");
        var endDate = reg.byId("calendar_mgt_time_end_date");
        var endTime = reg.byId("calendar_mgt_time_end_time");
        var calendarEditor = reg.byId("calendar_mgt_calendar_select");
        var allDayCB = reg.byId("calendar_mgt_all_day_checkbox");
        var updateBtn = reg.byId("calendar_mgt_event_update_btn");
        var deleteBtn = reg.byId("calendar_mgt_event_delete_btn");

        //console.log("4");
        var calendar_select_store = new Memory({
            data:  [
                    {"id":'cal1', "label":"Team 日历"},
                    {"id":'cal2', "label":"公共日历"}
                   ]

        });
        
        calendarEditor.store = calendar_select_store;
        calendarEditor.searchAttr = "label";

        //console.log("5");

        var mergeDateTime = function(isStart){
            var dateEditor = isStart ? startDate : endDate;
            var timeEditor = isStart ? startTime : endTime;
            var date = dateEditor.get("value");
            var time = timeEditor.get("value");
            date.setHours(time.getHours());
            date.setMinutes(time.getMinutes());
            return date;
        };


        //console.log("6");
        
        updateBtn.on("click", function(value){
            console.log("calendar.editedItem  in update click", calendar.editedItem);
            if (calendar.editedItem != null) {
                calendar.editedItem.summary = summary.get("value");
                if(allDayCB.get("value")){
                    if(!calendar.isStartOfDay(calendar.editedItem.startTime)){
                        calendar.editedItem.startTime = calendar.floorToDay(startDate.get("value"), true);
                    }
                    if(!calendar.isStartOfDay(calendar.editedItem.endTime)){
                        calendar.editedItem.endTime = calendar.floorToDay(endDate.get("value"), true);
                    }
                    calendar.editedItem.allDay = true;
                }else{
                    calendar.editedItem.startTime = mergeDateTime(true);
                    calendar.editedItem.endTime = mergeDateTime(false);
                    delete calendar.editedItem.allDay;
                }

                var calValue = calendarEditor.get("value");
                console.log("cal value = " + calValue);
                calendar.editedItem.calendar = gc_getIdByValue(calValue,c_path) == "cal1" ? "cal1" : "cal2";
                calendar.store.put(calendar.editedItem);
            }

        });


        deleteBtn.on("click", function(value){
            if (calendar.editedItem != null) {
                calendar.store.remove(calendar.editedItem.id);
            }
        });


        teamCheckbox.on("change", function(v){
            calendar.calendarVisibility[0] = v;
            calendar.currentView.invalidateLayout();

            //console.log(calendar.calendarVisibility);
        });

        publicCheckbox.on("change", function(v){
            calendar.calendarVisibility[1] = v;
            calendar.currentView.invalidateLayout();

            //console.log(calendar.calendarVisibility);
        });


        allDayCB.on("change", function(value){

            startTime.set("disabled", value);
            endTime.set("disabled", value);

            var d;
            if(value){
                d = startTime.get("value");
                calendar.floorToDay(d, true);
                startTime.set("value", d);

                d = endTime.get("value");
                calendar.floorToDay(d, true);
                endTime.set("value", d);

                if(!calendar.isStartOfDay(calendar.editedItem.endTime)){
                    d = endDate.get("value");
                    calendar.floorToDay(d, true);
                    d = calendar.dateModule.add(d, "day", 1);
                    endDate.set("value", d);
                }

            }else{
                calendar.editedItem.startTime.setHours(8);
                calendar.editedItem.endTime.setHours(9);
                startTime.set("value", calendar.editedItem.startTime);
                endTime.set("value", calendar.editedItem.endTime);
                d = endDate.get("value");
                calendar.floorToDay(d, true);
                d = calendar.dateModule.add(d, "day", -1);
                endDate.set("value", d);
            }
        });


        //console.log("8");

        var selectionChanged = function(item){

            var itemNull = item == null;


            var widgets = [summary,startDate,startTime,endDate,endTime,calendarEditor,allDayCB,
            updateBtn,deleteBtn];

            arr.forEach(widgets, function(w){
                w.set("disabled", itemNull);
                w.set("value", null, false);
            });

            calendar.editedItem = itemNull ? null : lang.mixin({}, item);

            console.log("item = ",item);

            if(!itemNull){

                var allDay = item.allDay === true;

                startTime.set("disabled", allDay);
                endTime.set("disabled", allDay);

                //console.log("allDay  ",allDay);
              

                summary.set("value", item.summary);
                startDate.set("value", item.startTime);
                startTime.set("value", item.startTime);
                endDate.set("value", item.endTime);
                endTime.set("value", item.endTime);
               
                calendarEditor.set("value", item.calendar);
                allDayCB.set("value", allDay, false);
            }
        };


        calendar.on("change", function(e){
            selectionChanged(e.newValue);
        });

        calendar.on("itemEditEnd", function(e){
            selectionChanged(e.item);
        });



        // filter out event according to their calendar
        calendar.calendarVisibility = [true, true];

        var itemToRendererKindFunc = function(item){
            if(item.cssClass == "cal1" && calendar.calendarVisibility[0] ||
                item.cssClass == "cal2" && calendar.calendarVisibility[1]){
                return this._defaultItemToRendererKindFunc(item);
            }
            return null;
        };

        calendar.columnView.set("itemToRendererKindFunc", itemToRendererKindFunc);
        calendar.columnView.secondarySheet.set("itemToRendererKindFunc", itemToRendererKindFunc);
        calendar.matrixView.set("itemToRendererKindFunc", itemToRendererKindFunc);



     });
}