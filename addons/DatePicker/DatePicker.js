/*
Copyright (c) 2012, MachiApps
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
enyo.kind({
	name:"DatePicker",
	kind: "FittableColumns",
	published: {
		selectedMonth: new Date().getMonth()+1,
		selectedYear: new Date().getFullYear(),
		selectedDay: new Date().getDate(),
		minYear: 2012,
		maxYear: 2020,
		styled: false
	},
	events: {
		onSelected: "",
		onClose: ""
	},
	components:[
		{name: "topBar", style: "width: 100%;", classes: "align-center", components: []},
	],
	rendered: function(){
		this.createTopBar();
		this.updateStuff();
	},
	createTopBar: function(){
		var yearSelComps = [];
		this.years = [];
		for (var i = this.minYear; i<=this.maxYear; i++){
			this.years.push(i);
			yearSelComps.push({content:i, value:i-this.minYear});
		}
		this.getDays();
		var dArray = [];
		for (var i = 0; i<this.days.length; i++){
			dArray.push({content:i+1, value:i+1});
		}
		var monthComps = [{content: "January", value: 0},{content: "February", value: 1},{content: "March", value: 2},{content: "April", value: 3},{content: "May", value: 4},{content: "June", value: 5},{content: "July", value: 6},{content: "August", value: 7},{content: "September", value: 8},{content: "October", value: 9},{content: "November", value: 10},{content: "December", value: 11}];
		if (this.styled){
			var x = [
				{kind: "onyx.custom.SelectDecorator", name: "monthSelDec", style: "margin: 5px; width:126px;", components: [
					{kind: "Select", name: "monthSel", onchange: "dateChanged", components: monthComps},
				]},
				{kind: "onyx.custom.SelectDecorator", name: "daySelDec", style: "margin: 5px;", components: [
					{kind: "Select", name: "daySel", onchange: "dateChanged", components: dArray}
				]},
				{kind: "onyx.custom.SelectDecorator", name: "yearSelDec", style: "margin: 5px;", components: [
					{kind: "Select", name: "yearSel", onchange: "dateChanged", components: yearSelComps}
				]}
			];
		} else {
			var x = [
				{kind: "Select", name: "monthSel", onchange: "dateChanged", style: "vertical-align: middle;", components: monthComps},
				{kind: "Select", name: "daySel", onchange: "dateChanged", style: "vertical-align: middle;", components: dArray},
				{kind: "Select", name: "yearSel", onchange: "dateChanged", style: "vertical-align: middle;", components: yearSelComps},
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
	dateChanged: function(inSender){
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
		this.doSelected({
			day: this.selectedDay,
			month: this.selectedMonth,
			year: this.selectedYear
		});
	},
	updateStuff: function(){
		this.$.monthSel.setSelected(this.selectedMonth-1);
		this.$.yearSel.setSelected(this.selectedYear-this.minYear);
		this.$.daySel.setSelected(this.selectedDay-1);
		this.updateDays();

		//Next lines only needed for selectDecorator to update caption
		if (this.styled){
			this.$.monthSelDec.render();
			this.$.daySelDec.render();
			this.$.yearSelDec.render();
		}
	},
	updateDays: function(){
		this.getDays();
		var dArray = [];
		for (var i = 0; i<this.days.length; i++){
			dArray.push({content:i+1, value:i+1});
		}
		this.$.daySel.destroyClientControls();
		this.$.daySel.createComponents(dArray, {owner: this});
		this.$.daySel.render();
	},
	getDays: function(){
		this.days = [];
		var dt = new Date();
			dt.setFullYear(this.selectedYear);
			dt.setMonth(this.selectedMonth-1);
			dt.setDate(1);
		var lastOfMonth = new Date(dt);
			lastOfMonth.setMonth(dt.getMonth()+1);//Next month
			lastOfMonth.setDate(0);//Set to 0 to get the day before 1 -> last of previous month -> last of this.selectedMonth
		var lastDayCurMonth = lastOfMonth.getDate();
		var day = 1;
		while (day<=lastDayCurMonth){
			this.days.push(day);
			day++;
		}
	}
})