/*
Copyright (c) 2012, MachiApps
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
enyo.kind({
	name:"calendarSelector",
	kind: "FittableRows",
	published: {
		selectedMonth: new Date().getMonth()+1,
		selectedYear: new Date().getFullYear(),
		selectedDay: new Date().getDate(),
		minYear: 2012,
		maxYear: 2020,
		dayColorDefault: "LightSlateGray",
		dayColorSelected: "Gold",
		dayColorToday: "GoldenRod",
		dayColorOtherMonth: "Silver",
		numberColorThisMonth: "#202020",
		numberColorOtherMonth: "dimgrey",
		pickersStyled: false
	},
	events: {
		onSelected: "",
		onClose: ""
	},
	components:[
		{kind: "FittableColumns", name: "topBar", style: "width: 100%;", classes: "align-center", components: []},
		{kind: "FittableColumns", name: "dayNames", classes: "day-names", style: "width: 100%;", components: []},
		{fit:true, name: "calVBox", style: "width: 100%;"}
	],
	rendered: function(){
		this.years = [];
		this.dayArray = [];
		for (i = 0; i < 7; i++) {
			this.dayArray[i] = [];
		}
		this.drawCal();
		this.createTopBar();
		var w = document.getElementById(this.id).clientWidth;
		this.$.dayNames.createComponents([
			{content: "S", style: "width: "+(w/7)+"px;"},
			{content: "M", style: "width: "+(w/7)+"px;"},
			{content: "T", style: "width: "+(w/7)+"px;"},
			{content: "W", style: "width: "+(w/7)+"px;"},
			{content: "Th", style: "width: "+(w/7)+"px;"},
			{content: "F", style: "width: "+(w/7)+"px;"},
			{content: "S", style: "width: "+(w/7)+"px;"},
		], {owner:this});
		this.$.dayNames.render();
		this.updateStuff();
	},
	createTopBar: function(){
		var yearSelComps = [];
		for (var i = this.minYear; i<=this.maxYear; i++){
			this.years.push(i);
			yearSelComps.push({content:i, value:i-this.minYear});
		}
		var dArray = [];
		for (var i = 0; i<this.days.length; i++){
			dArray.push({content:i+1, value:i+1});
		}
		var monthComps = [{content: "January", value: 0},{content: "February", value: 1},{content: "March", value: 2},{content: "April", value: 3},{content: "May", value: 4},{content: "June", value: 5},{content: "July", value: 6},{content: "August", value: 7},{content: "September", value: 8},{content: "October", value: 9},{content: "November", value: 10},{content: "December", value: 11}];
		if (this.pickersStyled){
			var x = [
				{kind: "onyx.IconButton", src: "images/menu-icon-back.png", style: "padding: 20px; vertical-align: middle;", onclick: "prevMonth"},
				{kind: "onyx.custom.SelectDecorator", name: "monthSelDec", style: "margin: 5px; width:126px;", components: [
					{kind: "Select", name: "monthSel", onchange: "redraw", components: monthComps},
				]},
				{kind: "onyx.custom.SelectDecorator", name: "daySelDec", style: "margin: 5px;", components: [
					{kind: "Select", name: "daySel", onchange: "redraw", components: dArray}
				]},
				{kind: "onyx.custom.SelectDecorator", name: "yearSelDec", style: "margin: 5px;", components: [
					{kind: "Select", name: "yearSel", onchange: "redraw", components: yearSelComps}
				]},
				{kind: "onyx.IconButton", src: "images/menu-icon-forward.png", style: "padding: 20px; vertical-align: middle;", onclick: "nextMonth"}
			];
		} else {
			var x = [
				{content: "<", onclick: "prevMonth"},
				{kind: "Select", name: "monthSel", onchange: "redraw", style: "vertical-align: middle;", components: monthComps},
				{kind: "Select", name: "daySel", onchange: "redraw", style: "vertical-align: middle;", components: dArray},
				{kind: "Select", name: "yearSel", onchange: "redraw", style: "vertical-align: middle;", components: yearSelComps},
				{content: ">", onclick: "nextMonth"},
			];
		}
		this.$.topBar.createComponents(x, {owner:this});
		this.$.topBar.render();
	},
	getValue: function(){
		return ({
			day: this.selectedDay,
			month: this.selectedMonth,
			year: this.selectedYear
		});
	},
	getMonthComps: function(){
		this.days = [];
		this.$.calVBox.destroyClientControls();
		var x1 = [];
		for (i2=0; i2<6; i2++){
			x1.push(this.getWeekComp(i2));
		}
		this.$.calVBox.createComponents(x1, {owner: this});
		this.$.calVBox.render();
	},
	getWeekComp: function(r){
		var x = [];
		for(i=0;i<7;i++){
			var d = this.dayArray[i][r];
			var m = this.selectedMonth;
			var y = this.selectedYear;
			if (r==0 && d>15){
				m--;
				if (m == 0) {
					m = 12;
					y--;
				}
			} else if (r>=4 && d<15){
				m++;
				if (m == 13) {
					m = 1;
					y++;
				}
			} else {
				this.days.push(d);
			}
			x.push(this.getDayComp(d,m,y));
		}
		var h = document.getElementById(this.id).clientHeight-(28+28+19);
		return({kind:"FittableColumns", style: "height: "+h/6+"px;", components:x});
	},
	getDayComp: function(d,m,yr){
		var c = this.dayColorDefault;
		var d1 = new Date().getDate();
		var m1 = new Date().getMonth() + 1;
		var y1 = new Date().getFullYear();
		if (m < this.selectedMonth || m > this.selectedMonth) {
			//Not Current Month
			c = this.dayColorOtherMonth;
		} else if (this.selectedYear == yr && this.selectedDay == d && this.selectedMonth == m) {
			//Selected Day
			c = this.dayColorSelected;
		} else if (y1 == yr && d1 == d && m1 == m) {
			//Current Day
			c = this.dayColorToday;
		}
		var c2 = this.numberColorThisMonth;
		if (this.selectedMonth != m) {
			c2 = this.numberColorOtherMonth;
		}
		var w = document.getElementById(this.id).clientWidth;
		return({onclick: 'calTap', style: "width: "+w/7+"px; background-color:" + c + "; color:" + c2 + "; font-size:14px; padding:3px; border:1px solid #000000;", day: d, month: m, year: yr, content: d});
	},
	calTap: function(inSender, event) {
		this.selectedDay = inSender.day;
		this.selectedMonth = inSender.month;
		this.selectedYear = inSender.year;
		this.updateStuff();
		this.doSelected({
			day: this.selectedDay,
			month: this.selectedMonth,
			year: this.selectedYear
		});
		this.drawCal();
	},
	prevMonth: function(){
		var dt = new Date(this.selectedYear, this.selectedMonth - 2, this.selectedDay);
		if (this.selectedDay != dt.getDate()){
			//If selected Day doesn't exist in new month
			dt.setDate(0);
		}
		this.selectedMonth = dt.getMonth()+1;
		this.selectedYear = dt.getFullYear();
		this.selectedDay = dt.getDate();
		this.updateStuff();
		this.drawCal();
	},
	nextMonth: function(){
		var dt = new Date(this.selectedYear, this.selectedMonth, this.selectedDay);
		if (this.selectedDay != dt.getDate()){
			//If selected Day doesn't exist in new month
			dt.setDate(0);
		}
		this.selectedMonth = dt.getMonth() + 1;
		this.selectedYear = dt.getFullYear();
		this.selectedDay = dt.getDate();
		this.updateStuff();
		this.drawCal();
	},
	updateStuff: function(){
		this.$.monthSel.setSelected(this.selectedMonth-1);
		this.$.yearSel.setSelected(this.selectedYear-this.minYear);
		this.$.daySel.setSelected(this.selectedDay-1);
		this.updateDays();

		//Next lines only needed for selectDecorator to update caption
		if (this.pickersStyled){
			this.$.monthSelDec.render();
			this.$.daySelDec.render();
			this.$.yearSelDec.render();
		}
	},
	updateDays: function(){
		var dArray = [];
		for (var i = 0; i<this.days.length; i++){
			dArray.push({content:i+1, value:i+1});
		}
		this.$.daySel.destroyClientControls();
		this.$.daySel.createComponents(dArray, {owner: this});
		this.$.daySel.render();
	},
	redraw: function(inSender){
		var m = this.$.monthSel.getSelected();
		var y = this.years[this.$.yearSel.getSelected()];
		var d = this.days[this.$.daySel.getSelected()];
		var dt = new Date(y, m, d);
		if (this.selectedDay != dt.getDate() && inSender.name != "daySel"){
			//If selected Day doesn't exist in new month
			dt.setDate(0);
		}
		this.selectedMonth = dt.getMonth() + 1;
		this.selectedYear = dt.getFullYear();
		this.selectedDay = dt.getDate();
		this.updateStuff();
		this.drawCal();
	},
	drawCal: function(){
		this.getDays();
		this.getMonthComps();
	},
	getDays: function(){
		var dt = new Date();
			dt.setFullYear(this.selectedYear);
			dt.setMonth(this.selectedMonth-1);
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
		
		//PreviousMonthDays
		for (i=0;i<offsetNum;i++){
			this.dayArray[offsetNum-1-i][0] = lastDayPrevMonth-i;
		}
		
		var day = 1;
		for (var row = 0; row < 6; row++) {
			for (var col = 0; col < 7; col++) {
				if(row==0 && col==0){
					col = offsetNum;
				}
				this.dayArray[col][row] = day;
				if (day==lastDayCurMonth){
					//Next Month Start
					day = 0;
				}
				day++;
			}
		}
	}
})