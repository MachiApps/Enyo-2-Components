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
		this.bubble("onSelect", {color: this.color});
	}
});

enyo.kind({
	name: "DefaultColorsBoxes",
	components: [
		{kind: "FittableColumns", components: [
			{style: "width: 5%;"},
			{kind: "FittableRows", style: "width: 10%;", defaultKind: "DefaultColorsBox", components: [
				{color: "000000"},
				{color: "222222"},
				{color: "444444"},
				{color: "666666"},
				{color: "888888"},
				{color: "AAAAAA"},
				{color: "CCCCCC"},
				{color: "FFFFFF"}
			]},
			{kind: "FittableRows", style: "width: 10%;", defaultKind: "DefaultColorsBox", components: [
				{color: "220000"},
				{color: "440000"},
				{color: "880000"},
				{color: "BB0000"},
				{color: "FF0000"},
				{color: "FE2E2E"},
				{color: "F78181"},
				{color: "F6CECE"}
			]},
			{kind: "FittableRows", style: "width: 10%;", defaultKind: "DefaultColorsBox", components: [
				{color: "002200"},
				{color: "004400"},
				{color: "008800"},
				{color: "00BB00"},
				{color: "00FF00"},
				{color: "2EFF2E"},
				{color: "81FF81"},
				{color: "CEF6CE"}
			]},
			{kind: "FittableRows", style: "width: 10%;", defaultKind: "DefaultColorsBox", components: [
				{color: "000022"},
				{color: "000044"},
				{color: "000088"},
				{color: "0000BB"},
				{color: "0000FF"},
				{color: "2E2EFF"},
				{color: "8181FF"},
				{color: "CECEF6"}
			]},
			{kind: "FittableRows", style: "width: 10%;", defaultKind: "DefaultColorsBox", components: [
				{color: "220022"},
				{color: "440044"},
				{color: "880088"},
				{color: "BB00BB"},
				{color: "FF00FF"},
				{color: "FF2EFF"},
				{color: "FF81FF"},
				{color: "F6CEF6"}
			]},
			{kind: "FittableRows", style: "width: 10%;", defaultKind: "DefaultColorsBox", components: [
				{color: "002222"},
				{color: "004444"},
				{color: "008888"},
				{color: "00BBBB"},
				{color: "00FFFF"},
				{color: "2EFFFF"},
				{color: "81FFFF"},
				{color: "CEF6F6"}
			]},
			{kind: "FittableRows", style: "width: 10%;", defaultKind: "DefaultColorsBox", components: [
				{color: "222200"},
				{color: "444400"},
				{color: "888800"},
				{color: "BBBB00"},
				{color: "FFFF00"},
				{color: "FFFF2E"},
				{color: "FFFF81"},
				{color: "F6F6CE"}
			]},
			{kind: "FittableRows", style: "width: 10%;", defaultKind: "DefaultColorsBox", components: [
				{color: "3B240B"},
				{color: "61380B"},
				{color: "B45F04"},
				{color: "FF8000"},
				{color: "FE9A2E"},
				{color: "FAAC58"},
				{color: "F7BE81"},
				{color: "F5D0A9"}
			]},
			{kind: "FittableRows", style: "width: 10%;", defaultKind: "DefaultColorsBox", components: [
				{color: "3B0B17"},
				{color: "610B21"},
				{color: "8A0829"},
				{color: "DF013A"},
				{color: "FF0040"},
				{color: "FA5882"},
				{color: "F7819F"},
				{color: "F5A9BC"}
			]},
			{style: "width: 5%;"}
		]}
	]
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
	handlers: {
		onSelect: "colorTapped"
	},
	components: [
		{kind: "DefaultColorsBoxes"},
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
	colorTapped: function(inEvent, data){
		this.red = data.color.substr(0,2);
		this.green = data.color.substr(2,2);
		this.blue = data.color.substr(4,2);
		this.updateProgresses();
		this.updateColor();
		this.doColorPick();
		return true;
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