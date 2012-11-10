/*
Copyright (c) 2012, MachiApps
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

enyo.kind({ name:"CalendarSelector",
	classes: "enyo-unselectable",
	published: {
		value: new Date(),
		dayColorDefault: "LightSlateGray",
		dayColorSelected: "Gold",
		dayColorToday: "GoldenRod",
		dayColorOtherMonth: "Silver",
		numberColorThisMonth: "#202020",
		numberColorOtherMonth: "dimgrey"
	},
	events: {
		onSelect: ""
	},
	components:[
		{classes: "top-day-box", components: [
			{content: "S", classes: "top-day-names"},
			{content: "M", classes: "top-day-names"},
			{content: "T", classes: "top-day-names"},
			{content: "W", classes: "top-day-names"},
			{content: "Th", classes: "top-day-names"},
			{content: "F", classes: "top-day-names"},
			{content: "S", classes: "top-day-names"}
		]},
		{fit:true, name: "calVBox", kind: "CalMonth", style: "height: auto;"}
	],
	rendered: function(){
		this.inherited(arguments);
		this.updateCalendar();
	},
	updateCalendar: function(){
		this.dayArray = [];
		this.getDays();
		this.fillData();
	},
	fillData: function(){
		var rows = this.$.calVBox.getControls();
		var curIndex = 0;
		for (var i=0; i<rows.length; i++){
			var cols = rows[i].getControls();
			for (var j=0; j<cols.length; j++){
				var c = this.getColors(this.dayArray[curIndex]);
				cols[j].setValue(this.dayArray[curIndex]);
				cols[j].applyStyle("background-color", c[0]);
				cols[j].applyStyle("color", c[1]);
				curIndex++;
			}
		}
	},
	getColors: function(x){
		var dayColor = this.dayColorDefault;
		var numColor = this.numberColorThisMonth;
		var d1 = new Date().getDate();
		var m1 = new Date().getMonth();
		var y1 = new Date().getFullYear();
		if (x.getMonth() != this.value.getMonth()) {
			//Not Current Month
			dayColor = this.dayColorOtherMonth;
			numColor = this.numberColorOtherMonth;
		} else if (this.value.getFullYear() == x.getFullYear() && this.value.getDate() == x.getDate() && this.value.getMonth() == x.getMonth()) {
			//Selected Day
			dayColor = this.dayColorSelected;
		} else if (y1 == x.getFullYear() && d1 == x.getDate() && m1 == x.getMonth()) {
			//Current Day
			dayColor = this.dayColorToday;
		}
		return [dayColor, numColor];
	},
	getDays: function(){
		var dt = new Date(this.value);
			dt.setDate(1);
		var offsetNum = dt.getDay();
		
		//Use internal calculation of date...
		var prevMonth = new Date(dt);
			prevMonth.setDate(0);//Set to 0 to get the day before 1 -> last of previous month
		var lastDayPrevMonth = prevMonth.getDate();
		var lastOfMonth = new Date(dt);
			lastOfMonth.setMonth(dt.getMonth()+1);//Next month
			lastOfMonth.setDate(0);//Set to 0 to get the day before 1 -> last of previous month -> last of this.selectedMonth
		var lastDayCurMonth = lastOfMonth.getDate();
		
		var day = lastDayPrevMonth-offsetNum+1;
		for (i=0;i<offsetNum;i++){
			this.dayArray.push(new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day, 12, 0, 0));
			day++;
		}
		day = 1;
		while (day<=lastDayCurMonth){
			this.dayArray.push(new Date(lastOfMonth.getFullYear(), lastOfMonth.getMonth(), day, 12, 0, 0));
			day++;
		}
		day = 1;
		lastOfMonth.setMonth(lastOfMonth.getMonth()+1);
		while (this.dayArray.length<42){
			this.dayArray.push(new Date(lastOfMonth.getFullYear(), lastOfMonth.getMonth(), day, 12, 0, 0));
			day++;
		}
	},
	calTap: function(data) {
		this.value = data.value;
		this.updateCalendar();
		this.doSelect({
			value: this.value
		});
	},
	setValue: function(x){
		this.value = new Date(x);
		this.updateCalendar();
	},
	nextMonth: function(){
		var d = this.value.getDate();
		this.value.setMonth(this.value.getMonth()+1);
		if (d != this.value.getDate()){
			//If selected Day doesn't exist in new month
			this.value.setDate(0);
		}
		this.updateCalendar();
		this.doSelect({
			value: this.value
		});
	},
	prevMonth: function(){
		var d = this.value.getDate();
		this.value.setMonth(this.value.getMonth()-1);
		if (d != this.value.getDate()){
			//If selected Day doesn't exist in new month
			this.value.setDate(0);
		}
		this.updateCalendar();
		this.doSelect({
			value: this.value
		});
	}
});

enyo.kind({ name: "CalDay",
	classes: "day-container",
	style: "color: Black;",
	published: {
		value: {}
	},
	handlers: {
		ontap: "tapMe"
	},
	valueChanged: function(inSender, inData){
		this.setContent(this.value.getDate());
	},
	setValue: function(x){
		this.value = x;
		this.valueChanged();
	},
	tapMe: function(inSender, inEvent){
		this.owner.owner.owner.calTap({value: this.value});
		return true;
	}
});

enyo.kind({ name: "CalWeek",
	classes: "onyx-toolbar-inline week-container",
	defaultKind: "CalDay",
	components: [{},{},{},{},{},{},{}]
});

enyo.kind({ name: "CalMonth",
	defaultKind: "CalWeek",
	components:  [{},{},{},{},{},{}]
});
