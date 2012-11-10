/*
Copyright (c) 2012, MachiApps
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
enyo.kind({	name:"DatePicker",
	published: {
		value: new Date(),
		minYear: 2012,
		maxYear: 2020
	},
	events: {
		onSelect: ""
	},
	components:[
		{name: "topBar"}
	],
	rendered: function(){
		//this.valueChanged();
		this.createTopBar();
		this.updateStuff();
		this.inherited(arguments);
	},
	valueChanged: function(){
		this.render();
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
		for (i = 0; i<this.days.length; i++){
			dArray.push({content:i+1, value:i+1});
		}
		var monthComps = [{content: "January", value: 0},{content: "February", value: 1},{content: "March", value: 2},{content: "April", value: 3},{content: "May", value: 4},{content: "June", value: 5},{content: "July", value: 6},{content: "August", value: 7},{content: "September", value: 8},{content: "October", value: 9},{content: "November", value: 10},{content: "December", value: 11}];
		var x = [
			{kind: "Select", name: "monthSel", onchange: "monthChanged", components: monthComps},
			{kind: "Select", name: "daySel", onchange: "dayChanged", components: dArray},
			{kind: "Select", name: "yearSel", onchange: "yearChanged", components: yearSelComps}
		];
		this.$.topBar.destroyClientControls();
		this.$.topBar.createComponents(x, {owner:this});
		this.$.topBar.render();
	},
	setValue: function(val){
		this.value = val;
		this.valueChanged();
	},
	getValue: function(){
		return this.value;
	},
	dayChanged: function(inSender){
		this.value.setDate(inSender.selected+1);
		this.doSelect({
			value: new Date(this.value)
		});
		return true;
	},
	monthChanged: function(inSender){
		this.value.setMonth(inSender.selected);
		this.updateDays();
		this.doSelect({
			value: new Date(this.value)
		});
		return true;
	},
	yearChanged: function(inSender){
		this.value.setFullYear(this.years[inSender.selected]);
		this.updateDays();
		this.doSelect({
			value: new Date(this.value)
		});
		return true;
	},
	updateStuff: function(){
		this.$.monthSel.setSelected(this.value.getMonth());
		this.$.yearSel.setSelected(this.value.getFullYear()-this.minYear);
		this.$.daySel.setSelected(this.value.getDate()-1);
		this.updateDays();
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
		var dt = new Date(this.value);
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
});