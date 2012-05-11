/*
Copyright (c) 2012, MachiApps
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
enyo.kind({
	name: "DefaultColorsBox",
	published: {
		color: ''
	},
	events: {
		onSelect: ""
	},
	components: [
		{classes: "onyx-groupbox", ontap: "colorTapped", components:[
			{name: "colorBox", style: "height: 24px; border: 1px solid Black; margin: 5px;"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.colorChanged();
	},
	setColor: function(c){
		this.color = c;
		this.colorChanged();
	},
	colorChanged: function(){
		this.$.colorBox.applyStyle("background-color", '#' + this.color);
	},
	colorTapped: function(){
		this.doSelect(this.color);
	}
});

enyo.kind({
	name: "DefaultColorsBoxes",
	events: {
		onSelect: ""
	},
	components: [
		{kind: "FittableColumns", components: [
			{style: "width: 5%;"},
			{kind: "FittableRows", style: "width: 10%;", components: [
				{kind: "DefaultColorsBox", color: "000000", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "222222", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "444444", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "666666", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "888888", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "AAAAAA", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "CCCCCC", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "FFFFFF", onSelect: "colorTapped"}
			]},
			{kind: "FittableRows", style: "width: 10%;", components: [
				{kind: "DefaultColorsBox", color: "220000", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "440000", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "880000", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "BB0000", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "FF0000", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "FE2E2E", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "F78181", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "F6CECE", onSelect: "colorTapped"}
			]},
			{kind: "FittableRows", style: "width: 10%;", components: [
				{kind: "DefaultColorsBox", color: "002200", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "004400", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "008800", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "00BB00", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "00FF00", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "2EFF2E", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "81FF81", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "CEF6CE", onSelect: "colorTapped"}
			]},
			{kind: "FittableRows", style: "width: 10%;", components: [
				{kind: "DefaultColorsBox", color: "000022", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "000044", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "000088", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "0000BB", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "0000FF", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "2E2EFF", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "8181FF", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "CECEF6", onSelect: "colorTapped"}
			]},
			{kind: "FittableRows", style: "width: 10%;", components: [
				{kind: "DefaultColorsBox", color: "220022", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "440044", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "880088", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "BB00BB", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "FF00FF", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "FF2EFF", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "FF81FF", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "F6CEF6", onSelect: "colorTapped"}
			]},
			{kind: "FittableRows", style: "width: 10%;", components: [
				{kind: "DefaultColorsBox", color: "002222", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "004444", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "008888", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "00BBBB", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "00FFFF", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "2EFFFF", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "81FFFF", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "CEF6F6", onSelect: "colorTapped"}
			]},
			{kind: "FittableRows", style: "width: 10%;", components: [
				{kind: "DefaultColorsBox", color: "222200", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "444400", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "888800", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "BBBB00", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "FFFF00", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "FFFF2E", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "FFFF81", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "F6F6CE", onSelect: "colorTapped"}
			]},
			{kind: "FittableRows", style: "width: 10%;", components: [
				{kind: "DefaultColorsBox", color: "3B240B", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "61380B", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "B45F04", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "FF8000", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "FE9A2E", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "FAAC58", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "F7BE81", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "F5D0A9", onSelect: "colorTapped"}
			]},
			{kind: "FittableRows", style: "width: 10%;", components: [
				{kind: "DefaultColorsBox", color: "3B0B17", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "610B21", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "8A0829", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "DF013A", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "FF0040", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "FA5882", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "F7819F", onSelect: "colorTapped"},
				{kind: "DefaultColorsBox", color: "F5A9BC", onSelect: "colorTapped"}
			]},
			{style: "width: 5%;"}
		]}
	],
	create: function() {
		this.inherited(arguments);
	},
	colorTapped: function(inSender, inEvent){
		this.doSelect(inSender.color);
	}
});

enyo.kind({
	name: "ColorPicker",
	kind: "Control",
	published: {
		red: 'ff',
		blue: 'ff',
		green: 'ff',
		color: ''
	},
	events: {
		onColorPick: "",
		onColorSlide: ""
	},
	components: [
		{kind: "DefaultColorsBoxes", onSelect: "colorTapped"},
		{kind: "onyx.Slider", name: "redSlider", barClasses: "red-progress-bar", onChanging: "redSliding", onChange: "redChanged", style: "vertical-align:middle; height:10px;"},
		{style: "height: 10px"},
		{kind: "onyx.Slider", name: "greenSlider", barClasses: "green-progress-bar", onChanging: "greenSliding", onChange: "greenChanged", style: "vertical-align:middle; height:10px;"},
		{style: "height: 10px"},
		{kind: "onyx.Slider", name: "blueSlider", barClasses: "blue-progress-bar", onChanging: "blueSliding", onChange: "blueChanged", style: "vertical-align:middle; height:10px;"},
		{style: "height: 10px"},
		{classes: "onyx-groupbox", components:[
			{name: "colorBox", ontap: "mainColorPicked", style: "height: 32px; border: 1px solid Black; margin: 10px;"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.updateColor();
		this.updateProgresses();
	},
	colorTapped: function(inEvent, color){
		this.red = color.substr(0,2);
		this.green = color.substr(2,2);
		this.blue = color.substr(4,2);
		this.updateProgresses();
		this.updateColor();
		this.doColorPick();
	},
	updateProgresses: function(){
		var r = Math.floor(parseInt(this.red, 16)*100/255);
		var b = Math.floor(parseInt(this.blue, 16)*100/255);
		var g = Math.floor(parseInt(this.green, 16)*100/255);
		this.$.redSlider.setValue(r);
		this.$.greenSlider.setValue(g);
		this.$.blueSlider.setValue(b);
	},
	mainColorPicked: function(){
		color = this.color;
		console.log("color picked: " + this.color);
		this.doColorPick();
	},
	updateColor: function(){
		var c = '#' + (this.red + this.green + this.blue).toUpperCase();
		this.$.colorBox.applyStyle("background-color", c);
		this.color = c;
	},
	redChanged: function(inSender, inEvent){
		var x = Math.floor(inEvent.value*255/100);
		var h = x.toString(16);
		if (h.length==1){
			h = '0' + h;
		}
		this.red = h;
		this.updateColor();
	},
	greenChanged: function(inSender, inEvent){
		var x = Math.floor(inEvent.value*255/100);
		var h = x.toString(16);
		if (h.length==1){
			h = '0' + h;
		}
		this.green = h;
		this.updateColor();
	},
	blueChanged: function(inSender, inEvent){
		var x = Math.floor(inEvent.value*255/100);
		var h = x.toString(16);
		if (h.length==1){
			h = '0' + h;
		}
		this.blue = h;
		this.updateColor();
	},
	redSliding: function(inSender, inEvent){
		var x = Math.floor(inEvent.value*255/100);
		var h = x.toString(16);
		if (h.length==1){
			h = '0' + h;
		}
		this.red = h;
		this.updateColor();
		this.doColorSlide();
	},
	greenSliding: function(inSender, inEvent){
		var x = Math.floor(inEvent.value*255/100);
		var h = x.toString(16);
		if (h.length==1){
			h = '0' + h;
		}
		this.green = h;
		this.updateColor();
		this.doColorSlide();
	},
	blueSliding: function(inSender, inEvent){
		var x = Math.floor(inEvent.value*255/100);
		var h = x.toString(16);
		if (h.length==1){
			h = '0' + h;
		}
		this.blue = h;
		this.updateColor();
		this.doColorSlide();
	}
});